/**
 * @author:     Babak Taraghi (babak[dot]taraghi[at]gmail[dot]com)
 * @date:       17/10/2017
 * @licence:    The MIT License (MIT) all copies or substantial portions of the Software
 * @copyright:  Navio
 *
 * Copyright (c) 2017 Navio
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const secret          = 'f268f655d7238f80210281922b1db24f';
const navioRoutingURL = 'https://navio.biz/route/v1/get'; // can be a local ip
const SSLPrivateKey   = 'sslcert/server.key'; // SSL Private key local address
const SSLCertificate  = 'sslcert/server.crt'; // SSL certificate local address
const portNumber      = 443; // change it if 443 is not free

const https      = require('https');
const express    = require('express');
const logger     = require('morgan');
const requestLib = require('request');
const sha256     = require('sha256');
const polyline   = require('polyline');
const fs         = require('fs');
const app        = express();

app.use(logger('dev'));

app.use('/directions/v5/mapbox/driving-traffic/', (request, response, next) => {

    const coordinates = request.url.split('.json?')[0].replace('/', '').split('%3B');
    const origin      = coordinates[0].split(',');
    const destiny     = coordinates[1].split(',');
    const accessToken = sha256(secret + origin[1] + origin[0] + destiny[1] + destiny[0]);
    let result        = {};

    if (request.query.access_token === accessToken) {

        requestLib(navioRoutingURL + '?encode=false&point=' + origin[1] + ',' + origin[0] + '&point=' + destiny[1] + ','
            + destiny[0], (error, res, body) => {

            if (error) {
                result.code    = error.code;
                result.message = error.toString();
                response.json(result);

            } else {
                let bodyJSON = null;
                try {
                    bodyJSON = JSON.parse(body);
                } catch (e) {
                    console.log(e.toString());
                }

                if (!bodyJSON || body.indexOf('error') !== -1) {
                    result.code    = 500;
                    result.message = body;
                    response.json(result);

                } else {
                    let points = polyline.decode(bodyJSON.paths[0].points);

                    result = {
                        waypoints: [
                            {name: '', location: [Number(origin[1]), Number(origin[0])]},
                            {name: '', location: [Number(destiny[1]), Number(destiny[0])]}
                        ],
                        routes   : [{
                            legs       : [{
                                steps   : [],
                                weight  : bodyJSON.paths[0].weight,
                                distance: bodyJSON.paths[0].distance,
                                summary : '',
                                duration: bodyJSON.paths[0].time
                            }],
                            weight_name: 'routability',
                            geometry   : bodyJSON.paths[0].points,
                            weight     : bodyJSON.paths[0].weight,
                            distance   : bodyJSON.paths[0].distance,
                            duration   : bodyJSON.paths[0].time
                        }],
                        code     : 'Ok',
                        uuid     : accessToken
                    };

                    const map = {
                        '-3': {
                            sign    : 'Turn sharp left onto ',
                            maneuver: 'turn',
                            modifier: 'sharp left'
                        },
                        '-2': {
                            sign    : 'Turn left onto ',
                            maneuver: 'turn',
                            modifier: 'left'
                        },
                        '-1': {
                            sign    : 'Turn slight left onto ',
                            maneuver: 'turn',
                            modifier: 'left'
                        },
                        '0' : {
                            sign    : 'Continue onto ',
                            maneuver: 'continue',
                            modifier: 'straight'
                        },
                        '1' : {
                            sign    : 'Turn slight right onto ',
                            maneuver: 'turn',
                            modifier: 'slight right'
                        },
                        '2' : {
                            sign    : 'Turn right onto ',
                            maneuver: 'turn',
                            modifier: 'right'
                        },
                        '3' : {
                            sign    : 'Turn sharp right onto ',
                            maneuver: 'turn',
                            modifier: 'sharp right'
                        },
                        '4' : {
                            sign    : 'Finish ',
                            maneuver: 'arrive',
                            modifier: 'arrive'
                        },
                        '5' : {
                            sign    : 'VIA REACHED ',
                            maneuver: 'arrive',
                            modifier: 'arrive'
                        },
                        '6' : {
                            sign    : 'USE ROUNDABOUT ',
                            maneuver: 'roundabout',
                            modifier: 'depart'
                        }
                    };

                    bodyJSON.paths[0].instructions.forEach(function (instruction, instructionIndex) {

                        if (points[instruction.interval[0]]) {
                            let step = {
                                intersections: [],
                                maneuver     : {}
                            };

                            let stepPoints = [];

                            for (let i = instruction.interval[0]; i <= instruction.interval[1]; i++) {
                                if (points[i] !== undefined) {
                                    step.intersections.push({
                                        entry   : [],
                                        location: points[i],
                                        bearings: []
                                    });
                                    stepPoints.push(points[i]);
                                }
                            }

                            step.geometry             = polyline.encode(stepPoints);
                            step.duration             = instruction.time;
                            step.distance             = instruction.distance;
                            step.name                 = instruction.text.toLocaleLowerCase().replace(
                                map[instruction.sign].sign.toLowerCase(), '');
                            step.mode                 = 'driving';
                            step.maneuver.location    = points[instruction.interval[0]];
                            step.maneuver.type        = (instructionIndex === 0) ? 'depart' :
                                map[instruction.sign].maneuver;
                            step.maneuver.modifier    = map[instruction.sign].modifier;
                            step.maneuver.instruction = instruction.text;

                            result.routes[0].legs[0].steps.push(step);

                            if (instructionIndex === 0) result.waypoints[0].name = step.name;
                            if (instructionIndex === instruction.length - 1) {
                                result.waypoints[1].name         = step.name;
                                result.routes[0].legs[0].summary = result.waypoints[0].name + ' ' + step.name;
                            }
                        }
                    });

                    console.log(JSON.stringify(result));
                    response.json(result);
                }
            }
        });

    } else {
        result.code    = 403;
        result.message = 'Access denied';
        response.json(result);
    }
});


/**
 * HTTPS server
 */

const credentials = {key: fs.readFileSync(SSLPrivateKey, 'utf8'), cert: fs.readFileSync(SSLCertificate, 'utf8')};
const server      = https.createServer(credentials, app);

server.listen(portNumber);
server.on('error', (error) => {
    console.log(error);
});

server.on('listening', () => {
    console.log('Listening on port ' + portNumber);
});

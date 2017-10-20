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

const secret         = 'f268f655d7238f80210281922b1db24f';
let navioRequestURL  = 'https://navio.biz/route/v1/get'; // can be a local ip
const SSLPrivateKey  = 'sslcert/server.key'; // SSL Private key local address
const SSLCertificate = 'sslcert/server.crt'; // SSL certificate local address
const portNumber     = 443; // change it if 443 is not free

const https      = require('https');
const express    = require('express');
const logger     = require('morgan');
const requestLib = require('request');
const sha256     = require('sha256');
const polyline   = require('polyline');
const fs         = require('fs');
const app        = express();

app.use(logger('dev'));

app.use('/directions/v5/mapbox/driving-traffic/', function (request, response, next) {

    const coordinates = request.url.split('.json?')[0].replace('/', '').split('%3B');
    const origin      = coordinates[0].split(',');
    const destiny     = coordinates[1].split(',');
    let result        = {};

    if (request.query.access_token === sha256(secret + origin[1] + origin[0] + destiny[1] + destiny[0])) {

        navioRequestURL += '?encode=false&point=' + origin[1] + ',' + origin[0] + '&point=' + destiny[1] + ','
            + destiny[0];

        requestLib(navioRequestURL, (error, res, body) => {

            if (error) {
                result.code    = error.code;
                result.message = error.toString();
                response.json(result);

            } else {
                body       = JSON.parse(body);
                let points = polyline.decode(body.paths[0].points);

                result = {
                    waypoints: [
                        {name: '', location: [Number(origin[1]), Number(origin[0])]},
                        {name: '', location: [Number(destiny[1]), Number(destiny[0])]}
                    ],
                    routes   : [{
                        legs       : [{
                            steps   : [],
                            weight  : body.paths[0].weight,
                            distance: body.paths[0].distance,
                            summary : '',
                            duration: body.paths[0].time
                        }],
                        weight_name: 'routability',
                        geometry   : body.paths[0].points,
                        weight     : body.paths[0].weight,
                        distance   : body.paths[0].distance,
                        duration   : body.paths[0].time
                    }],
                    code     : 'Ok',
                    uuid     : secret
                };

                const signsMap = {
                    '-3': 'Turn sharp left onto ',
                    '-2': 'Turn left onto ',
                    '-1': 'Turn slight left onto ',
                    '0' : 'Continue onto ',
                    '1' : 'Turn slight right onto ',
                    '2' : 'Turn right onto ',
                    '3' : 'Turn sharp right onto ',
                    '4' : 'Finish',
                    '5' : 'VIA REACHED',
                    '6' : 'USE ROUNDABOUT'
                };

                const maneuverMap = {
                    '-3': 'turn',
                    '-2': 'turn',
                    '-1': 'turn',
                    '0' : 'continue',
                    '1' : 'turn',
                    '2' : 'turn',
                    '3' : 'turn',
                    '4' : 'arrive',
                    '6' : 'roundabout'
                };

                const modifierMap = {
                    '-3': 'sharp left',
                    '-2': 'left',
                    '-1': 'slight left',
                    '0' : 'straight',
                    '1' : 'slight right',
                    '2' : 'right',
                    '3' : 'sharp right',
                    '4' : 'arrive',
                    '5' : 'arrive',
                    '6' : 'depart'
                };

                body.paths[0].instructions.forEach(function (instruction, instructionIndex) {

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
                            signsMap[instruction.sign].toLowerCase(), '');
                        step.mode                 = 'driving';
                        step.maneuver.location    = points[instruction.interval[0]];
                        step.maneuver.type        = (instructionIndex === 0) ? 'depart' : maneuverMap[instruction.sign];
                        step.maneuver.modifier    = modifierMap[instruction.sign];
                        step.maneuver.instruction = instruction.text;

                        result.routes[0].legs[0].steps.push(step);

                        if (instructionIndex === 0) result.waypoints[0].name = step.name;
                        if (instructionIndex === instruction.length - 1) {
                            result.waypoints[1].name         = step.name;
                            result.routes[0].legs[0].summary = result.waypoints[0].name + ' ' + step.name;
                        }
                    }
                });

                response.json(result);
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

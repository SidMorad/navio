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
const portNumber      = 3000; // change it if 3000 is not free

const http       = require('http');
const express    = require('express');
const logger     = require('morgan');
const requestLib = require('request');
const sha256     = require('sha256');
const polyLine   = require('@mapbox/polyline');
const app        = express();

app.use(logger('dev'));

app.use('/directions/v5/mapbox/driving/', (request, response, next) => {

    const coordinates = request.url.split('.json?')[0].replace('/', '').split('%3B');
    const origin      = coordinates[0].split(',');
    const destiny     = coordinates[1].split(',');
    const accessToken = sha256(secret + origin[1] + origin[0] + destiny[1] + destiny[0]);
    let result        = {};

    if (request.query.access_token === accessToken) {

        requestLib(navioRoutingURL + '?point=' + origin[1] + ',' + origin[0] + '&point=' + destiny[1] + ','
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
                    let points = polyLine.decode(bodyJSON.paths[0].points);

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
                                duration: bodyJSON.paths[0].time * 0.001
                            }],
                            weight_name: 'routability',
                            geometry   : bodyJSON.paths[0].points,
                            weight     : bodyJSON.paths[0].weight,
                            distance   : bodyJSON.paths[0].distance,
                            duration   : bodyJSON.paths[0].time * 0.001
                        }],
                        code     : 'Ok',
                        uuid     : accessToken
                    };

                    const map = {
                        '-3': {
                            sign    : 'turn sharp left',
                            maneuver: 'turn',
                            modifier: 'sharp left'
                        },
                        '-2': {
                            sign    : 'turn left',
                            maneuver: 'turn',
                            modifier: 'left'
                        },
                        '-1': {
                            sign    : 'turn slight left',
                            maneuver: 'turn',
                            modifier: 'left'
                        },
                        '0' : {
                            sign    : 'continue',
                            maneuver: 'continue',
                            modifier: 'straight'
                        },
                        '1' : {
                            sign    : 'turn slight right',
                            maneuver: 'turn',
                            modifier: 'slight right'
                        },
                        '2' : {
                            sign    : 'turn right',
                            maneuver: 'turn',
                            modifier: 'right'
                        },
                        '3' : {
                            sign    : 'turn sharp right',
                            maneuver: 'turn',
                            modifier: 'sharp right'
                        },
                        '4' : {
                            sign    : 'arrive at destination',
                            maneuver: 'arrive',
                            modifier: 'arrive'
                        },
                        '5' : {
                            sign    : 'VIA REACHED ',
                            maneuver: 'arrive',
                            modifier: 'arrive'
                        },
                        '6' : {
                            sign    : 'at roundabout, take exit ?',
                            maneuver: 'roundabout',
                            modifier: 'straight'
                        }
                    };

                    bodyJSON.paths[0].instructions.forEach(function (instruction, instructionIndex) {
                        let step       = {mode: 'driving', maneuver: {}};
                        let stepPoints = [];

                        if (points[instruction.interval[0]]) {

                            for (let i = instruction.interval[0]; i <= instruction.interval[1]; i++)
                                if (points[i] !== undefined)
                                    stepPoints.push(points[i]);

                            step.maneuver.location = points[instruction.interval[0]];

                            if (instruction.sign === 6 && instruction.exit_number !== undefined) {
                                step.name = instruction.text.toLocaleLowerCase().replace(
                                    map[instruction.sign].sign.replace('?', instruction.exit_number), '');
                                step.exit = instruction.exit_number;
                            } else
                                step.name = instruction.text.toLocaleLowerCase().replace(
                                    map[instruction.sign].sign, '');

                            step.name = step.name.replace('onto', '');

                            if (instructionIndex === 0) result.waypoints[0].name = step.name;
                            result.waypoints[1].name         = step.name;
                            result.routes[0].legs[0].summary = result.waypoints[0].name + ' ' + step.name;

                        } else {
                            let destinationPoint = [Number(destiny[1]), Number(destiny[0])];
                            stepPoints.push(destinationPoint);

                            step.maneuver.location = destinationPoint;
                            step.name              = '';
                        }

                        step.geometry          = polyLine.encode(stepPoints);
                        step.duration          = instruction.time * 0.001;
                        step.distance          = instruction.distance;
                        step.maneuver.type     = map[instruction.sign].maneuver;
                        step.maneuver.modifier = map[instruction.sign].modifier;

                        result.routes[0].legs[0].steps.push(step);

                    });

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
 * HTTP server
 */

const server = http.createServer(app);

server.listen(portNumber);
server.on('error', (error) => {
    console.log(error);
});

server.on('listening', () => {
    console.log('Listening on port ' + portNumber);
});

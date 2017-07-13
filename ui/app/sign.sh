#!/bin/sh

# First patch OverPassLayer library
cp patchs/OverPassLayer-patched.js node_modules/leaflet-overpass-layer/src/OverPassLayer.js

echo '' > node_modules/leaflet-overpass-layer/src/OverPassLayer.css

ionic cordova build android --prod --release --buildConfig

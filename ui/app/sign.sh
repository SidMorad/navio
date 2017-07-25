#!/bin/sh

# First patch OverPassLayer library
cp patchs/OverPassLayer-patched.js node_modules/leaflet-overpass-layer/src/OverPassLayer.js

echo '' > node_modules/leaflet-overpass-layer/src/OverPassLayer.css

# Second patch TileLayer.PouchDBCached library
cp patchs/L.TileLayer.PouchDBCached-patched.js node_modules/leaflet.tilelayer.pouchdbcached/L.TileLayer.PouchDBCached.js

ionic cordova build android --prod --release --buildConfig

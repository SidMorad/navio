#!/bin/sh

# First patch OverPassLayer library
printf "Patching OverPassLayer...\n\n"
cp patchs/OverPassLayer-patched.js node_modules/leaflet-overpass-layer/src/OverPassLayer.js
echo '' > node_modules/leaflet-overpass-layer/src/OverPassLayer.css
sleep 1
printf "Done.\n\n"

# Second patch TileLayer.PouchDBCached library
printf "Patching TileLayer.PouchDBCached...\n\n"
cp patchs/L.TileLayer.PouchDBCached-patched.js node_modules/leaflet.tilelayer.pouchdbcached/L.TileLayer.PouchDBCached.js
sleep 1
printf "Done.\n"

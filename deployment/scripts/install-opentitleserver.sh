#!/bin/bash

cd /tmp
git clone https://github.com/AcuGIS/OpenTileServer.git

cd OpenTileServer
bash ./Ubuntu-16.sh web carto http://download.geofabrik.de/asia/iran-latest.osm.pbf

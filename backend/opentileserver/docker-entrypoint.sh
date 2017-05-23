#!/bin/sh

#./home/ots/Ubuntu-16-Reload.sh /home/tile/iran-latest.osm.pbf

service postgresql start
service apache2 start
service renderd start

exec "$@"
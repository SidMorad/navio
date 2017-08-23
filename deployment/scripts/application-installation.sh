#!/bin/bash

user_home="/home/ubuntu"

# Create default directories
mkdir /home/www
mkdir "${user_home}/osm"
ls /tmp
cp /tmp/import.osm.pbf "${user_home}/osm/"

if [ ! -d "${user_home}/src" ]; then
    mkdir "${user_home}/src"
    tar -xzf /tmp/application.tar.gz -C "${user_home}/src"
fi

# Building docker containers
cd "${user_home}/src/backend/docker/"
./init-production-first-time.sh

# NOT tested as part of packer build. TODO remove this line if packer build was successful(?)
cd "${user_home}/src/backend/overpass"
curl -o planet.osm.bz2 http://download.geofabrik.de/asia/iran-latest.osm.bz2
docker-compose up -d

cd "${user_home}/src/backend/nominatim"
docker-compose up -d

cd "${user_home}/src/backend/opentraffic/reporter"
./init-data.sh
docker-compose up -d
# NOT tested, ends. TODO remove this line if packer build was successful(?)

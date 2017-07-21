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

cd "${user_home}/src/backend/docker/"
./init-production-first-time.sh
# uncomment above line when you are sure everythings works as expeced locally.
# and if you want to create a full(fat!) image.
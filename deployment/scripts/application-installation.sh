#!/bin/bash

user_home="/home/ubuntu"

# Create default directories
mkdir /home/www
mkdir "${user_home}/osm"
mkdir "${user_home}/src"
ls /tmp
cp /tmp/import.osm.pbf "${user_home}/osm/"
tar -xzf /tmp/application.tar.gz -C "${user_home}/src"

cd "${user_home}/src/backend/docker/"
./init-production-first-time.sh
# uncomment above line when you are sure everythings works as expeced locally.
# and if you want to create a full(fat!) image.
#!/bin/bash

# This script designed to be exectued in a VPS server, for instance in a PersianGig VPS server with ubuntu 16.04 installed.

echo "Creating user 'ubuntu'"
useradd -d /home/ubuntu ubuntu
passwd ubuntu
usermod -aG sudo ubuntu
mkdir /home/ubuntu

./ubuntu-post-installation.sh

echo "Please enter your Github personal token to progress forward:"
echo "If you don't have it? check https://github.com/settings/tokens"

read token

mkdir /tmp/application
curl -L --header "Authorization: token ${token}" --header "Accept:application/vnd.github.v3.raw" https://api.github.com/repos/nobeh/rahpey/tarball/master | tar xz --strip=1 -C /tmp/application
tar czf /tmp/application.tar.gz -C /tmp/application .

echo "Downloading iran-latest.osm.pbf into /tmp directory"
wget -O /tmp/import.osm.pbf http://download.geofabrik.de/asia/iran-latest.osm.pbf

echo "Application installation will start in a tmux session, use tmux attach to follow it."
sleep 1
echo "Done!"

tmux new-session -d -s sessionOne './application-installation.sh'

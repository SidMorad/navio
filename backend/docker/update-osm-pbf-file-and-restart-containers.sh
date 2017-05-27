#!/bin/bash

# This script is responsible for updating OpenStreetMap `pbf` file for our
# Route engine and our Tile Server

# Exit on error
set -e

osm_dir="$HOME/osm"
osm_file="${osm_dir}/import.osm.pbf"
osm_cache_dir="${osm_dir}/import.osm-gh"

if [ ! -d "${osm_dir}" ]; then
    mkdir "${osm_dir}";
  else
    rm "${osm_file}";
fi

wget -O "${osm_file}" http://download.geofabrik.de/asia/iran-latest.osm.pbf

echo "Graphhopper is updating..."
docker-compose stop graphhopper
sudo rm -rf "${osm_cache_dir}"
docker-compose start graphhopper
echo "done!"

echo "OpenTileServer is updating..."
docker cp "${osm_file}" $(docker ps -aqf "name=opentileserver"):/home/tile/iran-latest.osm.pbf
docker exec $(docker ps -aqf "name=opentileserver") /home/ots/Ubuntu-16-Reload.sh /home/tile/iran-latest.osm.pbf
echo ""
echo "done!"

echo "You may wish to run following command to see logs:"
echo ""
echo "docker-compose logs --tail 10 -f graphhopper opentileserver"

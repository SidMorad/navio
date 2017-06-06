#!/bin/bash

# This script is responsible for updating OpenStreetMap `pbf` file for our
# Route engine and our Tile Server

# Exit on error
set -e

osm_dir="$HOME/osm"
osm_file="${osm_dir}/import.osm.pbf"
osm_cache_dir="${osm_dir}/import.osm-gh"
graphhopper_cid=$(docker inspect --format="{{.Id}}" rahpey-graphhopper)
opentileserver_cid=$(docker inspect --format="{{.Id}}" rahpey-opentileserver)

if [ ! -d "${osm_dir}" ]; then
    mkdir "${osm_dir}"
  else
    rm "${osm_file}"
fi

wget -O "${osm_file}" http://download.geofabrik.de/asia/iran-latest.osm.pbf

echo "Graphhopper is updating... ${osm_file}"
docker cp ../graphhopper/properties/config.properties "${graphhopper_cid}:/home/graphhopper/config.properties"
docker-compose stop graphhopper
sudo rm -rf "${osm_cache_dir}"
docker-compose start graphhopper
echo "done!"

echo "OpenTileServer is updating..."
docker cp "${osm_file}" "${opentileserver_cid}:/home/tile/iran-latest.osm.pbf"
docker exec "${opentileserver_cid}" /home/ots/Ubuntu-16-Reload.sh /home/tile/iran-latest.osm.pbf
echo ""
echo "done!"

echo "You may wish to run following command to see logs:"
echo ""
echo "docker-compose logs --tail 10 -f graphhopper opentileserver"

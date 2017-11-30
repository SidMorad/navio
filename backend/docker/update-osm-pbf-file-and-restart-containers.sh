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
fi

if [ ! -f "${osm_file}" ]; then
    wget -O "${osm_dir}/iran.pbf" http://download.geofabrik.de/asia/iran-latest.osm.pbf
    wget -O "${osm_dir}/malaysia.pbf" http://download.geofabrik.de/asia/malaysia-singapore-brunei-latest.osm.pbf
    osmconvert "${osm_dir}/iran.pbf" --out-o5m | osmconvert - "${osm_dir}/malaysia.pbf" -o="${osm_dir}/import.osm.pbf"
fi

echo "Graphhopper is updating... ${osm_file}"
docker-compose stop graphhopper
docker cp ../graphhopper/properties/config.properties "${graphhopper_cid}:/home/graphhopper/config.properties"
docker cp "${osm_file}" "${graphhopper_cid}:/data/import.osm.pbf"
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

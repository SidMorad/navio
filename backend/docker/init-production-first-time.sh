#!/bin/bash

# Exit on error
set -e

printf "##### Rahpey production deployment from zero to end. #####\n\n"
printf "# This script assume Docker & Docker-compose are installed.\n\n"
printf "# Note: we use docker commands without using sudo, if you don't? please search the web for enabling this feature in your operationg system. or add sudo infront of all docker commands.\n\n"
sleep 1

ROOT_DIR="$PWD"

printf "# docker images:\n\n"
docker images
printf "done.\n\n"
sleep 1

printf "# Let's build our application (docker)images first.\n\n"
#./build-prod-all.sh
printf "done.\n\n"
sleep 1

printf "# Let's bring everyting up!\n\n"
cd "$ROOT_DIR"
docker-compose up -d
printf "done.\n\n"
sleep 1

printf "# Let's wait for(20 seconds) until opentileserver to come up.\n\n"
sleep 20
printf "done.\n\n"
sleep 1

printf "# Let's check if OpenTileServer database is up!?\n\n"
opentileserver_cid=$(docker inspect --format="{{.Id}}" rahpey-opentileserver)
docker exec "${opentileserver_cid}" bash service postgresql status
printf "done.\n\n"
sleep 1

printf "# Let's start OpenTileServer http server manually(it seems is not up! like a database service!)\n\n"
docker exec "${opentileserver_cid}" bash service apache2 start
printf "done.\n\n"
sleep 1


printf "# Let's update iran-latest.osm.pbf to the latest!"
./update-osm-pbf-file-and-restart-containers.sh
printf "done.\n\n"
sleep 1

printf "# Depends to timeouts in docker-compose.yml file and your hardware, everyting must be up and ready in 2 minutes or so. to check, use docker-compose logs -f or  see http://IP or host\n\n"
sleep 1

docker rmi $(docker images --quiet --filter "dangling=true")

printf "\nRahpey production depolyment was successful! \ncelebrate it with a tea or coffee if you wish! :-)\n"

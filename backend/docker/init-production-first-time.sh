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

#printf "# Let's build our application (docker)images first.\n\n"
#cd ../
#sh build-prod-all.sh
#printf "done.\n\n"
#sleep 1

printf "# Let's bring everytings up!\n\n"
cd "$ROOT_DIR"
docker-compose up -d
printf "done.\n\n"
sleep 1

printf "# Let's wait for(10 seconds) until nginx service to come up.\n\n"
sleep 10
printf "done.\n\n"
sleep 1

printf "# Let's modify nginx default configuration.\n\n"
docker cp nginx/default.conf $(docker ps -aqf "name=nginx"):/etc/nginx/conf.d/default.conf
printf "done.\n\n"
sleep 1

printf "# Let's restart nginx container for applying configs.\n\n"
docker container restart $(docker ps -aqf "name=nginx")
printf "done.\n\n"
sleep 1

printf "# Depends to timeouts in docker-compose.yml file and your hardware, everyting must be up and ready in 2 minutes or so. to check, see http://IP or host\n\n"
sleep 1

printf "\nRahpey production depolyment was successful! \ncelebrate it with a tea or coffee if you wish! :-)\n"

docker cp default.conf $(docker ps -aqf "name=nginx"):/etc/nginx/conf.d/default.conf
docker container restart $(docker ps -aqf "name=nginx")

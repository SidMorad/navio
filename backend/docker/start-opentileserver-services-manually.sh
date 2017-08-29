#!/bin/sh

opentileserver_cid=$(docker inspect --format="{{.Id}}" rahpey-opentileserver)

docker exec "${opentileserver_cid}" bash service apache2 restart
docker exec "${opentileserver_cid}" bash service renderd restart
docker exec "${opentileserver_cid}" bash service postgresql restart

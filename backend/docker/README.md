Some Docker & Docker-compose commands documented here
=====================================================

### Build containers and start them.
`./init-production-first-time.sh`

Note: basicly we need to execute above command only once in production.

### Update iran-latest.osm.pbf into latest in Graphhopper and OpenTileServer containers.
`./update-osm-pbf-file-and-restart-containers.sh`

### Recreate specific container from an updated image.
`docker-compose up -d --no-deps --build service_name_here`

Note: For updating internal microservices, `recreate-immutable-docker-containers.sh` script can be useful.

### Docker stats
`docker stats $(docker ps | awk '{if(NR>1) print $NF}')`

### Docker logs
`docker-compose logs -f`
`docker-compose logs --tail 10 service_name_here`

### Execute a command in a container
`docker exec -it $(docker ps -aqf "name=nginx") sh`

### Removes unused docker images, which will free disk space & speed up docker
`docker rmi $(docker images --quiet --filter "dangling=true")`

### Removes unattached docker volumes, which will free up some disk space
`docker volume prune`
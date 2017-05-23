Some Docker & Docker-compose commands documented here
=====================================================

### Build containers and start them.
`sh init-production-first-time.sh`
Note: basicly we need to execute this only once in production.

### Recreate specific container from an updated image.
`docker-compose up -d --no-deps --build service_name_here`
Note: DO NOT USE THIS COMMAND FOR DATABASE CONTAINERS. otherwise we do lose all contained data!
Note 2: For preventing mistakes, `recreate-app-immutable-containers.sh` can be used.

### Docker stats
`docker stats $(docker ps | awk '{if(NR>1) print $NF}')`

### Docker logs
`docker-compose logs -f`
`docker-compose logs --tail 10 service_name_here`

### Execute a command in a container
docker exec -it $(docker ps -aqf "name=nginx") sh

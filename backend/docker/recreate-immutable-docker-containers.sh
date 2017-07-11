#!/bin/sh
docker-compose stop rahpey-route rahpey-traffic rahpey-uaa rahpey-gateway
docker-compose up -d --no-deps --build rahpey-route rahpey-traffic rahpey-uaa rahpey-gateway

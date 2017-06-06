# Developer guide

Here are required steps for running `route` microservice:

 - `cd registry && docker-compose -f jhipster-registry.yml start`
 - `cd uaa && ./mvnw`
 - `cd gateway && ./mvnw`
 - `cd graphhopper && docker-compose start`
 - `cd route && ./mvnw`

_Note_: if is it first time? then use `docker-compose up -d` instead of `docker-compose start` in above setps.

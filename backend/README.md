# Backend

We do use Microservices archetecutre [with JHipster](https://jhipster.github.io/microservices-architecture/).

### Registry

The JHipster Registry is a runtime application on which all applications registers and get their configuration from. It also provides runtime monitoring dashboards.

### UAA

User Account and Authentication is based on Spring Security. This server provides OAuth2 tokens for securing the gateway, and also can be used for securing service-to-service calls.

### Gateway

A gateway is a JHipster-generated application that handles Web traffic, and serves an Angular application.

### Console

The JHipster Console is a monitoring & alerting console, based on the ELK stack.


## Rahpey Domain Microservices


### Route

This microservice is responsible for providing road routing apis.

## Rahpey Domain Open-Source Microservices

### Graphhopper

We use Graphhopper-web server as our Route Engine.

### OpenTileServer

We use OpenTileServer for rendering OpenStreetMap tiles.

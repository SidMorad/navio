# Graphhopper docker-compose
# https://github.com/djeusette/graphhopper

## Start

- Create a local *~/osm* folder and copy your import.osm.pbf file there
- Run it with `docker-compose up`
- The default exposed port is 8989

## Routing API

See [API doc](https://github.com/graphhopper/graphhopper/blob/0.8/docs/web/api-doc.md)

## Example for Philippines

```
curl -X GET -H "Content-type: application/json" http://localhost:8989/route?point=14.5114141,121.0580759&point=14.568599,120.9883453
```
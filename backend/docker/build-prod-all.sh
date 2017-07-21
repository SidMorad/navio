#!/bin/bash

echo "Building uaa ..."
cd ../uaa && ./mvnw -l /tmp/mvn-uaa.log clean package -Pprod,zipkin docker:build -DskipTests
echo "Building gateway ..."
cd ../gateway && ./mvnw -l /tmp/mvn-gateway.log clean package -Pprod,zipkin docker:build -DskipTests
echo "Building route ..."
cd ../route && ./mvnw -l /tmp/mvn-route.log clean package -Pprod,zipkin docker:build -DskipTests
echo "Building traffic ..."
cd ../traffic && ./mvnw -l /tmp/mvn-traffic.log clean package -Pprod,zipkin docker:build -DskipTests
echo "Build done."

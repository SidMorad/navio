#!/bin/bash

cd ../uaa && ./mvnw clean package -Pprod,zipkin docker:build -DskipTests
cd ../gateway && ./mvnw clean package -Pprod,zipkin docker:build -DskipTests
cd ../route && ./mvnw clean package -Pprod,zipkin docker:build -DskipTests
cd ../traffic && ./mvnw clean package -Pprod,zipkin docker:build -DskipTests

echo "built all!"

#!/bin/bash

cd ../uaa && ./mvnw clean package -Pprod docker:build
cd ../gateway && ./mvnw clean package -Pprod docker:build
cd ../route && ./mvnw clean package -Pprod docker:build

echo "built all!"

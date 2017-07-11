#!/bin/bash

cd ../uaa && ./mvnw test &
cd ../gateway && ./mvnw test &
cd ../route && ./mvnw test &
cd ../traffic && ./mvnw test &

wait;

echo "all tested!"

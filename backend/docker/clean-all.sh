#!/bin/bash

cd ../uaa && ./mvnw clean &
cd ../gateway && ./mvnw clean &
cd ../route && ./mvnw clean &
cd ../traffic && ./mvnw clean &

wait;

echo "all clean!"

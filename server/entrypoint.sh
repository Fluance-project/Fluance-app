#!/bin/sh

echo "Waiting for MongoDB"

while ! nc -z server-db 27017; do
    sleep 0.1
done

echo "Mongo database started!"

npm start
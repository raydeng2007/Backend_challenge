#!/bin/bash
## Script that starts the api-server normally 
set -e

environment="$1"

if echo "$environment" | grep -q '^development$'; then
  echo "Syncing node_modules..."
  rsync -a /tmp/node_modules /usr/src/app/
fi

until psql -h "$DATABASE_HOST" -d "$DATABASE_NAME" -U "$DATABASE_USERNAME" -c '\l'; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is up - starting api-server"
if echo "$environment" | grep -q '^development$'; then
  nodemon ./src/server.js
else 
  node ./src/server.js
fi

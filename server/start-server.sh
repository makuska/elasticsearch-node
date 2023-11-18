#!/bin/bash
echo "Node environment: $NODE_ENV"

status=0
set -e

if [ "$NODE_ENV" = "production" ]; then
  npm run start
  status=$?
fi

if [ "$status" -ne 0 ]; then
  echo "'npm run start' command failed with status $status. Exiting..."
  exit "$status"
fi

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
  status=$?
fi

if [ "$status" -ne 0 ]; then
  echo "'npm run dev' command failed with status $status. Exiting..."
  exit "$status"
fi
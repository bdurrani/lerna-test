#!/usr/bin/env bash

set -euo pipefail 

  # -t "${REPOSITORY_URI}:latest" \

docker build \
  -t "update-service:latest" \
  -f ./Dockerfile .

# docker push "${REPOSITORY_URI}:latest"
#!/usr/bin/env bash

set -euo pipefail 

ECR_URI="${ECR_URI:-}"
URI_SUFFIX="robot-update-service"
REPOSITORY_URI="${ECR_URI}${URI_SUFFIX}"

  # -t "update-service:latest" \
docker build \
  -t "${REPOSITORY_URI}:latest" \
  -f ./Dockerfile .

docker push "${REPOSITORY_URI}:latest"
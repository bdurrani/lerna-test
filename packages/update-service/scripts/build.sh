#!/usr/bin/env bash

set -euo pipefail

docker build \
  -t "update-service:latest" \
  -f ./Dockerfile .
#!/usr/bin/env bash

set -euo pipefail

docker build \
  -t "runner-service:latest" \
  -f ./Dockerfile .
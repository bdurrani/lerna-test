#!/usr/bin/env bash

set -euo pipefail

docker build \
  -t "api:latest" \
  -f ./Dockerfile .
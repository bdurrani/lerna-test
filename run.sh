#!/usr/bin/env bash 
set -euo pipefail

npx lerna version patch --yes --no-push
readonly HEAD_SHA=$(git rev-parse --short HEAD)
# git tag "tag-${HEAD_SHA}"

echo "Local change made. Wait for remote change"
read year

git pull origin --no-edit

# git fetch origin
# git merge develop -m "Merging changes"

echo "Pushing to master"
git push origin master --tags

npx lerna publish from-package --yes
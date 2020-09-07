#!/usr/bin/env bash 
set -euo pipefail
CHANGED_PACKAGES="${CHANGED_PACKAGES:-}"

detectChangedPackages() {
    # lerna returns a non-zero exit code when there are no changes
    # make sure the script continues in this case so we can
    # report the issue properly
    set +e
    CHANGED_PACKAGES=$(lerna changed -ap)
    set -e
}

git pull origin --no-edit

detectChangedPackages

if [[ "${CHANGED_PACKAGES}" == "" ]]; then
    echo "Could not determine which packages have changed"; exit 1
fi

npx lerna version patch --yes --no-push
readonly HEAD_SHA=$(git rev-parse --short HEAD)
# git tag "tag-${HEAD_SHA}"

echo "Local change made. Wait for remote change"
read year

git pull origin --no-edit

# git fetch origin
# git merge develop -m "Merging changes"

# merge to master
echo "Merging develop to master"
git checkout master
git pull origin master
git merge develop

# push to master
echo "Pushing master"
git push origin master --tags

# switch back to develop
git checkout develop
git push origin develop --tags

npx lerna publish from-package --yes
#!/usr/bin/env bash

# build webpage
yarn build-prod
git add -A
git commit -m ":rocket:"

# push to repository
PUSH_URI="https://${GITHUB_TOKEN}@github.com/mattdelsordo/friendo-dev.git"
echo "Pushing to master"
git push "${PUSH_URI}" >/dev/null 2>&1 # don't print secrets

#!/usr/bin/env bash

# check to see if the last build was a build commit, don't build if so
if [[ $(git log -1 --pretty=%B) != ":rocket:" ]]; then
    # build webpage
    git checkout master
    yarn build-prod
    git add -A
    git commit -m ":rocket:"

    # push to repository
    PUSH_URI="https://${GITHUB_TOKEN}@github.com/mattdelsordo/friendo.git"
    echo "Pushing to master"
    git push "${PUSH_URI}" >/dev/null 2>&1 # don't print secrets
fi

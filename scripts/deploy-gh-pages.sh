#!/usr/bin/env bash

# check to see if the last build was a build commit, don't build if so
if [[ $(git log --oneline -n1) != *":rocket:"* ]]; then
    # build webpage
    git checkout master
    yarn build-prod
    git add docs/

    TAG=$(egrep '"version": "([0-9]+\.[0-9]+\.[0-9]+"),' package.json | egrep -o '[0-9]+\.[0-9]+\.[0-9]+')

    git commit -m ":rocket: v$TAG"
    git tag -a "v$TAG" -m "v$TAG"

    # push to repository
    PUSH_URI="https://${GITHUB_TOKEN}@github.com/mattdelsordo/friendo.git"
    echo "Pushing to master"
    git push "${PUSH_URI}" >/dev/null 2>&1 # don't print secrets
    git push "${PUSH_URI}" --tags  >/dev/null 2>&1

    # create release notes
    yarn release
fi

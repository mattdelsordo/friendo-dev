#!/usr/bin/env bash

# only perform check if build is
# 1. a travis build
# 2. a pull request build
# 3. merging into master
if [[ $TRAVIS_PULL_REQUEST_SLUG != "" && $TRAVIS_BRANCH == "master" ]]; then
    # If the package.json version matches the git tag, fail
    GIT_VER=$(git describe --abbrev=0 | egrep -o '[0-9]+\.[0-9]+\.[0-9]+')
    JSON_VER=$(egrep '"version": "([0-9]+\.[0-9]+\.[0-9]+"),' package.json | egrep -o '[0-9]+\.[0-9]+\.[0-9]+')

    if [[ "$GIT_VER" == "$JSON_VER" ]]; then
        echo "ERROR: You forgot to update the version number in package.json!";
        exit 1;
    fi
fi

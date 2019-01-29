#!/usr/bin/env bash

#only perform check if in the develop branch
if [[ $(git branch | grep \* | cut -d ' ' -f2) == "develop" ]]; then
    # If the package.json version matches the git tag, fail
    GIT_VER=$(git describe --abbrev=0 | egrep -o '[0-9]+\.[0-9]+\.[0-9]+')
    JSON_VER=$(egrep '"version": "([0-9]+\.[0-9]+\.[0-9]+"),' package.json | egrep -o '[0-9]+\.[0-9]+\.[0-9]+')

    if [[ "$GIT_VER" == "$JSON_VER" ]]; then
        echo "ERROR: You forgot to update the version number in package.json!";
        exit 1;
    fi
fi

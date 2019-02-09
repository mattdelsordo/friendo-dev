#!/usr/bin/env bash
#Script to get one of Twitter's emojis

curl "https://twemoji.maxcdn.com/2/72x72/$1.png" > "res/img/emoji/$1.png"

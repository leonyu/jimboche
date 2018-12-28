#!/bin/sh

yarn
yarn clean
yarn lint
yarn build
aws s3 cp --acl public-read --recursive ./dist s3://www.jimboche.com/

#!/bin/sh

yarn install
yarn clean
yarn lint
yarn build
rm -fr ./docs/
mv ./dist ./docs/
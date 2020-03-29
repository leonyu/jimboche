#!/bin/sh

yarn
yarn clean
yarn lint
yarn build
rm -fr ./doc
mv ./dist ./doc
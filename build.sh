#!/bin/sh

npm install
npm run clean
npm run lint
npm run build
rm -fr ./docs/
mv ./dist ./docs/

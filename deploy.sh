#!/bin/sh

aws s3 cp --acl public-read --exclude '.*' --exclude '*.sh' --recursive . s3://www.jimboche.com/

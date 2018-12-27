#!/bin/sh
aws s3 cp --acl public-read ./index.html s3://www.leonyu.net/
aws s3 cp --acl public-read ./jimboche.jpeg s3://www.leonyu.net/


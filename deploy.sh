#!/bin/sh
aws s3 cp --acl public-read ./index.html s3://www.jimboche.com/
aws s3 cp --acl public-read ./jimboche.jpeg s3://www.jimboche.com/
aws s3 cp --acl public-read ./ChepteCheptePerungo.ogg s3://www.jimboche.com/

#!/bin/sh

./patch.sh

ionic cordova build android --prod --release --buildConfig

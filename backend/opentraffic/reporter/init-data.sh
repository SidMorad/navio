#!/bin/sh

cd py
./download_manila_reporter_tiles.sh

DATA_DIR=~/volumes/opentraffic/reporter/data/valhalla
sudo mkdir -p $DATA_DIR
sudo cp tiles_* $DATA_DIR/tiles.tar

cd ../

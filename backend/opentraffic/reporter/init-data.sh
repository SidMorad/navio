#!/bin/sh

cd py
./download_tehran_reporter_tiles.sh

DATA_DIR=~/volumes/opentraffic/reporter/data/valhalla
sudo mkdir -p $DATA_DIR
sudo cp tiles_* $DATA_DIR/tiles.tar

cd ../

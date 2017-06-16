#!/bin/bash

if [ ! type foo >/dev/null 2>&1 ]; then
  echo "Please install packer from: https://packer.io"
  exit 1;
fi

echo -n "Using packer: "
packer -version

work_dir=$(pwd)
temp_dir=${work_dir}/tmp
build_dir=${work_dir}/build

if [ -d ${temp_dir} ]; then
  rm -rf ${temp_dir}
fi
mkdir ${temp_dir}

# Compress backend directory into ${temp_dir}
cd ../../
git ls-files . | xargs tar -czf ${temp_dir}/application.tar.gz
cd "${work_dir}"

# Download latest pbf file into ~/osm directory if doesn't exist
if [ -f "$HOME/osm/import.osm.pbf" ]; then
    cp $HOME/osm/import.osm.pbf ${temp_dir}/import.osm.pbf
else
    wget -O ${temp_dir}/import.osm.pbf http://download.geofabrik.de/asia/iran-latest.osm.pbf
fi

nic_name=$(${work_dir}/../scripts/detect-nic.sh)
echo "Using NIC: ${nic_name}"

set -x

PACKER_LOG_FILE=${temp_dir}/packer.log
if [ -f ${PACKERLOG_FILE} ]; then
  rm -rf ${PACKERLOG_FILE}
fi

PACKER_LOG=1 PACKER_LOG_PATH=${PACKER_LOG_FILE} \
  packer \
  build \
  -var bridged_nic_name=${nic_name} \
  -var headless=true \
  opentileserver-ubuntu-1604.json

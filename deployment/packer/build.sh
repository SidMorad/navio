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

nic_name=$(${work_dir}/../scripts/detect-nic.sh)
echo "Using NIC: ${nic_name}"

set -x

PACKER_LOG=1 PACKER_LOG_PATH=${temp_dir}/packer.log \
  packer \
  build \
  -var bridged_nic_name=${nic_name} \
  -force \
  opentileserver-ubuntu-1604.json

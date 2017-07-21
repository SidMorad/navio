#!/bin/bash

set -x

tf_dir="$(pwd)"
root_dir="$(cd ../.. && pwd)"

cd ${root_dir}
tar_archive="/tmp/rahpey.tar.gz"
if [ -f "${tar_archive}" ]; then
    rm "${tar_archive}"
fi
tar -czf "${tar_archive}" --exclude ./deployment/packer .

cd ${tf_dir}
if [ ! -d ".terraform/" ]; then
    terraform init
fi
terraform validate
terraform fmt
TF_VAR_private_key_path="${TF_PRIVATE_KEY_PATH}" terraform plan
TF_LOG=WARN TF_VAR_private_key_path="${TF_PRIVATE_KEY_PATH}" terraform apply

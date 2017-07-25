#!/bin/bash

cd /home/ubuntu/src/deployment/scripts
sudo ./ubuntu-post-installation.sh | tee /tmp/ubuntu.log
cd /home/ubuntu/src/deployment/scripts
sudo ./application-installation.sh | tee /tmp/app.log

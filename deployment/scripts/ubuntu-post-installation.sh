#!/bin/bash

#===============================================================================
# Docker
#===============================================================================

# Install packages to allow apt to use a repository over HTTPS
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Check finger print
apt-key fingerprint 0EBFCD88
# must be 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88

# Add docker repository
add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Update apt
apt-get update

# Install docker-ce (community edition)
apt-get install -y docker-ce

# See installed version
docker version

# Add `ubuntu` user to docker group
groupadd docker
usermod -aG docker ubuntu

#===============================================================================
# Docker-compose
#===============================================================================
# Install docker-compose version 1.13.0
curl -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# See installed version
docker-compose --version
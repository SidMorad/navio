#!/bin/bash

# Find the name of NIC that is UP
# This scripts assumes that "eth"-like interfaces are listed before "wlan"-like interface
# based on alphabetic order
all_nic="$(ip -o link show | awk '{print $2,$9}' | grep UP | cut -d':' -f1)"
echo ${all_nic} | cut -d' ' -f1

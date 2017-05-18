#!/bin/bash

# Find the name of NIC that is UP
# This scripts breaks if you have both eth and wlan at the same time
echo $(ip -o link show | awk '{print $2,$9}' | grep UP | cut -d':' -f1)

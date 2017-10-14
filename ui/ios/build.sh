#!/bin/sh

echo "NAVIO: Updating cocoapods repositories..."
pod repo update

echo "NAVIO: Installing dependencies..."
pod install

echo "\nNAVIO: Giving permission to pods dir. Enter your password if asked."
sudo chmod -R 755 ./Pods

echo "NAVIO: Patching Mapbox..."

echo "Polyline.swift"
cp ./Patches/Polyline.swift ./Pods/Polyline/Polyline/Polyline.swift

echo "OSRMTextInstructions.swift"
cp ./Patches/OSRMTextInstructions.swift ./Pods/OSRMTextInstructions/OSRMTextInstructions/OSRMTextInstructions.swift

echo "RouteController.swift"
cp ./Patches/RouteController.swift ./Pods/MapboxCoreNavigation/MapboxCoreNavigation/RouteController.swift

echo "String.swift"
cp ./Patches/String.swift ./Pods/MapboxCoreNavigation/MapboxCoreNavigation/String.swift

echo "NAVIO: Mapbox patching succeed."

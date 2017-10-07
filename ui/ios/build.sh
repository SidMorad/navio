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

echo "PulleyViewController.swift"
cp ./Patches/PulleyViewController.swift ./Pods/Pulley/PulleyLib/PulleyViewController.swift

echo "OSRMTextInstructions.swift"
cp ./Patches/OSRMTextInstructions.swift ./Pods/OSRMTextInstructions/OSRMTextInstructions/OSRMTextInstructions.swift

echo "RouteController.swift"
cp ./Patches/RouteController.swift ./Pods/MapboxCoreNavigation/MapboxCoreNavigation/RouteController.swift

echo "Style.swift"
cp ./Patches/Style.swift ./Pods/MapboxNavigation/MapboxNavigation/Style.swift

echo "TurnArrowView.swift"
cp ./Patches/TurnArrowView.swift ./Pods/MapboxNavigation/MapboxNavigation/TurnArrowView.swift

echo "LaneArrowView.swift"
cp ./Patches/LaneArrowView.swift ./Pods/MapboxNavigation/MapboxNavigation/LaneArrowView.swift

echo "Abbreviations.swift"
cp ./Patches/Abbreviations.swift ./Pods/MapboxNavigation/MapboxNavigation/Abbreviations.swift

echo "NavigationMapView.swift"
cp ./Patches/NavigationMapView.swift ./Pods/MapboxNavigation/MapboxNavigation/NavigationMapView.swift

echo "DayStyle.swift"
cp ./Patches/DayStyle.swift ./Pods/MapboxNavigation/MapboxNavigation/DayStyle.swift

echo "FeedbackViewController.swift"
cp ./Patches/FeedbackViewController.swift ./Pods/MapboxNavigation/MapboxNavigation/FeedbackViewController.swift

echo "NavigationViewController.swift"
cp ./Patches/NavigationViewController.swift ./Pods/MapboxNavigation/MapboxNavigation/NavigationViewController.swift

echo "RouteManeuverViewController.swift"
cp ./Patches/RouteManeuverViewController.swift ./Pods/MapboxNavigation/MapboxNavigation/RouteManeuverViewController.swift

echo "RouteMapViewController.swift"
cp ./Patches/RouteMapViewController.swift ./Pods/MapboxNavigation/MapboxNavigation/RouteMapViewController.swift

echo "RouteVoiceController.swift"
cp ./Patches/RouteVoiceController.swift ./Pods/MapboxNavigation/MapboxNavigation/RouteVoiceController.swift

echo "UIFont.swift"
cp ./Patches/UIFont.swift ./Pods/MapboxNavigation/MapboxNavigation/UIFont.swift

echo "NAVIO: Mapbox patching succeed."

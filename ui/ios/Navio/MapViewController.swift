//
//  MapViewController.swift
//  Navio
//
//  Created by Babak on 04/08/2017.
//  Copyright © 2017 navio tech team. All rights reserved.
//

import Mapbox

class MapViewController: UIViewController, MGLMapViewDelegate {

	var mapView: MGLMapView!
	let locationManager = CLLocationManager()

	// TODO: temporary, needs to be replaced by user current location coordinates
	// Tehran coordinates
	let customLocation : CLLocationCoordinate2D = CLLocationCoordinate2D(latitude: 35.6892, longitude: 51.389)



	override func viewDidLoad() {
		super.viewDidLoad()
		requestLocationAccess()

		let styleURL = URL(string: "navioRasterV8.json")
		mapView = MGLMapView(frame: view.bounds, styleURL: styleURL)

		mapView.delegate = self

		//locationManager.location!.coordinate
		mapView.setCenter(customLocation, zoomLevel: 8, animated: false)

		mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
		mapView.showsUserLocation = true
		mapView.compassView.isHidden = false

		// TODO: add Mapbox and OSM appreciation somewhere else
		mapView.logoView.isHidden = true
		mapView.attributionButton.isHidden = true

		view.addSubview(mapView)
	}



	// Override annotation markers here
	func mapView(_ mapView: MGLMapView, viewFor annotation: MGLAnnotation) -> MGLAnnotationView? {

		// TODO: needs a better condition
		if annotation.title! == "You Are Here" {

			// Use previously loaded view if exists
			var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: "arrow")

			if annotationView == nil {
				let arrowImage = UIImage(named: "arrow")!

				// Mapbox uses MGLUserLocationAnnotationView specifically for user location annotation
				annotationView = MGLUserLocationAnnotationView(annotation: annotation, reuseIdentifier: "arrow")

				annotationView!.addSubview(UIImageView(image: arrowImage))
			}

			return annotationView
		}
		return nil
	}




	func requestLocationAccess() {
		let authorizationStatus = CLLocationManager.authorizationStatus()

		switch authorizationStatus {
		case .authorizedWhenInUse, .authorizedAlways:
			return

		case .denied, .restricted:
			// TODO: Show a message on how to enable location service from settings
			print("location access denied")

		default:
			locationManager.requestAlwaysAuthorization()
		}
	}



	
	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}
}

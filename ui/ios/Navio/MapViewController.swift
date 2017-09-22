//
//  MapViewController.swift
//  Navio
//
//  Created by Babak on 04/08/2017.
//  Copyright © 2017 navio tech team. All rights reserved.
//

import UIKit
import Mapbox

class MapViewController: UIViewController {

	var mapView: MGLMapView!
	let locationManager = CLLocationManager()

	// TODO: temporary, needs to be replaced by user current location coordinates
	// Tehran coordinates
	let customeLocation : CLLocationCoordinate2D = CLLocationCoordinate2D(latitude: 35.6892, longitude: 51.389)



	override func viewDidLoad() {
		super.viewDidLoad()
		requestLocationAccess()

		let styleURL = URL(string: "navioRasterV8.json")
		mapView = MGLMapView(frame: view.bounds, styleURL: styleURL)

		//locationManager.location!.coordinate
		mapView.setCenter(customeLocation, zoomLevel: 10, animated: false)

		mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
		mapView.tintColor = .white

		view.addSubview(mapView)
	}




	func requestLocationAccess() {
		let authorizationStatus = CLLocationManager.authorizationStatus()

		switch authorizationStatus {
		case .authorizedWhenInUse, .authorizedAlways:
			return

		case .denied, .restricted:
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

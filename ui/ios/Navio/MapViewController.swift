//
//  MapViewController.swift
//  Navio
//
//  Created by Babak on 04/08/2017.
//  Copyright © 2017 navio tech team. All rights reserved.
//

import UIKit
import MapKit

class MapViewController: UIViewController {

	@IBOutlet var mapViewOutlet: MKMapView!

	let locationManager = CLLocationManager()

	override func viewDidLoad() {
		super.viewDidLoad()

		requestLocationAccess()

		mapViewOutlet?.showsUserLocation = true
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

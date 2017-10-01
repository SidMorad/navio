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
	let annotation = MGLPointAnnotation()
	var currentOriginPoint = CLLocationCoordinate2D()
	var currentDestinationPoint = CLLocationCoordinate2D()

	// TODO: temporary, needs to be replaced by user current location coordinates
	// Tehran coordinates
	let customLocation = CLLocationCoordinate2D(latitude: 35.6892, longitude: 51.389)




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

		// Add a long press gesture recognizer to the map
		let longPressGestureRecognizer = UILongPressGestureRecognizer(target: self, action: #selector(addAnnotation(_:)))
		longPressGestureRecognizer.minimumPressDuration = 0.7
		mapView.addGestureRecognizer(longPressGestureRecognizer)
	}




	@objc func addAnnotation(_ gestureRecognizer: UILongPressGestureRecognizer){

		// Check to see if tap duration was satisfied
		if gestureRecognizer.state == .began {

			let touchPoint = gestureRecognizer.location(in: mapView)
			let touchCoordinate = mapView.convert(touchPoint, toCoordinateFrom: mapView)

			// Reversing the touch coordinate to location name
			CLGeocoder().reverseGeocodeLocation(CLLocation(latitude: touchCoordinate.latitude, longitude: touchCoordinate.longitude), completionHandler: { (placemarks, error) -> Void in

				if error != nil {
					print(error.debugDescription)

				} else if placemarks!.count > 0 {
					self.annotation.coordinate = touchCoordinate
					self.annotation.title = placemarks![0].name!

					self.mapView.addAnnotation(self.annotation)

				} else {
					print("CLGeocoder: Could not find the place")
				}
			})
		}
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




	// Allow callout view to appear when an annotation is tapped.
	func mapView(_ mapView: MGLMapView, annotationCanShowCallout annotation: MGLAnnotation) -> Bool {
		return true
	}




	func mapView(_ mapView: MGLMapView, calloutViewFor annotation: MGLAnnotation) -> MGLCalloutView? {
		// Instantiate and return our custom callout view.
		return CalloutView(representedObject: annotation)
	}



	
	func mapView(_ mapView: MGLMapView, tapOnCalloutFor annotation: MGLAnnotation) {

		// Hide the callout.
//		mapView.deselectAnnotation(annotation, animated: true)

		let alertController = UIAlertController(title: annotation.title!, message: "به عنوان مبدا یا مقصد انتخاب کنید", preferredStyle: .actionSheet)

		alertController.addAction(UIAlertAction(title: "برو به اینجا", style: .default, handler: { (action) -> Void in
			self.currentDestinationPoint = annotation.coordinate
		}))

		alertController.addAction(UIAlertAction(title: "از اینجا برو به...", style: .default, handler: { (action) -> Void in
			self.currentOriginPoint = annotation.coordinate
		}))

		alertController.addAction(UIAlertAction(title: "بازگشت", style: .cancel, handler: nil))

		self.present(alertController, animated: true, completion: nil)
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

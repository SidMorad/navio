//
//  MapViewController.swift
//  Navio
//
//  Created by Babak on 04/08/2017.
//  Copyright © 2017 navio tech team. All rights reserved.
//

import MapboxDirections

class MapViewController: UIViewController, MGLMapViewDelegate {
    
    var mapView: MGLMapView!
    let locationManager = CLLocationManager()
    let annotation = MGLPointAnnotation()
    var currentOriginWaypoint = Waypoint(coordinate: CLLocationCoordinate2D())
    var currentDestinationWaypoint = Waypoint(coordinate: CLLocationCoordinate2D())
    var destinationSet = false
    var originSet = false
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        requestLocationAccess()
        
        let styleURL = URL(string: "navioRasterV8.json")
        mapView = MGLMapView(frame: view.bounds, styleURL: styleURL)
        
        mapView.delegate = self
        
        mapView.setCenter(locationManager.location!.coordinate, zoomLevel: 8, animated: false)
        
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
    //    func mapView(_ mapView: MGLMapView, viewFor annotation: MGLAnnotation) -> MGLAnnotationView? {
    //
    //        // TODO: needs a better condition
    //        if annotation.title! == "You Are Here" {
    //
    //            // Use previously loaded view if exists
    //            var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: "arrow")
    //
    //            if annotationView == nil {
    //                let arrowImage = UIImage(named: "arrow")!
    //
    //                // Mapbox uses MGLUserLocationAnnotationView specifically for user location annotation
    //                annotationView = MGLUserLocationAnnotationView(annotation: annotation, reuseIdentifier: "arrow")
    //
    //                annotationView!.addSubview(UIImageView(image: arrowImage))
    //            }
    //
    //            return annotationView
    //        }
    //        return nil
    //    }
    
    
    
    
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
        //        mapView.deselectAnnotation(annotation, animated: true)
        
        let alertController = UIAlertController(title: annotation.title!, message: "به عنوان مبدا یا مقصد انتخاب کنید", preferredStyle: .actionSheet)
        
        alertController.addAction(UIAlertAction(title: "برو به اینجا", style: .default, handler: { (action) -> Void in
            self.currentDestinationWaypoint = Waypoint(coordinate:annotation.coordinate, name: annotation.title!)
            self.destinationSet =  true
            self.showNavigationView()
        }))
        
        alertController.addAction(UIAlertAction(title: "از اینجا برو به...", style: .default, handler: { (action) -> Void in
            self.currentOriginWaypoint = Waypoint(coordinate:annotation.coordinate, name: annotation.title!)
            self.originSet =  true
            self.showNavigationView()
        }))
        
        alertController.addAction(UIAlertAction(title: "بازگشت", style: .cancel, handler: nil))
        
        self.present(alertController, animated: true, completion: nil)
    }
    
    
    
    
    func showNavigationView(){
        
        var waypoints = [
            currentOriginWaypoint,
            currentDestinationWaypoint,
            ]
        
        if originSet && !destinationSet {
            return
        } else if !originSet && destinationSet{
            waypoints = [
                Waypoint(coordinate: locationManager.location!.coordinate),
                currentDestinationWaypoint
            ]
        }
        
        let options = RouteOptions(waypoints: waypoints, profileIdentifier: .automobileAvoidingTraffic)
        
        options.includesSteps = true
        
        let directions = Directions.shared
        _ = directions.calculate(options) { (waypoints, routes, error) in
            guard error == nil else {
                print("Error calculating directions: \(error!)")
                return
            }
            
            let viewController = NavigationViewController(for: routes!.first!)
            self.present(viewController, animated: true, completion: nil)
        }
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

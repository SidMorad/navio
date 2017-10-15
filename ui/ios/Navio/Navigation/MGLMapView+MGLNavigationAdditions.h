#import <Mapbox/Mapbox.h>

//! Project version number for MapboxNavigation.
FOUNDATION_EXPORT double MapboxNavigationVersionNumber;

//! Project version string for MapboxNavigation.
FOUNDATION_EXPORT const unsigned char MapboxNavigationVersionString[];

@interface MGLMapView (MGLNavigationAdditions) <CLLocationManagerDelegate>

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations;

- (void)validateLocationServices;

@property (nonatomic, readonly) CLLocationManager *locationManager;

@end

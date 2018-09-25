package biz.navio;
//import java.security.MessageDigest;
import java.util.List;

import android.graphics.PointF;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

// classes needed to initialize map
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.mapboxsdk.annotations.Icon;
import com.mapbox.mapboxsdk.annotations.IconFactory;
import com.mapbox.mapboxsdk.maps.MapView;

// classes needed to add location layer
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import android.location.Location;
import com.mapbox.mapboxsdk.geometry.LatLng;
import android.support.annotation.NonNull;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.plugins.locationlayer.LocationLayerMode;
import com.mapbox.mapboxsdk.plugins.locationlayer.LocationLayerPlugin;
import com.mapbox.services.android.location.LostLocationEngine;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncher;
import com.mapbox.services.android.navigation.ui.v5.NavigationViewOptions;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;
import com.mapbox.services.android.telemetry.location.GoogleLocationEngine;
import com.mapbox.services.android.telemetry.location.LocationEngine;
import com.mapbox.services.android.telemetry.location.LocationEngineListener;
import com.mapbox.services.android.telemetry.location.LocationEnginePriority;
import com.mapbox.services.android.telemetry.permissions.PermissionsListener;
import com.mapbox.services.android.telemetry.permissions.PermissionsManager;

// classes needed to add a marker
import com.mapbox.mapboxsdk.annotations.Marker;
import com.mapbox.mapboxsdk.annotations.MarkerViewOptions;

// classes to calculate a route
import com.mapbox.services.android.navigation.ui.v5.route.NavigationMapRoute;
import com.mapbox.api.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import android.util.Log;

// classes needed to launch navigation UI
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;


public class MapboxActivity extends AppCompatActivity implements LocationEngineListener, PermissionsListener {

    private MapView mapView;

    // variables for adding location layer
    private MapboxMap map;
    private PermissionsManager permissionsManager;
    private LocationLayerPlugin locationPlugin;
    private LocationEngine locationEngine;

    // variables for adding a marker
    private Marker destinationMarker;
    private LatLng originCoord;
    private LatLng destinationCoord;
    private Location originLocation;

    // variable for pick a location
    private Marker droppedMarker;
    private ImageView hoveringMarker;
    private Button selectLocationButton;

    // variables for calculating and drawing a route
    private Point originPosition;
    private Point destinationPosition;
    private DirectionsRoute currentRoute;
    private static final String TAG = "DirectionsActivity";
    private NavigationMapRoute navigationMapRoute;

    private Button startNavigationButton;

    GoogleLocationEngine googleLocationEngine; // Only referencing this class file to be included in built apk

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Mapbox.getInstance(this, getString(R.string.MapboxAccessToken));
        setContentView(R.layout.activity_mapbox);
        mapView = (MapView) findViewById(R.id.mapboxView);
        mapView.onCreate(savedInstanceState);

        // Add user location to the map
        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(final MapboxMap mapboxMap) {
                MapboxActivity.this.map = mapboxMap;
                enableLocationPlugin();
                originCoord = new LatLng(originLocation.getLatitude(), originLocation.getLongitude());

/*  // Following section didn't work as expected - (feature: click on the map for adding destination)
    // It may start to work in next Mapbox SDK version.
                mapboxMap.setOnMapClickListener(new MapboxMap.OnMapClickListener() {
                    @Override
                    public void onMapClick(@NonNull LatLng point) {
                        Log.d(TAG, "OnMapClick fired##############" + point);

                        if (destinationMarker != null) {
                            mapboxMap.removeMarker(destinationMarker);
                        }

                        destinationCoord = point;

                        destinationMarker = mapboxMap.addMarker(new MarkerViewOptions()
                                .position(destinationCoord)
                        );
                        destinationPosition = Point.fromLngLat(destinationCoord.getLongitude(), destinationCoord.getLatitude());
                        originPosition = Point.fromLngLat(originCoord.getLongitude(), originCoord.getLatitude());
                        getRoute(originPosition, destinationPosition);
                        startNavigationButton.setEnabled(true);
                        startNavigationButton.setBackgroundResource(R.color.mapboxBlue);
                    };
                });
*/
            }
        });

        startNavigationButton = findViewById(R.id.start_navigation_button);
        startNavigationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Point origin = MapboxActivity.this.originPosition;
                Point destination = MapboxActivity.this.destinationPosition;
                MapboxActivity.this.getRoute(origin, destination);
            }
        });

        // When user is still picking a location, we hover a marker above the mapboxMap in the center
        hoveringMarker = new ImageView(this);
        hoveringMarker.setImageResource(R.drawable.marker_icon_red);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.CENTER);
        hoveringMarker.setLayoutParams(params);
        mapView.addView(hoveringMarker);

        // Button for user to drop marker or to pick marker back up.
        selectLocationButton = findViewById(R.id.select_location_button);
        selectLocationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (map != null) {
                    if (droppedMarker == null) {
                        // We first find where the hovering marker position is relative to the mapboxMap
                        // Then we set the visibility to gone.
                        float coordinateX = hoveringMarker.getLeft() + (hoveringMarker.getWidth() / 2);
                        float coordinateY = hoveringMarker.getBottom();
                        float[] coords = new float[]{coordinateX, coordinateY};
                        final LatLng latLng = map.getProjection().fromScreenLocation(new PointF(coords[0], coords[1]));
                        destinationPosition = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
                        originPosition = Point.fromLngLat(originLocation.getLongitude(), originLocation.getLatitude());
                        getRoute(originPosition, destinationPosition);
                        startNavigationButton.setEnabled(true);
                        startNavigationButton.setBackgroundResource(R.color.mapboxBlue);
                        hoveringMarker.setVisibility(View.GONE);

                        // Transform the appearance of the startNavigationButton to become the cancel startNavigationButton
                        selectLocationButton.setBackgroundColor(ContextCompat.getColor(MapboxActivity.this, R.color.colorAccent));
                        selectLocationButton.setText("Cancel");

                        Icon icon = IconFactory.getInstance(MapboxActivity.this).fromResource(R.drawable.marker_icon_green);
                        droppedMarker = map.addMarker(new MarkerViewOptions().position(latLng).icon(icon));

                        // we get the geocoding information
                        reverseGeocode(latLng);
                    } else {
                        // When the marker is dropped, the user has clicked the startNavigationButton to cancel.
                        map.removeMarker(droppedMarker);

                        startNavigationButton.setEnabled(false);
                        startNavigationButton.setBackgroundResource(R.color.mapboxGrayLight);
                        selectLocationButton.setBackgroundColor(ContextCompat.getColor(MapboxActivity.this, R.color.colorPrimary));
                        selectLocationButton.setText("Select a location");


                        // Lastly, set the hovering marker back to visible.
                        hoveringMarker.setVisibility(View.VISIBLE);
                        droppedMarker = null;
                    }
                }
            }
        });
    }

    private void getRoute(Point origin, Point destination) {
        String accessToken = getString(R.string.MGLMapboxAccessToken) +
                origin.latitude() + origin.longitude() +
                destination.latitude() + destination.longitude();
        NavigationRoute.builder()
//                .baseUrl("https://navio.biz/")
//                .accessToken("pk." + sha256(accessToken))
                .accessToken(Mapbox.getAccessToken())
                .origin(origin)
                .destination(destination)
                .build()
                .getRoute(new Callback<DirectionsResponse>() {
                    @Override
                    public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
                        // You can get the generic HTTP info about the response
                        Log.d(TAG, "Response code: " + response.code());
                        Log.i(TAG, "Request url: " + call.request().url().toString());

                        if (response.body() == null) {
                            Log.e(TAG, "No routes found, make sure you set the right user and access token.");
                            return;
                        } else if (response.body().routes().size() < 1) {
                            Log.e(TAG, "No routes found");
                            return;
                        }

                        currentRoute = response.body().routes().get(0);

                        // Draw the route on the map
                        if (navigationMapRoute != null) {
                            navigationMapRoute.removeRoute();
                        } else {
                            navigationMapRoute = new NavigationMapRoute(null, mapView, map, R.style.NavigationMapRoute);
                        }
                        navigationMapRoute.addRoute(currentRoute);

                        // Pass in your Amazon Polly pool id for speech synthesis using Amazon Polly
                        // Set to null to use the default Android speech synthesizer
                        String awsPoolId = null;

                        boolean simulateRoute = true;

                        // Call this method with Context from within an Activity
                        NavigationViewOptions navigationViewOptions = NavigationViewOptions.builder()
                                .directionsRoute(currentRoute)
                                .awsPoolId(awsPoolId)
                                .shouldSimulateRoute(simulateRoute)
                                .build();
                        NavigationLauncher.startNavigation(MapboxActivity.this, navigationViewOptions);
                    }

                    @Override
                    public void onFailure(Call<DirectionsResponse> call, Throwable throwable) {
                        Log.e(TAG, "Error: " + throwable.getMessage());
                    }
                });
    }

    @SuppressWarnings({"MissingPermission"})
    private void enableLocationPlugin() {
        // Check if permissions are enabled and if not request
        if (PermissionsManager.areLocationPermissionsGranted(this)) {
            // Create an instance of LOST location engine
            initializeLocationEngine();

            locationPlugin = new LocationLayerPlugin(mapView, map, locationEngine);
            locationPlugin.setLocationLayerEnabled(LocationLayerMode.TRACKING);
        } else {
            permissionsManager = new PermissionsManager(this);
            permissionsManager.requestLocationPermissions(this);
        }
    }

    @SuppressWarnings({"MissingPermission"})
    private void initializeLocationEngine() {
        locationEngine = new LostLocationEngine(MapboxActivity.this);
        locationEngine.setPriority(LocationEnginePriority.HIGH_ACCURACY);
        locationEngine.activate();

        Location lastLocation = locationEngine.getLastLocation();
        if (lastLocation != null) {
            originLocation = lastLocation;
            setCameraPosition(lastLocation);
        } else {
            locationEngine.addLocationEngineListener(this);
        }
    }

    private void setCameraPosition(Location location) {
        map.animateCamera(CameraUpdateFactory.newLatLngZoom(
                new LatLng(location.getLatitude(), location.getLongitude()), 13));
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        permissionsManager.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onExplanationNeeded(List<String> permissionsToExplain) {

    }

    @Override
    public void onPermissionResult(boolean granted) {
        if (granted) {
            enableLocationPlugin();
        } else {
            finish();
        }
    }

    @Override
    @SuppressWarnings({"MissingPermission"})
    public void onConnected() {
        locationEngine.requestLocationUpdates();
    }

    @Override
    public void onLocationChanged(Location location) {
        if (location != null) {
            originLocation = location;
            setCameraPosition(location);
            locationEngine.removeLocationEngineListener(this);
        }
    }

    @Override
    @SuppressWarnings({"MissingPermission"})
    protected void onStart() {
        super.onStart();
        if (locationEngine != null) {
            locationEngine.requestLocationUpdates();
        }
        if (locationPlugin != null) {
            locationPlugin.onStart();
        }
        mapView.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        if (locationEngine != null) {
            locationEngine.removeLocationUpdates();
        }
        if (locationPlugin != null) {
            locationPlugin.onStop();
        }
        mapView.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
        if (locationEngine != null) {
            locationEngine.deactivate();
        }
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    private void reverseGeocode(LatLng latLng) {
        // TODO
    }

//    public static String sha256(String base) {
//        try {
//            MessageDigest digest = MessageDigest.getInstance("SHA-256");
//            byte[] hash = digest.digest(base.getBytes("UTF-8"));
//            StringBuilder hexString = new StringBuilder();
//
//            for (int i = 0; i < hash.length; i++) {
//                String hex = Integer.toHexString(0xff & hash[i]);
//                if (hex.length() == 1) hexString.append('0');
//                hexString.append(hex);
//            }
//
//            return hexString.toString();
//        } catch (Exception ex) {
//            throw new RuntimeException(ex);
//        }
//    }

}
package biz.navio;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import com.mapbox.directions.v5.DirectionsCriteria;
import com.mapbox.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.annotations.PolylineOptions;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncher;
import com.mapbox.services.android.navigation.ui.v5.route.NavigationMapRoute;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigation;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigationOptions;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;
import com.mapbox.services.android.telemetry.location.LocationEngine;
import com.mapbox.services.android.telemetry.location.LostLocationEngine;
import com.mapbox.services.commons.geojson.LineString;
import com.mapbox.services.commons.models.Position;

import java.security.MessageDigest;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.mapbox.services.Constants.PRECISION_6;

/**
 * Main activity for using Mapbox SDK
 */

public class MapboxActivity extends AppCompatActivity {
    private MapView mapView;
    private MapboxMap map;
    private DirectionsRoute currentRoute;
//    private MapboxDirections client;
    private MapboxNavigation navigation;
    private NavigationMapRoute navigationMapRoute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Mapbox.getInstance(this, getString(R.string.MapboxAccessToken));
        setContentView(R.layout.activity_mapbox);

        final Point origin = Point.fromLngLat(51.4231, 35.6961);
        final Point destination = Point.fromLngLat(51.3231, 35.6266);

        mapView = findViewById(R.id.mapboxView);
        mapView.onCreate(savedInstanceState);
        MapboxNavigationOptions navigationOptions = MapboxNavigationOptions.builder()
                .isDebugLoggingEnabled(true).build();
        navigation = new MapboxNavigation(MapboxActivity.this, getString(R.string.MapboxAccessToken), navigationOptions);
        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(MapboxMap mapboxMap) {
                map = mapboxMap;
                navigationMapRoute = new NavigationMapRoute(navigation, mapView, map, R.style.NavigationMapRoute);

                mapboxMap.addMarker(new MarkerOptions().position(new LatLng(origin.latitude(), origin.longitude()))
                    .title(getString(R.string.origin_title_test))
                    .snippet(getString(R.string.origin_snippet_test)));
                mapboxMap.addMarker(new MarkerOptions().position(new LatLng(destination.latitude(), destination.longitude()))
                    .title(getString(R.string.destination_title_test))
                    .snippet(getString(R.string.destination_snippet_test)));
Log.e("NV", "It did got here");
                // Get route from AP
                getRoute(origin, destination);
            }
        });
//        LocationEngine locationEngine = LostLocationEngine.getLocationEngine(this);
//        navigation.setLocationEngine(locationEngine);
    }

    private void getRoute(Point origin, Point destination) {
        String accessToken = getString(R.string.MGLMapboxAccessToken) +
                origin.latitude() + origin.longitude() +
                destination.latitude() + origin.longitude();
        NavigationRoute client = NavigationRoute.builder()
//            .baseUrl("https://navio.biz")
            .accessToken(getString(R.string.MapboxAccessToken))
            .origin(origin)
            .destination(destination)
            .profile(DirectionsCriteria.PROFILE_DRIVING)
            .build();

        client.getRoute(new Callback<com.mapbox.directions.v5.models.DirectionsResponse>() {
            @Override
            public void onResponse(Call<com.mapbox.directions.v5.models.DirectionsResponse> call, Response<com.mapbox.directions.v5.models.DirectionsResponse> response) {
                Log.e("NV", "##################" + call.request().url().toString());
                Log.d("NV", "Response code: " + response.code());

                com.mapbox.directions.v5.models.DirectionsResponse resp = response.body();
                if (resp == null) {
                    Log.e("NV", "No routes found, make sure you set the right user and access token.");
                    return;
                } else if (resp.routes().size() < 1) {
                    Log.e("NV", "No routes found");
                    return;
                }

                // print some info about the route
                currentRoute = resp.routes().get(0);
                Log.d("NV", "Distance: " + currentRoute.distance());
                Toast.makeText(MapboxActivity.this, String.format(getString(R.string.directions_toast_message), currentRoute.distance()), Toast.LENGTH_SHORT).show();

                // Draw the route on the map
//              navigation.startNavigation(currentRoute);
                NavigationLauncher.startNavigation(MapboxActivity.this, currentRoute, "your_cognito_pool_id", true);

            }

            @Override
            public void onFailure(Call<com.mapbox.directions.v5.models.DirectionsResponse> call, Throwable throwable) {
                Log.e("NV", "onFailure: ", throwable);
            }
        });

    }

    @Override
    protected void onStart() {
        super.onStart();
        mapView.onStart();
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
    protected void onStop() {
        super.onStop();
        mapView.onStop();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
//        if (client != null) {
//            client.cancelCall();
//        }
//        navigation.endNavigation();
//        navigation.onDestroy();
        mapView.onDestroy();
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    public static String sha256(String base) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }
}

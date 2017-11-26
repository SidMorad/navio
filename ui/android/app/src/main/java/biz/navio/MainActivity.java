/*package biz.navio;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.oscim.android.canvas.AndroidGraphics;
import org.oscim.backend.canvas.Bitmap;
import org.oscim.core.GeoPoint;
import org.oscim.core.MapPosition;
import org.oscim.core.MercatorProjection;
import org.oscim.event.Gesture;
import org.oscim.event.GestureListener;
import org.oscim.event.MotionEvent;
import org.oscim.layers.Layer;
import org.oscim.layers.marker.ItemizedLayer;
import org.oscim.layers.marker.MarkerItem;
import org.oscim.layers.marker.MarkerSymbol;
import org.oscim.layers.tile.bitmap.BitmapTileLayer;
import org.oscim.layers.vector.PathLayer;
import org.oscim.layers.vector.geometries.Style;
import org.oscim.map.Map;
import org.oscim.renderer.MapRenderer;
import org.oscim.tiling.TileSource;
import org.oscim.tiling.source.bitmap.BitmapTileSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.PathWrapper;
import com.graphhopper.api.GraphHopperWeb;
import com.graphhopper.util.Parameters.Algorithms;
import com.graphhopper.util.Parameters.Routing;
import com.graphhopper.util.PointList;
import com.graphhopper.util.StopWatch;

import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.widget.Toast;
import okhttp3.OkHttpClient;

public class MainActivity extends MapActivity {

	static final Logger logger = LoggerFactory.getLogger(MainActivity.class);

	private final static String tileUrl = "http://navio.biz/tile";
	private final static String routeServiceUrl = "https://navio.biz/route/v1/get";
//	private final static String vectorTileUrl =   "http://192.168.10.100:8983/data/v3/{z}/{x}/{y}.pbf";
//	private final static String routeServiceUrl = "http://192.168.10.100/route/v1/get";
	private final TileSource tileSource;
	protected BitmapTileLayer tileLayer;

	private volatile boolean shortestPathRunning = false;
	private GeoPoint start;
	private GeoPoint end;
	private ItemizedLayer<MarkerItem> itemizedLayer;
	private PathLayer pathLayer;
//    private DefaultMapScaleBar mapScaleBar;

	private final GraphHopperWeb routeApi;

	public MainActivity() {
		this(BitmapTileSource.builder().url(tileUrl).zoomMax(18).build());
//		this(MapzenMvtTileSource.builder().url(vectorTileUrl).zoomMax(18).build());
//		this(new OSciMap4TileSource());
	}

	public MainActivity(TileSource tSource) {
		super(R.layout.activity_map);
		tileSource = tSource;
		routeApi = new GraphHopperWeb(routeServiceUrl);
		routeApi.setDownloader(new OkHttpClient().newBuilder()
				.connectTimeout(30, TimeUnit.SECONDS)
				.readTimeout(30, TimeUnit.SECONDS).build());
	}

	@Override
	protected void onCreate(Bundle saveInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(saveInstanceState);

		MapRenderer.setBackgroundColor(0xff777777);

		createLayers();
	}

	void createLayers() {
		logUser("Loading map...");
//		  tileLayer = new VectorTileLayer(map, tileSource);
//		  map.layers().add(tileLayer);
//		  VectorTileLayer l = map.setBaseMap(tileSource);
//        GroupLayer groupLayer = new GroupLayer(map);
//        groupLayer.layers.add(new BuildingLayer(map, l));
//        groupLayer.layers.add(new LabelLayer(map, l));
//        map.layers().add(groupLayer);
//
//        mapScaleBar = new DefaultMapScaleBar(map);
//        mapScaleBar.setScaleBarMode(DefaultMapScaleBar.ScaleBarMode.BOTH);
//        mapScaleBar.setDistanceUnitAdapter(MetricUnitAdapter.INSTANCE);
//        mapScaleBar.setSecondaryDistanceUnitAdapter(ImperialUnitAdapter.INSTANCE);
//        mapScaleBar.setScaleBarPosition(MapScaleBar.ScaleBarPosition.BOTTOM_LEFT);
//
//        MapScaleBarLayer mapScaleBarLayer = new MapScaleBarLayer(map, mapScaleBar);
//        BitmapRenderer renderer = mapScaleBarLayer.getRenderer();
//        renderer.setPosition(GLViewport.Position.BOTTOM_LEFT);
//        renderer.setOffset(5 * getResources().getDisplayMetrics().density, 0);
//        map.layers().add(mapScaleBarLayer);
//
//        map.setTheme(VtmThemes.DEFAULT);

		tileLayer = new BitmapTileLayer(map, tileSource);
		map.layers().add(tileLayer);

        // Map event receiver
        mapView.map().layers().add(new MapEventsReceiver(map));
        // Marker layer
        itemizedLayer = new ItemizedLayer<>(map, (MarkerSymbol) null);
        map.layers().add(itemizedLayer);

		mapView.postDelayed(new Runnable() {
			public void run() {
				MapPosition p = new MapPosition();
				p.setScale(2 + (1 << 10));
				p.setX(MercatorProjection.longitudeToX(51.403284));
				p.setY(MercatorProjection.latitudeToY(35.700138));
				map.setMapPosition(p);
//				map.animator().animateTo(1000, p);
			}

		}, 2000);
	}

	protected boolean onLongPress(GeoPoint p) {
		if (shortestPathRunning) {
			logUser("Calculation still in progress");
			return false;
		}

		if (start != null && end == null) {
			end = p;
			shortestPathRunning = true;
			itemizedLayer.addItem(createMarkerItem(p, R.drawable.marker_icon_red));
			map.updateMap(true);

			calcPath(start.getLatitude(), start.getLongitude(), end.getLatitude(), end.getLongitude());
		} else {
			start = p;
			end = null;
			// remove routing layers
			map.layers().remove(pathLayer);
			itemizedLayer.removeAllItems();
			itemizedLayer.addItem(createMarkerItem(start, R.drawable.marker_icon_green));
			map.updateMap(true);
		}
		return true;
	}

	private void calcPath(final double fromLat, final double fromLon,
			              final double toLat, final double toLon) {
		logUser("Calculating path ...");
		new AsyncTask<Void, Void, PathWrapper>() {
			float time;

			protected PathWrapper doInBackground(Void... v) {
				StopWatch sw = new StopWatch().start();
				GHRequest req = new GHRequest(fromLat, fromLon, toLat, toLon);
				req.setAlgorithm(Algorithms.DIJKSTRA_BI);
				req.getHints().put(Routing.INSTRUCTIONS, false);
				GHResponse resp = routeApi.route(req);
				time = sw.stop().getSeconds();
				return resp.getBest();
			}

			protected void onPostExecute(PathWrapper resp) {
				if (!resp.hasErrors()) {
					log(String.format("from:%s,%s to:%s,%s found path with distance:%s,"
							+ " nodes:%s, time:%s %s", fromLat, fromLon, toLat, toLon,
							resp.getDistance() / 1000f, resp.getPoints().getSize(), time,
							resp.getDebugInfo()));
					logUser(String.format("the route is %skm long, time:%s min",
							(int) (resp.getDistance() / 100) / 10f, resp.getTime() / 60000f));
					pathLayer = createPathLayer(resp);
					map.layers().add(pathLayer);
					map.updateMap(true);
				}
				else {
					log("First Error: ", resp.getErrors().get(0));
					log("Errors: " + resp.getErrors());
				}
				shortestPathRunning = false;
			}

		}.execute();
	}

	private PathLayer createPathLayer(PathWrapper response) {
		Style style = Style.builder()
				.fixed(true)
				.generalization(Style.GENERALIZATION_SMALL)
				.strokeColor(0x9900cc33)
				.strokeWidth(4 * getResources().getDisplayMetrics().density)
				.build();
		PathLayer pathLayer = new PathLayer(map, style);
		List<GeoPoint> geoPoints = new ArrayList<GeoPoint>();
		PointList pointList = response.getPoints();
		for (int i = 0; i < pointList.getSize(); i++)
			geoPoints.add(new GeoPoint(pointList.getLatitude(i), pointList.getLongitude(i)));
		pathLayer.setPoints(geoPoints);
		return pathLayer;
	}

	@SuppressWarnings("deprecation")
	private MarkerItem createMarkerItem(GeoPoint p, int resource) {
		Drawable drawable = getResources().getDrawable(resource);
		Bitmap bitmap = AndroidGraphics.drawableToBitmap(drawable);
		MarkerSymbol markerSymbol = new MarkerSymbol(bitmap, 0.5f, 1);
		MarkerItem markerItem = new MarkerItem("", "", p);
		markerItem.setMarker(markerSymbol);
		return markerItem;
	}

	class MapEventsReceiver extends Layer implements GestureListener {

		public MapEventsReceiver(Map map) {
			super(map);
		}

		@Override
		public boolean onGesture(Gesture g, MotionEvent e) {
			if (g instanceof Gesture.LongPress) {
				GeoPoint p = map.viewport().fromScreenPoint(e.getX(), e.getY());
				return onLongPress(p);
			}
			return false;
		}

	}

    private void log(String str) {
        Log.d("NV", str);
        logger.debug(str);
    }

    private void log(String str, Throwable t) {
        Log.d("NV", str, t);
        logger.debug(str, t);
    }

    private void logUser(String str) {
        log(str);
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

}
*/
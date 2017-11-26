/*package biz.navio;

import android.app.Activity;
import android.os.Bundle;

import org.oscim.android.MapView;
import org.oscim.map.Map;

/**
 * MapActivity is abstract class which can be extended in order to use a
 * {@link MapView}.
 * <p/>
 * A subclass my create a MapView either via one of the MapView constructores or
 * by inflating an XML layout file.
 *
public abstract class MapActivity extends Activity {

	protected Map map;
	protected MapView mapView;

	protected final int contentView;

	public MapActivity() {
		this(R.layout.activity_map);
	}

	public MapActivity(int contentViewId) {
		contentView = contentViewId;
	}

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(contentView);

		mapView = (MapView) findViewById(R.id.mapView);
		map = mapView.map();
	}

	public Map map() {
		return map;
	}

	@Override
	protected void onDestroy() {
		mapView.onDestroy();
		super.onDestroy();
	}

	@Override
	protected void onResume() {
		super.onResume();
		mapView.onResume();
	}

	@Override
	protected void onStop() {
		mapView.onPause();
		super.onStop();
	}

}
*/
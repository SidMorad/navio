package biz.navio;

import android.os.Bundle;

import org.oscim.layers.tile.bitmap.BitmapTileLayer;
import org.oscim.tiling.source.bitmap.BitmapTileSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MainActivity extends MapActivity {

	static final Logger log = LoggerFactory.getLogger(MainActivity.class);

	private final static String tileUrl = "http://tile.openstreetmap.org";
	private final BitmapTileSource tileSource;
	protected BitmapTileLayer bitmapTileLayer;

	public MainActivity() {
		this(BitmapTileSource.builder().url(tileUrl).zoomMax(18).build());
	}

	public MainActivity(BitmapTileSource bitmapTileSource) {
		super(R.layout.activity_map);
		tileSource = bitmapTileSource;
	}

	@Override
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);

		if (tileSource == null)
			return;

		bitmapTileLayer = new BitmapTileLayer(map, tileSource);
		map.layers().add(bitmapTileLayer);

	}

}
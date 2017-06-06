package com.rahpey.route.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.api.GraphHopperWeb;

import okhttp3.OkHttpClient;

@Service
public class RouteEngineService {

	@Value("${application.routeEngineServiceUrl}")
	public String routeEngineServiceUrl;

	private GraphHopperWeb graphHopperWeb;

	public GraphHopperWeb routingApi() {
		if (graphHopperWeb == null) {
			graphHopperWeb = new GraphHopperWeb(routeEngineServiceUrl);
			graphHopperWeb.setDownloader(new OkHttpClient.Builder()
					.connectTimeout(5, TimeUnit.SECONDS).readTimeout(5, TimeUnit.SECONDS).build());
		}
		return graphHopperWeb;
	}

	public GHResponse route(GHRequest ghRequest) {
		return routingApi().route(ghRequest);
	}

}
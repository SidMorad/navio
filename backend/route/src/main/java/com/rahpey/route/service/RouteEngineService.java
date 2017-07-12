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

	@Value("${application.routeEngine.serviceUrl}")
	public String serviceUrl;

	@Value("${application.routeEngine.connectTimeout}")
	public Integer connectTimeout;

   @Value("${application.routeEngine.readTimeout}")
    public Integer readTimeout;

	private GraphHopperWeb graphHopperWeb;

	public GraphHopperWeb routingApi() {
		if (graphHopperWeb == null) {
			graphHopperWeb = new GraphHopperWeb(serviceUrl);
			graphHopperWeb.setDownloader(new OkHttpClient.Builder()
					.connectTimeout(connectTimeout, TimeUnit.SECONDS)
					.readTimeout(readTimeout, TimeUnit.SECONDS).build());
		}
		return graphHopperWeb;
	}

	public GHResponse route(GHRequest ghRequest) {
		return routingApi().route(ghRequest);
	}

}
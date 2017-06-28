package com.rahpey.route.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to JHipster.
 * <p>
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

	private String routeEngineServiceUrl;

	public String getRouteEngineServiceUrl() {
		return routeEngineServiceUrl;
	}

	public void setRouteEngineServiceUrl(String routeEngineServiceUrl) {
		this.routeEngineServiceUrl = routeEngineServiceUrl;
	}

}
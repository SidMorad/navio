package com.rahpey.traffic.web.rest.tracking;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang.builder.ToStringBuilder;

public final class CarSpeedCommand {

	@NotNull
	@Max(90)
	@Min(-90)
	private Double latitude;

	@NotNull
	@Max(180)
	@Min(-180)
	private Double longitude;

	private Float speed;
	private Float heading;
	private Float accuracy;

	public CarSpeedCommand() {
	}

	public CarSpeedCommand(Double latitude, Double longitude, Float speed, Float heading, Float accuracy) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.speed = speed;
		this.heading = heading;
		this.accuracy = accuracy;
	}

	/**
	 * Representing the position's latitude in decimal degrees.
	 */
	public Double lat() {
		return latitude;
	}

	/**
	 * Representing the position's longitude in decimal degrees.
	 */
	public Double lng() {
		return longitude;
	}

	/**
	 * Representing the velocity of the device in meters per second. This value can be null.
	 */
	public Float speed() {
		return speed;
	}

	/**
	 * Representing the accuracy of the latitude and longitude properties, expressed in meters.
	 */
	public Float accuracy() {
		return accuracy;
	}

	/**
	 * Representing the direction in which the device is traveling.
	 */
	public Float heading() {
		return heading;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public Double getLatitude() {
		return latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public Float getSpeed() {
		return speed;
	}

	public Float getHeading() {
		return heading;
	}

	public Float getAccuracy() {
		return accuracy;
	}

}
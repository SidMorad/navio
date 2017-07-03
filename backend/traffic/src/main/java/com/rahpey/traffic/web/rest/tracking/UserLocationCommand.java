package com.rahpey.traffic.web.rest.tracking;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang.builder.ToStringBuilder;

public final class UserLocationCommand {

    @NotNull
    @Max(90)
    @Min(-90)
    private Double latitude;

    @NotNull
    @Max(180)
    @Min(-180)
    private Double longitude;

    private String mobileId;

    public UserLocationCommand() {
    }

    public UserLocationCommand(Double latitude, Double longitude, String mobileId) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.mobileId = mobileId;
    }

    public Double lat() {
        return latitude;
    }

    public Double lng() {
        return longitude;
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

    public String getMobileId() {
        return mobileId;
    }

}
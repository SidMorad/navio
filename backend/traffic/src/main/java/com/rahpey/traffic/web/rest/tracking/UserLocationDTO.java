package com.rahpey.traffic.web.rest.tracking;

import com.rahpey.traffic.domain.model.userlocation.UserLocationHistory;

public class UserLocationDTO {

    private final Double latitude;
    private final Double longitude;
    private final String userId;

    public UserLocationDTO(UserLocationHistory userLocationHistory) {
        this.latitude = userLocationHistory.getLatitude();
        this.longitude = userLocationHistory.getLongitude();
        this.userId = userLocationHistory.getUserId();
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getUserId() {
        return userId;
    }

}
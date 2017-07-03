package com.rahpey.traffic.domain.model.userlocation;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.google.common.geometry.S2CellId;
import com.google.common.geometry.S2LatLng;
import com.rahpey.traffic.web.rest.tracking.UserLocationCommand;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.security.Principal;
import java.time.Instant;
import java.util.Objects;

/**
 * A UserLocationHistory.
 */
@Entity
@Table(name = "user_location_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserLocationHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "cell_id", nullable = false)
    private Long cellId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "mobile_id")
    private String mobileId;

    @NotNull
    @Column(name = "created", nullable = false)
    private Instant created;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    public UserLocationHistory() {
    }

    public UserLocationHistory(UserLocationCommand cmd, Principal principal) {
        this.cellId = S2CellId.fromLatLng(S2LatLng.fromDegrees(cmd.lat(), cmd.lng())).id();
        this.latitude = cmd.getLatitude();
        this.longitude = cmd.getLongitude();
        this.userId = (principal != null ? principal.getName() : null);
        this.mobileId = cmd.getMobileId();
        this.created = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCellId() {
        return cellId;
    }

    public UserLocationHistory cellId(Long cellId) {
        this.cellId = cellId;
        return this;
    }

    public void setCellId(Long cellId) {
        this.cellId = cellId;
    }

    public String getUserId() {
        return userId;
    }

    public UserLocationHistory userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMobileId() {
        return mobileId;
    }

    public UserLocationHistory mobileId(String mobileId) {
        this.mobileId = mobileId;
        return this;
    }

    public void setMobileId(String mobileId) {
        this.mobileId = mobileId;
    }

    public Instant getCreated() {
        return created;
    }

    public UserLocationHistory created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Double getLatitude() {
        return latitude;
    }

    public UserLocationHistory latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public UserLocationHistory longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserLocationHistory userLocationHistory = (UserLocationHistory) o;
        if (userLocationHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userLocationHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserLocationHistory{" +
                "id=" + getId() +
                ", cellId='" + getCellId() + "'" +
                ", userId='" + getUserId() + "'" +
                ", mobileId='" + getMobileId() + "'" +
                ", created='" + getCreated() + "'" +
                ", latitude='" + getLatitude() + "'" +
                ", longitude='" + getLongitude() + "'" +
                "}";
    }

}
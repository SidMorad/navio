package com.rahpey.traffic.domain.model.car;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.google.common.geometry.S2CellId;
import com.rahpey.traffic.web.rest.tracking.CarSpeedCommand;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A CarSpeed.
 */
@Entity
@Table(name = "car_speed")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CarSpeed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "speed", nullable = false)
    private Float speed;

    @NotNull
    @Column(name = "cell_id", nullable = false)
    private Long cellId;

    @NotNull
    @Column(name = "created", nullable = false)
    private Instant created;

    @Column(name = "heading")
    private Float heading;

    public CarSpeed() {
    }

    public CarSpeed(S2CellId s2CellId, CarSpeedCommand command) {
        this.cellId = s2CellId.id();
        this.speed = command.speed();
        this.heading = command.heading();
        this.created = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getSpeed() {
        return speed;
    }

    public CarSpeed speed(Float speed) {
        this.speed = speed;
        return this;
    }

    public void setSpeed(Float speed) {
        this.speed = speed;
    }

    public Long getCellId() {
        return cellId;
    }

    public CarSpeed cellId(Long cellId) {
        this.cellId = cellId;
        return this;
    }

    public void setCellId(Long cellId) {
        this.cellId = cellId;
    }

    public Instant getCreated() {
        return created;
    }

    public CarSpeed created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Float getHeading() {
        return heading;
    }

    public CarSpeed heading(Float heading) {
        this.heading = heading;
        return this;
    }

    public void setHeading(Float heading) {
        this.heading = heading;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CarSpeed carSpeed = (CarSpeed) o;
        if (carSpeed.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carSpeed.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarSpeed{" +
            "id=" + getId() +
            ", speed='" + getSpeed() + "'" +
            ", cellId='" + getCellId() + "'" +
            ", created='" + getCreated() + "'" +
            ", heading='" + getHeading() + "'" +
            "}";
    }
}

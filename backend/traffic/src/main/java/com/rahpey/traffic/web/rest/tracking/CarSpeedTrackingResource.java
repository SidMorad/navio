package com.rahpey.traffic.web.rest.tracking;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.google.common.geometry.S2CellId;
import com.google.common.geometry.S2LatLng;
import com.rahpey.traffic.domain.model.car.CarSpeed;
import com.rahpey.traffic.repository.CarSpeedRepository;

/**
 * An end-point(/traffic/v1/carspeed) for tracking speed of cars.
 *
 */
@RestController
@RequestMapping("/v1/carspeed")
public class CarSpeedTrackingResource {

	public final CarSpeedRepository carSpeedRepository;

	public CarSpeedTrackingResource(CarSpeedRepository carSpeedRepository) {
		this.carSpeedRepository = carSpeedRepository;
	}

	@PostMapping("/record")
	@Timed
	public ResponseEntity<?> record(@Valid @RequestBody CarSpeedCommand command) {
		logger.debug("Car speed event received: {}", command.toString());
		S2CellId id = S2CellId.fromLatLng(S2LatLng.fromDegrees(command.lat(), command.lng()));
		if (command.speed() != null) {
			logger.info("Recording car speed [{}] at location id [{}] heading [{}]", command.speed(), Long.toString(id.id(), 16), command.heading());
			carSpeedRepository.save(new CarSpeed(id, command));
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}
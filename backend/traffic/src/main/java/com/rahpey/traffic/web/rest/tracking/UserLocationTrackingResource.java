package com.rahpey.traffic.web.rest.tracking;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.google.common.geometry.S2CellUnion;
import com.google.common.geometry.S2LatLng;
import com.google.common.geometry.S2LatLngRect;
import com.google.common.geometry.S2RegionCoverer;
import com.rahpey.traffic.domain.model.userlocation.RecentOnlineUsersJpaSpecification;
import com.rahpey.traffic.domain.model.userlocation.UserLocationHistory;
import com.rahpey.traffic.repository.UserLocationHistoryRepository;

/**
 * An end-point(/traffic/v1/usertrack) for tracking location of online users.
 *
 */
@RestController
@RequestMapping("/v1/usertrack")
public class UserLocationTrackingResource {

    public final UserLocationHistoryRepository userLocationHistoryRepository;

    public UserLocationTrackingResource(UserLocationHistoryRepository userLocationHistoryRepository) {
        this.userLocationHistoryRepository = userLocationHistoryRepository;
    }

    @PostMapping("/save")
    @Timed
    public ResponseEntity<?> save(@Valid @RequestBody UserLocationCommand command, Principal principal) {
        logger.debug("User location event received: {}", command.toString());
        userLocationHistoryRepository.save(new UserLocationHistory(command, principal));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/query/{southWest}/{northEast}")
    @Timed
    public ResponseEntity<List<UserLocationDTO>> queryRecentRecords(
            @PathVariable("southWest") String southWest,
            @PathVariable("northEast") String northEast) {
        if (southWest == null || !southWest.contains(",") || northEast == null || !northEast.contains(",")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        S2LatLngRect rectangle = new S2LatLngRect(S2LatLng.fromDegrees(lat(southWest), lng(southWest)),
                S2LatLng.fromDegrees(lat(northEast), lng(northEast)));
        logger.info("Querying recent online users, area: {}", rectangle.area());
        S2RegionCoverer rc = new S2RegionCoverer();
        rc.setMaxLevel(30);
        rc.setMaxCells(5);
        S2CellUnion covering = rc.getCovering(rectangle);
        List<UserLocationHistory> res = userLocationHistoryRepository
                .findAll(new RecentOnlineUsersJpaSpecification(covering));
        if (res == null || res.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().cacheControl(CacheControl.maxAge(5, TimeUnit.SECONDS))
                .body(res.stream().map(ul -> new UserLocationDTO(ul)).collect(Collectors.toList()));
    }

    private Double lat(String latLng) {
        return Double.valueOf(latLng.split(",")[0]);
    }

    private Double lng(String latLng) {
        return Double.valueOf(latLng.split(",")[1]);
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

}
package com.rahpey.traffic.repository;

import org.springframework.stereotype.Repository;

import com.rahpey.traffic.domain.model.car.CarSpeed;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CarSpeed entity.
 */
@Repository
public interface CarSpeedRepository extends JpaRepository<CarSpeed,Long> {
    
}
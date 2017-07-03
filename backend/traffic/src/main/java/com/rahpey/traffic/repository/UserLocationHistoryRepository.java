package com.rahpey.traffic.repository;

import org.springframework.stereotype.Repository;

import com.rahpey.traffic.domain.model.userlocation.UserLocationHistory;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the UserLocationHistory entity.
 */
@Repository
public interface UserLocationHistoryRepository
        extends JpaRepository<UserLocationHistory, Long>, JpaSpecificationExecutor<UserLocationHistory> {

}
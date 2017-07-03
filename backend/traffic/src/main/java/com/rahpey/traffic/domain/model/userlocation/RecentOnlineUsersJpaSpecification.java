package com.rahpey.traffic.domain.model.userlocation;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.google.common.geometry.S2CellId;
import com.google.common.geometry.S2CellUnion;

public class RecentOnlineUsersJpaSpecification implements Specification<UserLocationHistory> {

    private final S2CellUnion covering;

    public RecentOnlineUsersJpaSpecification(S2CellUnion covering) {
        this.covering = covering;
    }

    @Override
    public Predicate toPredicate(Root<UserLocationHistory> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<Predicate>();
        for (S2CellId cellId : covering.cellIds()) {
            predicates.add(cb.between(root.get("cellId"), cellId.rangeMin().id(), cellId.rangeMax().id()));
        }
        Predicate betweenTheseCellIds = cb.or(predicates.toArray(new Predicate[] {}));
        Predicate lessThanAMinute = cb.greaterThan(root.get("created"), Instant.now().minusSeconds(60));
        return cb.and(lessThanAMinute, betweenTheseCellIds);
    }

}
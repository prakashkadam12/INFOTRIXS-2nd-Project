package com.infotrixs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotrixs.entities.Reservation;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

}

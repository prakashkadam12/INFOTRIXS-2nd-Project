package com.infotrixs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotrixs.entities.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

}

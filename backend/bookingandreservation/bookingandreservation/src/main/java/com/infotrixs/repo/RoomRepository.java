package com.infotrixs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotrixs.entities.Room;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findAllByHotelId(int hotelId);

}

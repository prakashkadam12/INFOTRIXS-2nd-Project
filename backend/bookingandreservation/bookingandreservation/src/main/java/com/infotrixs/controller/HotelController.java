package com.infotrixs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infotrixs.entities.Admin;
import com.infotrixs.entities.Hotel;
import com.infotrixs.entities.Reservation;
import com.infotrixs.entities.Room;
import com.infotrixs.repo.AdminRepo;
import com.infotrixs.repo.HotelRepository;
import com.infotrixs.repo.ReservationRepo;
import com.infotrixs.repo.RoomRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepo;

    @GetMapping("/gethotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {

        List<Hotel> hotelList = new ArrayList<>();

        hotelRepo.findAll().forEach(hotelList::add);

        if (hotelList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(hotelList, HttpStatus.OK);

    }

    @GetMapping("gethotel/{id}")
    public ResponseEntity<Hotel> getHotelbyId(@PathVariable int id) {
        Optional<Hotel> hotel = hotelRepo.findById(id);
        if (hotel.isPresent()) {
            return new ResponseEntity<Hotel>(hotel.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/addhotel")
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel newhotel = hotelRepo.save(hotel);
        return new ResponseEntity<>(newhotel, HttpStatus.OK);

    }

    @DeleteMapping("/deletehotel/{hotelid}")
    public ResponseEntity<HttpStatus> deleteHotel(@PathVariable int hotelid) {
        hotelRepo.deleteById(hotelid);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/updatehotel/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable int hotelId, @RequestBody Hotel updatedHotel) {
        Optional<Hotel> optionalHotel = hotelRepo.findById(hotelId);
        if (optionalHotel.isPresent()) {
            Hotel existingHotel = optionalHotel.get();
            existingHotel.setName(updatedHotel.getName());
            existingHotel.setAddress(updatedHotel.getAddress());
            existingHotel.setCity(updatedHotel.getCity());
            existingHotel.setCountry(updatedHotel.getCountry());
            existingHotel.setPhone(updatedHotel.getPhone());
            existingHotel.setEmail(updatedHotel.getEmail());
            existingHotel.setWebsite(updatedHotel.getWebsite());

            Hotel updatedHotelObj = hotelRepo.save(existingHotel);
            return new ResponseEntity<>(updatedHotelObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/hotel/{hotelid}/getRooms")
    public ResponseEntity<List<Room>> getRooms(@PathVariable("hotelid") int hotelId) {
        Optional<Hotel> hotel = hotelRepo.findById(hotelId);
        if (hotel.isPresent()) {
            List<Room> rooms = roomRepository.findAllByHotelId(hotelId);
            return ResponseEntity.ok(rooms);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/hotel/{hotelid}/getRoom/{roomid}")
    public ResponseEntity<Room> getRoom(@PathVariable("hotelid") int hotelId, @PathVariable("roomid") int roomId) {
        Optional<Hotel> hotel = hotelRepo.findById(hotelId);
        if (hotel.isPresent()) {
            Hotel foundHotel = hotel.get();
            List<Room> rooms = foundHotel.getRooms();
            Optional<Room> room = rooms.stream().filter(r -> r.getId() == roomId).findFirst();
            if (room.isPresent()) {
                return ResponseEntity.ok(room.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/hotel/{hotelid}/addroom")
    public ResponseEntity<Room> addRoomToHotel(@PathVariable("hotelid") int hotelid, @RequestBody Room room) {
        Optional<Hotel> hotel = hotelRepo.findById(hotelid);
        if (hotel.isPresent()) {
            room.setHotel(hotel.get()); // Set the hotel for the room
            Room roomdata = roomRepository.save(room);
            return new ResponseEntity<>(roomdata, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("hotel/{hotelid}/deleteroom/{roomid}")
    public ResponseEntity<HttpStatus> deleteRoom(@PathVariable("hotelid") int hotelid,
            @PathVariable("roomid") int roomid) {
        Optional<Room> optionalRoom = roomRepository.findById(roomid);

        if (optionalRoom.isPresent()) {
            Room roomToDelete = optionalRoom.get();

            // Check if the provided hotelid matches the hotelId of the associated room
            if (roomToDelete.getHotel().getId() == hotelid) {
                // Delete the room from the database
                roomRepository.deleteById(roomid);

                // Return success response
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                // If the hotelid doesn't match, return not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            // If the room doesn't exist, return not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/hotel/{hotelid}/updateroom/{roomid}")
    public ResponseEntity<Room> updateRoom(@PathVariable("hotelid") int hotelId,
            @PathVariable("roomid") int roomId,
            @RequestBody Room updatedRoom) {
        Optional<Hotel> hotel = hotelRepo.findById(hotelId);
        if (hotel.isPresent()) {
            Hotel foundHotel = hotel.get();
            List<Room> rooms = foundHotel.getRooms();
            Optional<Room> roomToUpdate = rooms.stream().filter(r -> r.getId() == roomId).findFirst();
            if (roomToUpdate.isPresent()) {
                Room existingRoom = roomToUpdate.get();

                // Check if the provided hotelId matches the hotelId of the associated room
                if (existingRoom.getHotel().getId() == hotelId) {
                    // Update the room with the new data
                    existingRoom.setType(updatedRoom.getType());
                    existingRoom.setPrice(updatedRoom.getPrice());
                    existingRoom.setCapacity(updatedRoom.getCapacity());

                    Room updatedRoomData = roomRepository.save(existingRoom);

                    return ResponseEntity.ok(updatedRoomData);
                } else {
                    // If the hotelId doesn't match, return not found
                    return ResponseEntity.notFound().build();
                }
            } else {
                // If the room with the given roomId is not found, return not found
                return ResponseEntity.notFound().build();
            }
        } else {
            // If the hotel with the given hotelId is not found, return not found
            return ResponseEntity.notFound().build();
        }
    }

    @Autowired
    private ReservationRepo reservationRepo;

    @GetMapping("/reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservationList = new ArrayList<>();
        reservationRepo.findAll().forEach(reservationList::add);

        if (reservationList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservationList, HttpStatus.OK);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable int id) {
        Optional<Reservation> reservation = reservationRepo.findById(id);
        if (reservation.isPresent()) {
            return new ResponseEntity<>(reservation.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
        Reservation newReservation = reservationRepo.save(reservation);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable int id,
            @RequestBody Reservation updatedReservation) {
        Optional<Reservation> optionalReservation = reservationRepo.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            // Update the reservation with the new data
            existingReservation.setCheckInDate(updatedReservation.getCheckInDate());
            existingReservation.setCheckOutDate(updatedReservation.getCheckOutDate());
            existingReservation.setGuestName(updatedReservation.getGuestName());
            existingReservation.setHotelId(updatedReservation.getHotelId());
            existingReservation.setTotalPrice(updatedReservation.getTotalPrice());
            existingReservation.setStatus(updatedReservation.getStatus());
            Reservation updatedReservationObj = reservationRepo.save(existingReservation);
            return new ResponseEntity<>(updatedReservationObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<HttpStatus> deleteReservation(@PathVariable int id) {
        Optional<Reservation> optionalReservation = reservationRepo.findById(id);
        if (optionalReservation.isPresent()) {
            reservationRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Admin REST API

    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/registration")
    public ResponseEntity<Admin> makeRegistration(@RequestBody Admin admin) {
        Admin newAdmin = adminRepo.save(admin);
        return new ResponseEntity<Admin>(newAdmin, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> makeLogin(@RequestBody Admin admin) {
        Admin storedAdmin = adminRepo.findByUsername(admin.getUsername());

        if (storedAdmin == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String storedPassword = storedAdmin.getPassword();
        String providedPassword = admin.getPassword();

        if (storedPassword.equals(providedPassword)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
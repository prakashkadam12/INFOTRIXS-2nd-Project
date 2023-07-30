package com.infotrixs.entities;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String type;
    private int capacity;
    private double price;

    @ManyToOne
    @JsonBackReference
    private Hotel hotel;

    // No-arg constructor
    public Room() {
    }

    // All-arg constructor
    public Room(int id, String type, int capacity, double price, Hotel hotel) {
        this.id = id;

        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.hotel = hotel;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    // toString() method
    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", capacity=" + capacity +
                ", price=" + price +
                ", hotel=" + hotel +
                '}';
    }
}

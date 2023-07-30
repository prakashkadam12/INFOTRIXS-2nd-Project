import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hotels.css';
import BookingService from '../service/BookingService';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        BookingService.getAllHotels()
            .then((response) => {
                setHotels(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleBookClick = (hotelId) => {
        BookingService.getAllRooms(hotelId)
          .then((response) => {
            console.log(response.data)
            navigate(`/getRooms/${hotelId}`);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="col-md-4 mb-4">
                        <div className="card border-info h-100">
                            <div className="card-body">
                                <p className="card-text">
                                    <i className="fas fa-hotel"></i>
                                    <span>{hotel.name}</span>
                                </p>
                                <p className="card-text">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                                </p>
                                <p className="card-text">
                                    <i className="fas fa-phone"></i>
                                    <span>{hotel.phone}</span>
                                </p>
                                <p className="card-text">
                                    <i className="fas fa-envelope"></i>
                                    <span>{hotel.email}</span>
                                </p>
                                <p className="card-text">
                                    <i className="fas fa-globe"></i>
                                    <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                                        {hotel.website}
                                    </a>
                                </p>
                                <button className='btn btn-primary' onClick={() => handleBookClick(hotel.id)}>Book</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;

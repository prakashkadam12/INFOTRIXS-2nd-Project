import React, { useState, useEffect } from 'react';
import BookingService from '../service/BookingService';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you have installed Axios
import './Reservation.css';

const Reservation = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [hotelName, setHotelName] = useState(''); // State to store the fetched hotel name
  const [roomName, setRoomName] = useState(''); // State to store the fetched room name

  const { roomId: urlRoomId, hotelId: urlHotelId } = useParams(); // Access roomId and hotelId from URL params
  const navigate = useNavigate(); // This hook allows us to navigate programmatically

  useEffect(() => {
    // Set the default roomId and hotelId from URL params when the component mounts
    setRoomId(urlRoomId);
    setHotelId(urlHotelId);

    // Fetch hotel and room details using the provided APIs
    axios
      .get(`http://localhost:8080/api/gethotel/${urlHotelId}`)
      .then((response) => {
        setHotelName(response.data.name);
        console.log(response.data.name)
      })
      .catch((error) => {
        console.log('Error fetching hotel details:', error);
      });

    axios
      .get(`http://localhost:8080/api/hotel/${urlHotelId}/getRoom/${urlRoomId}`)
      .then((response) => {
        setRoomName(response.data.type);
        console.log(response.data.name)
      })
      .catch((error) => {
        console.log('Error fetching room details:', error);
      });
  }, [urlRoomId, urlHotelId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the reservation object
    const reservationData = {
      checkInDate,
      checkOutDate,
      guestName,
      hotelId,
      roomId,
      totalPrice,
      status,
    };

    // Call the API to save the reservation data to the database
    BookingService.setReservation(reservationData)
      .then((response) => {
        console.log("This is", reservationData);
        console.log(response.data);

        // Notify that the form is submitted (you can implement your notification logic here)
        alert('Form submitted successfully!');

        // After successful form submission, navigate to a new page (if needed)
        navigate('/hotels'); // Replace '/hotels' with the desired path
      })
      .catch((error) => {
        console.log('Error occurred:', error.message);
      });
  };

  return (
    <div className="container mt-4">
    <h1 className="reservation-heading">Booking Summary</h1>
    <div className="border rounded p-4 custom-form">
    
      <h3 className="text-info"> <i className="fas fa-hotel mr-2"></i> {hotelName}</h3>
      <h3 className="text-primary"><i className="fas fa-bed mr-2"></i> {roomName}</h3>
      <form onSubmit={handleSubmit}>
        {/* ... (existing code) */}
        <div className="form-group">
          <label htmlFor="check_in_date">
            <i className="fas fa-calendar-check"></i> Check-in Date
          </label>
          <input
            type="date"
            className="form-control"
            id="check_in_date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="check_out_date">
            <i className="fas fa-calendar-times"></i> Check-out Date
          </label>
          <input
            type="date"
            className="form-control"
            id="check_out_date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_price">
            <i className="fas fa-dollar-sign"></i> Price
          </label>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              min={499}
              id="total_price"
              placeholder="Enter the price ₹"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="status">
            <i className="fas fa-info-circle"></i> Status
          </label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>

  );
};

export default Reservation;

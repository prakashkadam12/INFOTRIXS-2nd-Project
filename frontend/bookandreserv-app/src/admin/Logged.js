import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../service/BookingService';
import './Logged.css'; // Import the CSS file for custom styling

const Logged = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BookingService.getReservations()
      .then((response) => {
        setReservations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Sort reservations in chronological order by checkInDate
  const sortedReservations = reservations.sort((a, b) => {
    return new Date(a.checkInDate) - new Date(b.checkInDate);
  });

  return (
    <div className="container mt-4">
      <h1>Reservations</h1>
      <table className="table table-striped table-bordered custom-table">
        <thead>
          <tr>
            <th>Hotel ID</th>
            <th>Room ID</th>
            <th>Guest Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.map((reservation) => (
            <tr key={reservation.roomId}>
              <td>{reservation.hotelId}</td>
              <td>{reservation.roomId}</td>
              <td>{reservation.guestName}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>{reservation.status}</td>
              <td>{reservation.totalPrice}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      // Handle update action here, e.g., navigate to update page
                      navigate(`/updateReservation/${reservation.roomId}`);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      // Handle delete action here
                      // You can use the reservation.roomId to identify the reservation to delete
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logged;

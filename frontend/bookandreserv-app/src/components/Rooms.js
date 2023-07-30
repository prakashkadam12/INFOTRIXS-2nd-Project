import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingService from '../service/BookingService';
import './Rooms.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { hotelId } = useParams(); // Get the hotelId from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    BookingService.getAllRooms(hotelId)
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hotelId]);

  const handleRoomClick = (roomId) => {
    navigate(`setReservation/${roomId}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {rooms.map((room) => (
          <div key={room.id} className="col-md-4 mb-4">
            <div className="card custom-card">
              <div className="card-body">
                <h3 className="card-title">
                  <i className="fas fa-bed"></i>
                  {room.type}
                </h3>
                <p className="card-text">
                  <i className="fas fa-users"></i>
                  Capacity: {room.capacity}
                </p>
                <p className="card-text">
                  <i className="fas fa-dollar-sign"></i>
                  Price: ${room.price}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => handleRoomClick(room.id)}>Select Room</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;

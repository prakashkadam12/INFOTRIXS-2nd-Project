import axios from 'axios';

const HOTEL_GET_ALL = 'http://localhost:8080/api/gethotels';
const HOTEL_GET_ROOMS = 'http://localhost:8080/api/hotel/';
const SET_RESERVATION="http://localhost:8080/api/reservations"
const ADMIN_GET_RESERVATIONS='http://localhost:8080/api/reservations'
const ADMIN_REGISTRATION = 'http://localhost:8080/api/registration';
const ADMIN_LOGIN = 'http://localhost:8080/api/login';

class BookingService {
  getAllHotels() {
    return axios.get(HOTEL_GET_ALL);
  }

  getAllRooms(hotelId) { // Correct the parameter name to hotelId
    return axios.get(`${HOTEL_GET_ROOMS}${hotelId}/getRooms`); // Use template literals to construct the URL
  }


  setReservation(reservationData) {
    return axios.post(SET_RESERVATION, reservationData);
  }

  getReservations()
  {
    return axios.get(ADMIN_GET_RESERVATIONS);
  }

  makeRegistration(formData)
  {
    return axios.post(ADMIN_REGISTRATION,formData);
  }

  getLogin(loginData)
  {
    return axios.post(ADMIN_LOGIN,loginData);
  }


}

export default new BookingService();

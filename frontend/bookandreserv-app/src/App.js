import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hotels from './components/Hotels';
import Rooms from './components/Rooms';
import Reservation from './components/Reservation';
import Header from './Header';
import Footer from './Footer';
import Logged from './admin/Logged';
import RegistrationForm from './admin/RegistrationForm';
import LoginForm from './admin/LoginForm';

function App() {
   
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/getRooms/:hotelId" element={<Rooms />} />
        <Route exact path="getRooms/:hotelId/setReservation/:roomId" element={<Reservation />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/loggedIn" element={<Logged />} />
      </Routes>
    </Router>
    
    <Footer/>
  
    </>
  );
}

export default App;

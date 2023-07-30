import React, { useState } from "react";
import axios from "axios";
import BookingService from "../service/BookingService";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registrationSuccessful) {
      try {
        const response = await BookingService.makeRegistration(formData);
        console.log(response.data);
        setRegistrationSuccessful(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-5 border rounded p-4">
      <h3 className="mb-4">
        <i className="bi bi-person-plus"></i> Admin Registration
      </h3>
      {registrationSuccessful ? (
        <div className="alert alert-success" role="alert">
          Successfully registered!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={registrationSuccessful}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;

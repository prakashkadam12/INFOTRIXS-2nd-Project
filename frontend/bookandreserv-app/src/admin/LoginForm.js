import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BookingService from "../service/BookingService";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate= useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    BookingService.getLogin(loginData).then((response)=>{
        if(response.status== 200)
        {
            navigate('/loggedIn');
        }
        else
        {
            setInvalidCredentials(true);
        }

    }).catch((error)=>{
        console.log(error)
        setInvalidCredentials(true);
    })
  };

  return (
    <div className="container mt-5 border rounded p-4">
      <h3 className="text-center">
      
        Admin Login   <i className="fas fa-hotel"></i>
      </h3>
      
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label"> Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={loginData.username}
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
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
        {invalidCredentials && (
        <div className="alert alert-danger mt-3" role="alert">
          Invalid credentials. Please try again.
        </div>
      )}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

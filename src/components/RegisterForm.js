import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://shopping-django-1.onrender.com/register/', formData)
      .then((response) => {
        console.log(response);
        alert('Success')
        // TODO: redirect to a success page
      })
      .catch((error) => {
        console.log(error.response);
        alert('Failed')
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

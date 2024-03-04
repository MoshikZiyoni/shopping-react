import React, { useEffect } from 'react';
import axios from 'axios';

const API_15_minutes = () => {
  useEffect(() => {
    // Function to send API call
    const sendAPICall = async () => {
      try {
        await axios.get('https://shopping-django-1.onrender.com/product/api/');
        console.log('API call sent successfully.');
      } catch (error) {
        console.error('Error while sending API call:', error);
      }
    };

    // Execute the API call immediately
    sendAPICall();

    // Execute the API call every 15 minutes
    // const interval = setInterval(sendAPICall, 15 * 60 * 1000);
    const interval = setInterval(sendAPICall, 60 * 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return <div></div>; // Placeholder div, you can replace it with your desired content
};

export default API_15_minutes;
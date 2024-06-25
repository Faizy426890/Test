// Form.jsx
import React, { useState, useEffect } from 'react';

const Form = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('http://localhost:3000/companies'); // Adjust URL as per your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch forms');
        }
        const formsData = await response.json();
        setForms(formsData);
      } catch (error) {
        console.error('Error fetching forms:', error);
        // Handle error state or display an error message to the user
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h2>Forms</h2>
      <ul>
        {forms.map(form => (
          <li key={form._id}>
            <p>Name: {form.name}</p> 
            <p>Langauge: {form.language}</p>
            <p>salary: {form.salary}</p>
            <p>city: {form.city}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./form.css";
const AddCompany = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [addedForms, setAddedForms] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to add company');
      }

      alert('Company added successfully!');
      reset(); // Reset form fields after successful submission

      // Fetch and update added forms after successful submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add company');
    }
  };

  const fetchAddedForms = async () => {
    try {
      const response = await fetch('http://localhost:3000/companies'); // Assuming this endpoint fetches all companies/forms
      if (!response.ok) {
        throw new Error('Failed to fetch added forms');
      }
      const formsData = await response.json();
      setAddedForms(formsData);
    } catch (error) {
      console.error('Error fetching added forms:', error);
      // Handle error state or display an error message to the user
    }
  };

  const eventhandle = () => {
    fetchAddedForms();
  };
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/companies/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete company');
      }
       
      alert('Company deleted successfully!'); 
      fetchAddedForms();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete company');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>} <br />
        <input type="text" placeholder="Salary" {...register('salary', { required: true })} /> 
        {errors.salary && <span>Salary is required</span>} <br />
        <input type="text" placeholder="Language" {...register('language', { required: true })} /> 
        {errors.language && <span>Language is required</span>} <br />
        <input type="text" placeholder="City" {...register('city', { required: true })} /> 
        {errors.city && <span>City is required</span>} <br />
        <input type="text" placeholder="Is Manager (true/false)" {...register('isManager', { required: true })} /> <br />
        {errors.isManager && <span>Is Manager is required</span>} <br />
        <br />
        <button type="submit">Add Data</button>
      </form>

      <button onClick={eventhandle}>See Added Forms</button>

      {addedForms.length > 0 && (
        <div>
          <h2>Added Forms</h2>
          <ul className='list'>
            {addedForms.map(form => (
              <li key={form._id}>  
              <div className='form'>
                <p>Name: {form.name}</p>
                <p>Salary: {form.salary}</p>
                <p>Language: {form.language}</p>
                <p>City: {form.city}</p>
                <p>Is Manager: {form.isManager ? 'Yes' : 'No'}</p>  
                </div> 
                <button onClick={() => onDelete(form._id)}> Delete this Form </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCompany;

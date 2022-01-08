import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import from '../style.css';

function signUp() {
  
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNum: '',
  })

  const handleOnChange = e => {
    setState({...state, [e.target.name]: e.target.value})
    console.log(state)
  }

  const handleSubmit = e => {
      e.preventDefault();

      console.log('submitted')

      axios.post('/api/signup', {
        email: state.email,
        password: state.password,
        first_name: state.firstName,
        last_name: state.lastName,
        address: state.address,
        phone_number: state.phoneNum
      })
      .then(function (response) {
        console.log(response);
        window.location.href = '/login';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 

  return (
    <div className='signup'>
      <h2>Sign Up</h2>

      <form id='signup-form'>
        <label >
          Email:
        <input
        className="form-control login-input"
          type='text'
          name='email'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Password:
        <input
        className="form-control login-input"
          type='password'
          name='password'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          First name: 
        <input
        className="form-control login-input"
          type='text'
          name='firstName'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Last name:
        <input
        className="form-control login-input"
          type='text'
          name='lastName'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Access code:
        <input
        className="form-control login-input"
          type='text'
          name='accessCode'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Address:
        <input
        className="form-control login-input"
          type='text'
          name='address'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Phone number:
        <input
        className="form-control login-input"
          type='text'
          name='phoneNum'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <button className='btn btn-primary' type='submit' onClick={handleSubmit}>Submit
        </button>
      </form>
    </div>
  );
}

export default signUp;
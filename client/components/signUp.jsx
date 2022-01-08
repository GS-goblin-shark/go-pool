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
    //console.log(state)
  }

  const handleSubmit = e => {
      e.preventDefault();

      //console.log('submitted')

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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
 

  return (
    <div className='signup'>
      <h2>Sign Up</h2>

      <form>
        <label>
          Email:
        <input
          type='text'
          placeholder='Email'
          name='email'
          onChange={handleOnChange}
          required>
        </input>
        </label>
        <label>
          Password:
        <input
          type='password'
          name='password'
          onChange={handleOnChange}
          placeholder='Password'
          required>
        </input>
        </label>
        <label>
          First name: 
        <input
          type='text'
          name='firstName'
          onChange={handleOnChange}
          placeholder='First name'
          required>
        </input>
        </label>
        <label>
          Last name:
        <input
          type='text'
          name='lastName'
          onChange={handleOnChange}
          placeholder='Last name'
          required>
        </input>
        </label>
        <label>
          Access code:
        <input
          type='text'
          name='accessCode'
          onChange={handleOnChange}
          placeholder='Enter access code'
          required>
        </input>
        </label>
        <label>
          Address:
        <input
          type='text'
          name='address'
          onChange={handleOnChange}
          placeholder='Address'
          required>
        </input>
        </label>
        <label>
          Phone number:
        <input
          type='text'
          name='phoneNum'
          onChange={handleOnChange}
          placeholder='Phone number'
          required>
        </input>
        </label>
        <button type='submit' onClick={handleSubmit}>Submit
        </button>
      </form>
    </div>
  );
}

export default signUp;
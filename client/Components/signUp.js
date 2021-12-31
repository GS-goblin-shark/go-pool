import React, { useState, useEffect } from 'react';
//import from '../style.css';

function signUp({ user }) {
  const [newUser, createUser] = useState('');

  // const handleSubmit = e => {
  //     e.preventDefault();
  //     if (!newUser) return;
  //     addUser(newUser);
  //     createUser('');
  // }

  // const addUser = text => {
  //     const addedUsers = [...users, { text }];

  // }

  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='input'
          value={newUser.email}
          onChange={(e) => createUser(e.target.value)}>
          Email:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.password}
          onChange={(e) => createUser(e.target.value)}>
          Password:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.firstName}
          onChange={(e) => createUser(e.target.value)}>
          First name:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.lastName}
          onChange={(e) => createUser(e.target.value)}>
          Last name:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.accessCode}
          onChange={(e) => createUser(e.target.value)}>
          Access code:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.address}
          onChange={(e) => createUser(e.target.value)}>
          Address:{' '}
        </input>
        <input
          type='text'
          className='input'
          value={newUser.phoneNum}
          onChange={(e) => createUser(e.target.value)}>
          Phone number:{' '}
        </input>
      </form>
    </div>
  );
}

export default signUp;

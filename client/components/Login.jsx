import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const onEmailChange = (e) => {
    const newValue = e.target.value;
    setEmailValue(newValue);
  }

  const onPasswordChange = (e) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
  }
  
  const login = ( ) => {
    axios.post('/api/login', { email: emailValue, password: passwordValue})
    .then((res) => {
      console.log(res);
      sessionStorage.setItem('email', emailValue);
      sessionStorage.setItem('loggedIn', res.isMatch);
      window.location.href = '/dashboard';
    })
    .catch(e => {
      console.log(e);
      setHasError(true);
    })
  }

  return (
    <div id='login-page'>
      <div className='form-group' id='login-form'>
        <p>Email</p>
        <input className="form-control login-input" type='text' onChange={onEmailChange}/>
        <p>Password</p>
        <input className="form-control login-input" type='password' onChange={onPasswordChange}/>
      </div>
      <button className="btn btn-primary" id='loginButton' type='submit' onClick={login}>Log In</button>
      {hasError && <p>Invalid Email or Password</p>}
      <p>Don't have an account?  Click <Link id='signUp-link' to={'/signup'}>here</Link> to sign up!</p>
    </div>
  );
}

export default Login;

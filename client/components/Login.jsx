import React, { useState } from 'react';
import axios from 'axios';

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
      console.log(res)
      console.log('Log in Successful!');
      window.location.href = '/';
    })
    .catch(e => {
      console.log(e);
      setHasError(true);
    })
  }

  const clicked = () =>{
    console.log('clicked');
  }

  return (
    <div id='login-page'>
      <div className='form-group' id='login-form'>
        <p>Email</p>
        <input type='text' placeholder='email' onChange={onEmailChange}/>
        <p>Password</p>
        <input type='password' placeholder='password' onChange={onPasswordChange}/>
      </div>
      <button id='loginButton' type='submit' onClick={login}>Log In</button>
      {hasError && <p>Invalid Email or Password</p>}
      <p>Don't have an account?  Click here to sign up!</p>
      {/* <p>Don't have an account?  Click <Link id='signUp-link' to={'/signup'}>here</Link> to sign up!</p> */}
    </div>
  );
}

export default Login;

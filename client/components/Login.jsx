import React from 'react';

function Login() {
  return (
    <div id='login-page'>
      <div className='form-group' id='login-form'>
        <p>Email</p>
        <input type='text' placeholder='email' />
        <p>Password</p>
        <input type='text' placeholder='password' />
      </div>
      <button id='loginButton' type='submit'>Log In</button>
      <p>Don't have an account?  Click here to sign up!</p>
      {/* <p>Don't have an account?  Click <Link id='signUp-link' to={'/signup'}>here</Link> to sign up!</p> */}
    </div>
  );
}

export default Login;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function DirMessage() {

  const [state, setState] = useState({
    sender: '',
    recipient: '',
    message: ''

  })

  // useEffect(() => {
  //   const axios = require('axios');

  //   const res = await axios.get('/api/messages');

  //   console.log(res.data.args);

  //   setState({...state, messages: res.data.args});

  // }) 

  //to_email 
  //from_email

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('/api/message')
        .then(response => 
          setState({...state, 
            sender: response.data.from_email,
            recipient: response.data.to_emai,
          })
          )

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  const handleOnChange = e => {
    setState({...state, [e.target.name]: e.target.value})
    //console.log(state)
  }

  const handleSubmit = e => {
      e.preventDefault();

      //console.log('submitted')

      // axios.post('/api/message', {
      //   sender: state.sender,
      //   recipient: state.recipient,
      //   message: state.message
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  }
  //make a get request with axios to retrieve data that matches the recipient

  //create a form with an input that will store the typed in message 
  
  //send a post request with axios to the DB with the recipient matched



  return (
    <div>
      <h1>This is a dm thread</h1>
      <form>
        <label>
          Recipient:
        <input
          type='text'
          name='recipient'
          required>{state.recipient}
        </input>
        </label>
        <label>
          Message: 
        <input
          type='text'
          name='message'
          onChange={handleOnChange}
          placeholder='Enter message here'
          required>
        </input>
        </label>
        <button type='submit' onClick={handleSubmit}>Send
        </button>
      </form>
    </div>
  );
}

export default DirMessage;
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

//a display of all the DMs with different users, each box is a button that redirects 
//to DirectMessages.jsx, which only displays the DM's with that user

function Messages() {

  const [state, setState] = useState({
    sender: '',
    recipient: '',
    messages: []
  })

  // "_id" serial NOT NULL,
  // "from_user_id" bigint NOT NULL,
  // "to_user_id" bigint NOT NULL,
  // "date" TIMESTAMP NOT NULL,
  // "message" varchar NOT NULL,

//   useEffect(() => {
//     // GET request using axios inside useEffect React hook
//     axios.get('/api/message')
//         .then(response => 
          
//           console.log(response.data);

//           setState({...state,
//           sender: response.data.from_user_id,
//           recipient: response.data.to_user_id,
          
//           })
//           )
        
// }, []);





  // const handleOnClick = e => {
    
  // }


  //make a get request with axios to the DB
  //display each DM as a button with onClick that will redirect to DirectMessages.jsx


  return (
    <div>
      <h1>This is the messages page</h1>

    </div>
  );
}

export default Messages;
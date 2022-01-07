import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

//a display of all the DMs with different users, each box is a button that redirects 
//to DirectMessages.jsx, which only displays the DM's with that user

function Messages() {

  const [state, setState] = useState({
    sender: '',
    currentRecipient: undefined,
    recipients: [],
    messages: []
  })

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('/api/db/message')
        .then(response => 
          
          console.log(response.data),

          response.data.forEach(obj => {
            if (!state.recipients.includes(obj.to_user_id)) {
              let updatedRecipients = [];
              updatedRecipients.push(obj.to_user_id);
              setState({...state, sender: obj.from_user_id, recipients: updatedRecipients})
            }
          })
        )
        
}, []);

const openDM = (recipient)=>  {
  setState({...state, currentRecipient: recipient})
  showDMs();
}

//before rendering each message, it must be formatted as a button with an onClick function
//that will render all the DMs user has exchanged with the recipient

const dmButtons = [];
state.recipients.forEach(recipient => {
 dmButtons.push(<Button onClick={openDM(recipient)}>{recipient}</Button>)
})

  // "_id" serial NOT NULL,
  // "from_user_id" bigint NOT NULL,
  // "to_user_id" bigint NOT NULL,
  // "date" TIMESTAMP NOT NULL,
  // "message" varchar NOT NULL,

const showDMs = () => {

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('/api/db/message')
        .then(response => 
          
          console.log(response.data),

          response.data.forEach(obj => {
            if (obj.to_user_id === state.currentRecipient) {
              state.messages.push(obj);
              setState({...state})
            }
          })
        )
        
}, []);

  let dirMessages = [];

  state.messages.forEach(message => {
    dirMessages.push(<div>
      <h4>{message.to_user_id}</h4>
      <p>{message.message}</p>
    </div>)
  })
}


  return (
    <div>
      <h1>This is the messages page</h1>
      <dmButtons />
      {state.currentRecipient !== undefined && <dirMessages />}
    </div>
  );
}

export default Messages;
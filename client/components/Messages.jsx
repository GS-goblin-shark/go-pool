import React, {useState, useEffect} from 'react';
import DirMessage from './DirectMessage';
import axios from 'axios';
//import { response } from 'express';
//import Modal from 'react-modal';

//a display of all the DMs with different users, each box is a button that redirects 
//to DirectMessages.jsx, which only displays the DM's with that user

function Messages({user}) {

  const [state, setState] = useState({
    user: user,
    openDM: false,
    recipients: [],
    messages: []
  })

  const openDM = (email) =>  {
    console.log(`you opened the DM thread with ${email}`)
    setState({...state, openDM: true});
  
  }

  useEffect(() => {
    //GET request using axios inside useEffect React hook
    //[{first_name, last_name, email}]
    axios.get(`/db/message/users/?email=e@e`)
        .then(response => {
          //const res = response.json();
          console.log(response.data)
          setState({...state, recipients: response.data.users})
         
        })
        .catch(err => {
          // Handle Error Here
          console.error(err);
      });
              
}, []);

const dmButtons = state.recipients.map((recipient) => {
    return (
      <button email={recipient.email} id={recipient.id} onClick={openDM(recipient.email)}>{recipient.first_name} {recipient.last_name}</button>
    )
  })

const onClick = () => {
  console.log(state.recipients)
}



//before rendering each message, it must be formatted as a button with an onClick function
//that will render all the DMs user has exchanged with the recipient



  return (
    <div>
      <h1>This is the messages page</h1>
      {dmButtons}
      {state.openDM && <DirMessage state={state.recipients}/>}
      <button onClick={onClick}>Click</button>
    </div>
  );
}

export default Messages;
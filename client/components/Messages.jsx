import React, {useState, useEffect} from 'react';
import DirectMessage from 'DirectMessage';
import axios from 'axios';
//import Modal from 'react-modal';

//a display of all the DMs with different users, each box is a button that redirects 
//to DirectMessages.jsx, which only displays the DM's with that user

function Messages({user}) {

  const [state, setState] = useState({
    user: user,
    currentRecipient: undefined,
    recipients: [],
    messages: []
  })

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    //[{first_name, last_name, email}]
    axios.get(`/db/message/users/?email=email@email.com`)
        .then(response => 
          
          console.log(response.data),

          setState({...state, recipients: response.data}) 
        )
        
}, []);

const openDM = (recipient)=>  {
  setState({...state, currentRecipient: recipient});
}

//before rendering each message, it must be formatted as a button with an onClick function
//that will render all the DMs user has exchanged with the recipient

const dmButtons = [];
state.recipients.forEach(recipient => {
 dmButtons.push(<Button email={recipient.email} onClick={openDM(recipient)}>{recipient.first_name} {recipient.last_name}</Button>)
})



  return (
    <div>
      <h1>This is the messages page</h1>
      <dmButtons />
      {state.currentRecipient !== undefined && <DirectMessage user={state.user}/>}
    </div>
  );
}

export default Messages;
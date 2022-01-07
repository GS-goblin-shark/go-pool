import React, {useState, useEffect} from 'react';
import axios from 'axios';


function DirMessage(user) {


  const [state, setState] = useState({
    sender: user,
    recipient: '',
    messages: []
  })


  useEffect(() => {
      // GET request using axios inside useEffect React hook
      
      axios.get(`/db/message/?to_email=e@e&from_email=w@w.com`)
      //[{id, from_email, to_email, date, message}]
          .then(response => 
            
            console.log(response.data),
  
            setState({...state, messages: response.data})
          )
          
  }, []);
  

  //response: array of obj
  //to_email: str
  //from_email: str
  //date: YYYY-MM-DD HH24:MM:SS (str)
  //message: str


  const handleOnChange = e => {
    const newDM = e.target.value;
    state.messages.push(newDM);
    setState({...state)
    //console.log(state)
  }

  const sendDM = e => {
      e.preventDefault();

      //console.log('submitted')

      axios.post('/db/message', {
        from_email: state.sender,
        to_email: state.recipient,
        message: state.message[state.message.length - 1]
      })
      .then(function (response) {
        console.log(response);
        setState({...state, submitted: true})
      })
      .catch(function (error) {
        console.log(error);
      });

      
    useEffect(() => {
    //reload the DMs with this specific recipient
    
    axios.get(`/db/message/?to_email=e@e&from_email=w@w.com`)
    //[{id, from_email, to_email, date, message}]
        .then(response => 
          
          console.log(response.data),

          setState({...state, messages: response.data})
        )
        
    }, []);
  }
  //make a get request with axios to retrieve data that matches the recipient

  //create a form with an input that will store the typed in message 
  
  //send a post request with axios to the DB with the recipient matched

  let dirMessages = [];
  
  state.messages.forEach(message => {
    dirMessages.push(<div messageId={id}>
      <h4>{message.to_email}</h4>
      <p>{message.message}</p>
      <h4>{message.date}</h4>
    </div>)
  })

  return (
    <div>
      <h1>This is a dm thread</h1>
      <dirMessages />
      <form>
      <input placeholder='Enter DM here'
          name='message'
          onChange={handleOnChange}
          required>
      </input>
      <button onClick={sendDM()}>Send</button>
      </form>
    </div>
  );
}

export default DirMessage;
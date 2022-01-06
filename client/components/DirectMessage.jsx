import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function DirMessage() {

  const [state, setState] = useState({
    openModal: true,
    submitted: false,
    messages: [],
    // sender: '',
    // recipient: '',
    // date: '',
    // message: '',
  })

  

  // useEffect(() => {
  //   const axios = require('axios');

  //   const res = await axios.get('/api/messages');

  //   console.log(res.data.args);

  //   setState({...state, messages: res.data.args});

  // }) 

  //response: array of obj
  //to_email: str
  //from_email: str
  //date: YYYY-MM-DD HH24:MM:SS (str)
  //message: str


  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('/api/message')
        .then(response => 
          //use the data from the response to setState 
          setState({...state, 
            sender: response.data.from_email,
            recipient: response.data.to_emai,
            date: response.data.date,
            message: 
          })
          )

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  const handleOnChange = e => {
    setState({...state, [e.target.name]: e.target.value})
    //console.log(state)
  }

  const sendDM = e => {
      e.preventDefault();

      //console.log('submitted')

      axios.post('/api/message', {
        from_email: state.sender,
        to_email: state.recipient,
        message: state.message
      })
      .then(function (response) {
        console.log(response);
        setState({...state, submitted: true})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //make a get request with axios to retrieve data that matches the recipient

  //create a form with an input that will store the typed in message 
  
  //send a post request with axios to the DB with the recipient matched



  return (
    <div>
      <h1>This is a dm thread</h1>
      <Modal 
                className="Modal__Bootstrap modal-dialog"
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
            >
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h4 className="modal-title">Create a New Post</h4>
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only"></span>
                        </button>
                    </div>
                    {!submitted &&
                        <div> 
                        <div className="modal-body" id="new-thread-form">
                            <label>Recipient: {state.recipient}</label>
                            <label>Message:
                            <input type='text' onChange={handleOnChange} placeholder='Enter DM here' required></input>
                            </label>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={sendDM}>Send DM</button>
                        </div>
                        </div>
                    }
                    {submitted && <p>Your DM was sent!</p>}
                </div>
            </Modal>
    </div>
  );
}

export default DirMessage;
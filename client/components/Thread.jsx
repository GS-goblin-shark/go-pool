import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

function Thread() {
  const [firstPost, setFirstPost] = useState({});
  const [message, setMessage] = useState('');
  const [eventName, setEventName] = useState('');
  
  //get the current event's id
  const pathname= window.location.pathname.split('/');
  const path_id = pathname[2]; 

  //get today's date and format it for backend
  const today = new Date();
  const todayFormatted = moment(today).format('YYYY-MM-DD');

  //retrieve the current user's email from the session storage
  const currentUserEmail = sessionStorage.getItem('email')
  


  useEffect(() => {

    axios.get(`/db/thread/${path_id}`)
    .then((res) => {
      console.log(res.data[0])
      setFirstPost(res.data[0])
      setEventName(res.data[0]['event_name'])
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

  const onMessageChange = (e) => {
    const newValue = e.target.value;
    setMessage(newValue);
  }

  const reply = () =>{
    const data = { 
      thread: message,
      date_posted: todayFormatted,
      email: currentUserEmail,
      event_name: eventName,
      thread_id: ''
    }
    
    console.log(data)
    // axios.post('/threadreply', data)
    // .then((res) => {
    //   console.log(res)
    // })
    // .catch(e => {
    //   console.log(e);
    // })
  }

  return (
    <div className='thread-page'>
      <div id='thread-container'>
        <div className='post' id='first-post'>
          <div className='post-header'>
            <p><strong>{firstPost['first_name'] + ' ' + firstPost['last_name']}</strong></p>
            <p>{firstPost['date']}</p>
          </div>
          <p className='post-content'>{firstPost['thread']}</p> 
        </div>

        <div className='reply-box'>
          <label>Add a comment:</label>
          <textarea className ='reply-input' rows='5' onChange={onMessageChange}></textarea>
          <button type="button" className="btn btn-primary" onClick = {reply}>Comment</button>
        </div>

      </div>
    </div>
    
  );
}

export default Thread;
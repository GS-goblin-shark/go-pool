import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import moment from 'moment';
import UserInfo from './userInfo';

function Thread() {
  const [message, setMessage] = useState('');
  const [eventName, setEventName] = useState('');
  const [replyClicked, setReplyClicked] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState('');
  const [posts, setPosts] = useState({posts: []})
  
  //get the current event's id
  const pathname= window.location.pathname.split('/');
  const path_id = pathname[2]; 

  //get today's date and format it for backend
  const today = new Date();
  const todayFormatted = moment(today).format('YYYY-MM-DD');

  //retrieve the current user's email from the session storage
  const currentUserEmail = sessionStorage.getItem('email')
  
  const sortMessages = (a,b) =>{
    if(parseInt(a.thread_id) === parseInt(b.thread_id)){
      return a._id - b._id;
    }
    return parseInt(a.thread_id) < b.thread_id ? -1 : 1;
  }

  const loadData = () => {
    axios.get(`/db/thread/${path_id}`)
    .then((res) => {
      const messageArray = res.data
      const sorted = messageArray.sort(sortMessages)
      console.log(sorted)
      setEventName(res.data[0]['event_name'])
      setPosts({posts: sorted})
    })
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(loadData, []);

  const onMessageChange = (e) => {
    const newValue = e.target.value;
    setMessage(newValue);
  }

  const reply = (id) => {
    setReplyClicked(true);
    setCurrentThreadId(id);
    
  }

  const cancelReply = () => {
    setReplyClicked(false);
  }

  const addComment = () =>{
    const data = { 
      thread: message,
      date_posted: todayFormatted,
      email: currentUserEmail,
      event_name: eventName,
      thread_id: `${currentThreadId}`
    }
    
    console.log(data)
    
    axios.post('/threadreply', data)
    .then((res) => {
      console.log('message sent')
      setReplyClicked(false);
      setMessage('');
      loadData();
    })
    .catch(e => {
      console.log(e);
    })
  }

  const postList = posts['posts'].map((msg) => {
    return(
      <div className='post'>
      <div className='post-header'>
        <UserInfo username={msg['first_name'] + ' ' + msg['last_name']} email={msg.email}></UserInfo>
        <p>{msg['date']}</p>
      </div>
      <p className='post-content'>{msg['thread']}</p>
      <div className='post-buttons'>
        {currentUserEmail === msg.email && !replyClicked && <button className='post-reply-button btn btn-outline-primary'>Delete</button>}
        {!replyClicked && <button className='post-reply-button btn btn-primary' onClick={()=>{reply(msg._id)}}>Reply</button>}
      </div>
      {
        replyClicked && currentThreadId === msg._id  &&
          <div className='reply-box'>
          <textarea className ='reply-input' rows='5' onChange={onMessageChange}></textarea>
          <button className='btn btn-outline-primary' onClick={cancelReply}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick = {addComment}>Add Reply</button>
          </div>
      }
    </div>
    );          
  });

  return (
    <div className='thread-page'>
      <div id='thread-container'>
        <button className='btn btn-primary'>Delete Thread</button>
        {postList}
      </div>
    </div>
    
  );
}

export default Thread;
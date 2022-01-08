import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Thread() {
  const [firstPost, setFirstPost] = useState({});

  useEffect(() => {
    const pathname= window.location.pathname.split('/');
    const path_id = pathname[2]; 

    axios.get(`/thread/${path_id}`)
    .then((res) => {
      console.log(res.data[0]);
      setFirstPost(res.data[0])
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

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
      </div>
    </div>
    
  );
}

export default Thread;
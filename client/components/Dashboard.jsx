import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';
import NewEventModal from './NewEvent';
import ThreadCard from './threadTitleCard';
import axios from 'axios';

function Dashboard() {
  const [dateState, setDateState] = useState(new Date())
  const [upcoming, setUpcoming] = useState({thread: []})

  const currentUserEmail = sessionStorage.getItem('email')

  const changeDate = (e) => {
    setDateState(e)
  }

  useEffect(() => {
    axios.get('/thread/upcoming')
    .then((res) => {
      setUpcoming({thread: res.data})
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

  const eventList = upcoming['thread'].map((event) => {
      return(
        <ThreadCard date={event.date} event_name={event.event_name}></ThreadCard>
      );        
  });

  const todaysEvents = upcoming['thread'].map((event) => {
    if(event.date == moment(dateState).format('MMM DD')){
            return(
        <ThreadCard event_name={event.event_name}></ThreadCard>
      );     
    }  
  });

  return (
    <div id='dashboardComponent'>
      <h1>Hello {currentUserEmail}!</h1>
      <h2>Select a date to view events:</h2>
      <div id='calendar-div'>
        <Calendar value={dateState} onChange={changeDate}/>
        <div id='calendar-event-display'>
        <p>Events for {moment(dateState).format('MMM Do')}</p>
        <div id = 'selected-day-events'>
          {todaysEvents}
        </div>
        </div>
         <NewEventModal/>
      </div>
      <div id='upcoming-events-container'>
        <h1>Upcoming Events</h1>
        <div id='thread-card-container'>
          {eventList}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

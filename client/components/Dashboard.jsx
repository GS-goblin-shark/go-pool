import React, { useState } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';
import NewEventModal from './NewEvent';
import ThreadCard from './threadTitleCard';

function Dashboard() {
  const [dateState, setDateState] = useState(new Date())

  const changeDate = (e) => {
    setDateState(e)
  }

  return (
    <div id='dashboardComponent'>
      <h2>Select a date to view events:</h2>
      <div id='calendar-div'>
        <Calendar value={dateState} onChange={changeDate}/>
        <div id='calendar-event-display'>
        <p>Events for {moment(dateState).format('MMM Do YYYY')}</p>
        {/* events should load here */}
        </div>
         <NewEventModal/>
      </div>
      <div id='upcoming-events-container'>
        <h1>Upcoming Events</h1>
        <div id='thread-card-container'>
          <ThreadCard/>
          <ThreadCard/>
          <ThreadCard/>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

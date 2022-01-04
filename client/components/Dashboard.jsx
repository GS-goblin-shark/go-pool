import React, { useState } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment';

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
        <p>Events for <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      </div>
      <h1>Upcoming Events</h1>
    </div>
  );
}

export default Dashboard;

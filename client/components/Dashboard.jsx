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
      <h1>Upcoming Events</h1>
      <div id='calendar-div'>
        <Calendar value={dateState} onChange={changeDate}/>
        <p>Events for <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      </div>
    </div>
  );
}

export default Dashboard;

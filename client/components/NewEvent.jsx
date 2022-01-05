import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import moment from 'moment';

function NewEventModal(){
    const [startDate, setStartDate] = useState(new Date());
    
    const onChange= (date) =>{
        setStartDate(date);
        //correct date format for post
        console.log(moment(date).format('YYYY-MM-DD'))
    }

    // post request to /api/thread
    //send date format as yyyy-mm-dd

    return(
        <div id='new-event'>
            <p>Don't see your event on the calendar?</p>
            <label>Event Date</label>
            <DatePicker selected={startDate} onChange={onChange} />
            <label>Event</label>
            <input type='text' placeholder='event name'></input>
            <label>Location</label>
            <input type='text' placeholder='location'></input>
            <label>Message</label>
            <textarea></textarea>
            <button>Start a new thread</button>
        </div>

    )
}

export default NewEventModal;
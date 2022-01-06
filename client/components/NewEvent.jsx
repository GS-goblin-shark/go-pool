import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';

function NewEventModal(){
    const [startDate, setStartDate] = useState(new Date());
    const [eventDate, setEventDate] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('email@email.com');
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [thread, setThread] = useState('');
    const [submitted, setSubmitted] = useState(false);

    //get today's date and format it for backend
    const today = new Date();
    const todayFormatted = moment(today).format('YYYY-MM-DD');
    
    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }
    
    const onChange= (date) =>{
        setStartDate(date);
        //correct date format for backend
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setEventDate(formattedDate);
    }

    const onNameChange = (e) => {
        const newValue = e.target.value;
        setEventName(newValue);
    }

    const onLocationChange = (e) => {
        const newValue = e.target.value;
        setLocation(newValue);
    }

    const onThreadChange = (e) => {
        const newValue = e.target.value;
        setThread(newValue);
    }

    // post request to /thread
    //send date format as yyyy-mm-dd
    const CreateNewThread = () =>{
        
        const data = { 
            event_name: eventName, 
            date: eventDate, 
            location: location, 
            thread: thread, 
            date_posted: todayFormatted, 
            email: emailValue
        }

        axios.post('/thread', data)
        .then((res) => {
          console.log(res)
          console.log('Post successfully created!');
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        })
   }

    return(
        <div id='new-event'>
            <p>Don't see your event on the calendar?</p>
            <button type="button" className="btn btn-primary" id="thread-modal-button" onClick={openModal}>Start a new post</button>
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
                            <label>Event Date</label>
                            <DatePicker selected={startDate} onChange={onChange} />
                            <label>Event Name</label>
                            <input type='text' onChange={onNameChange}></input>
                            <label>Location</label>
                            <input type='text' onChange={onLocationChange}></input>
                            <label>Message</label>
                            <textarea onChange={onThreadChange}></textarea>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={CreateNewThread}>Create Post</button>
                        </div>
                        </div>
                    }
                    {submitted && <p>Your post was created!</p>}
                </div>
            </Modal>
            
            
            
            
        </div>

    )
}

export default NewEventModal;
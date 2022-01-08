import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';

function NewEventModal(){    
    //get today's date and format it for backend
    const today = new Date();
    const todayFormatted = moment(today).format('YYYY-MM-DD');

    const [startDate, setStartDate] = useState(new Date());
    const [eventDate, setEventDate] = useState(todayFormatted);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [thread, setThread] = useState('');
    const [submitted, setSubmitted] = useState(false);

    //retrieve the current user's email from the session storage
    const currentUserEmail = sessionStorage.getItem('email')


    
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
            email: currentUserEmail
        }
        console.log(data)

        axios.post('/db/thread', data)
        .then((res) => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        })
   }

   const route = () => {
    window.location.href = '/thread/' + event_id;
  }
    return(
        <div id='new-event'>
            <button type="button" className="btn btn-secondary" id="thread-modal-button" onClick={openModal}>Add a new post</button>
            <Modal 
                className="Modal__Bootstrap modal-dialog"
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
            >
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h4 className="modal-title">Create a New Post</h4>
                        <button type="button" className="close" id='modal-close-button' onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only"></span>
                        </button>
                    </div>
                    {!submitted &&
                        <div className='modal-form-open'> 
                        <div className="modal-body" id="new-thread-form">
                            <label>Event Date</label>
                            <DatePicker selected={startDate} onChange={onChange} />
                            <label>Event Name</label>
                            <input type='text' onChange={onNameChange}></input>
                            <label>Location</label>
                            <input type='text' onChange={onLocationChange}></input>
                            <label>Message</label>
                            <textarea rows='5' onChange={onThreadChange}></textarea>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={CreateNewThread}>Create Post</button>
                        </div>
                        </div>
                    }
                    {submitted && 
                        <div>
                            <p>Your post was created!</p>
                            <button className="thread-card btn btn-primary text-left" onClick={route}>See Post</button>
                        </div>}
                </div>
            </Modal>
            
            
            
            
        </div>

    )
}

export default NewEventModal;
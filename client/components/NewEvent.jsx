import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';

function NewEventModal(){
    const [startDate, setStartDate] = useState(new Date());
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }
    
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
                    <div className="modal-body" id="new-thread-form">
                        <label>Event Date</label>
                        <DatePicker selected={startDate} onChange={onChange} />
                        <label>Event</label>
                        <input type='text'></input>
                        <label>Location</label>
                        <input type='text'></input>
                        <label>Message</label>
                        <textarea></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Create Post</button>
                    </div>
                </div>
            </Modal>
            
            
            
            
        </div>

    )
}

export default NewEventModal;
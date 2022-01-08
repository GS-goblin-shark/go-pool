import React, {useState} from 'react';
import Modal from 'react-modal';

function UserInfo(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

  return (
    <div id='userInfoModal' >
        <a className='user-info-button' onClick={openModal}><strong>{props.username}</strong></a>
        <Modal  className="Modal__Bootstrap modal-dialog" isOpen={modalIsOpen} onRequestClose={closeModal} >
            <div className="modal-content">
                <h4>{props.username}</h4>
                <button className='btn btn-primary'>Send Private Message</button>
            </div>
        </Modal>
    </div>
  );
}

export default UserInfo;
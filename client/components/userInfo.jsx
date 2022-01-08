import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Geocode from 'react-geocode';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

function UserInfo(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    axios.get('/keys').then((res) => {
      setApiKey(res.data.key);
    });
  }, []);

  const apiIsLoaded = (map, maps, center) => {
    const circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      map,
      center: center,
      radius: 1000,
    });
  };

  const getAddress = () => {
    axios
      .get(`/api/${props.email}`)
      .then((res) => {
        Geocode.setApiKey(apiKey);
        Geocode.fromAddress(res.data.address).then(
          (res) => {
            setLocation(res.results[0].geometry.location);
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openModal = () => {
    setIsOpen(true);
    getAddress();
    // map();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div id='userInfoModal'>
      <a className='user-info-button' onClick={openModal}>
        <strong>{props.username}</strong>
      </a>
      <Modal
        className='Modal__Bootstrap modal-dialog'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}>
        <div className='modal-content'>
          <h4>{props.username}</h4>
          <h4>{props.email}</h4>
          <button className='btn btn-primary'>Send Private Message</button>
          <div className='map'>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: apiKey,
              }}
              center={location}
              defaultCenter={location}
              defaultZoom={13}
              onGoogleApiLoaded={({ map, maps }) =>
                apiIsLoaded(map, maps, location)
              }
              yesIWantToUseGoogleMapApiInternals={true}></GoogleMapReact>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserInfo;

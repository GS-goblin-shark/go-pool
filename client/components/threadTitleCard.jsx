import React from 'react';

function ThreadCard(props) {
  const date = props.date
  const title = props.event_name
  const event_id = props.event_id

  const route = () => {
    window.location.href = '/thread/' + event_id;
  }


  if(date){
    return (
        <button className="thread-card btn btn-primary text-left" onClick={route}> {date}  |  {title}</button>
    );
  }
  else{
    return(
      <button className="thread-card btn btn-primary text-left" onClick={route}>{title}</button>
    )
  }
}

export default ThreadCard;
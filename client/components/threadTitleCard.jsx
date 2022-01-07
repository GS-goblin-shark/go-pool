import React from 'react';

function ThreadCard(props) {
  const date = props.date
  const title = props.event_name
  return (
      <button className="thread-card btn btn-primary text-left"> {date}  |  {title}</button>
  );
}

export default ThreadCard;
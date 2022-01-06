import React from 'react';

function ThreadCard() {
  const date = 'Jan. 05'
  const title = 'Event Name'
  return (
      <button className="thread-card btn btn-primary text-left"> {date}  |  {title}</button>
  );
}

export default ThreadCard;
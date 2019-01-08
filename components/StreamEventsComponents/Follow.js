import React from 'react'





const StreamEventFollow = ({ event }) => (
  <React.Fragment>
    <span className="name">{event.user.display_name}</span>
    <span className="message">Followed</span>
  </React.Fragment>
)





export { StreamEventFollow }
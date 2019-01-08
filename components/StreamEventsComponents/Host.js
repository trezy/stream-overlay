import React from 'react'





const StreamEventHost = ({ event }) => (
  <React.Fragment>
    <span className="name">{event.user.display_name}</span>
    <span className="message">Host({event.value})</span>
  </React.Fragment>
)





export { StreamEventHost }
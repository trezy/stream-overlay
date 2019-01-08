import React from 'react'





const StreamEventRaid = ({ event }) => (
  <React.Fragment>
    <span className="name">{event.user.display_name}</span>
    <span className="message">Raid({event.value})</span>
  </React.Fragment>
)





export { StreamEventRaid }
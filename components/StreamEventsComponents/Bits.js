import React from 'react'





const StreamEventBits = ({ event }) => (
  <React.Fragment>
    <span className="name">{event.user.display_name}</span>
    <span className="message">{event.value} Bits</span>
  </React.Fragment>
)





export { StreamEventBits }
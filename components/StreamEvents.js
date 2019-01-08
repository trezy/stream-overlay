// Module imports
import { difference } from 'lodash'
import { connect } from 'react-redux'
import axios from 'axios'
import React from 'react'





// Component imports
import { 
  StreamEventBits,
  StreamEventFollow,
  StreamEventHost,
  StreamEventRaid,
} from './StreamEventsComponents'





// Component constants
const mapStateToProps = ({ currentStream, events }) => ({ currentStream, events })
const twitchClientId = 'qmozd17tqggbpbt1ig6x1tm4hsg96q'
const twitchRedirectURI = encodeURI('https://ww09l72vl.codesandbox.io')





@connect(mapStateToProps)
class StreamEvents extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  eventPollingIntervalID = null

  queuedEvents = []

  state = { 
    events: [],
    followers: [],
  }

  twitchAccessToken = null

  twitchUserID = null





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _startEventPolling = () => {
    this.eventPollingIntervalID = setInterval(() => {
      if (this.queuedEvents.length) {
        this.setState(({ events }) => ({
          events: [
            ...events,
            this.queuedEvents.shift(),
          ],
        }))
      }
    }, 1000)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._startEventPolling()
  }

  componentDidUpdate (previousProps) {
    const { currentStream } = this.props
    
    if (currentStream) {
      const { created_at: createdAt } = currentStream
      const filteredEvents = this.props.events.filter(event => event.createdAt > createdAt)
      let newEvents = []

      newEvents = difference(filteredEvents, previousProps.events)

      if (newEvents.length) {
        this.queuedEvents = this.queuedEvents.concat(newEvents)
      }
    }
  }

  componentWillUnmount () {
    clearInterval(this.eventPollingIntervalID)
  }

  render () {
    const { events } = this.state
    
    return (
      <ol className="nes-list stream-events">
        {events.map((event) => (
          <li data-type={event.type}>
            <div className="is-dark is-rounded nes-container">
              {(event.type === 'bits') && (
                <StreamEventBits event={event} />
              )}

              {(event.type === 'follow') && (
                <StreamEventFollow event={event} />
              )}

              {(event.type === 'host') && (
                <StreamEventHost event={event} />
              )}

              {(event.type === 'raid') && (
                <StreamEventRaid event={event} />
              )}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}





export default StreamEvents
export { StreamEvents }

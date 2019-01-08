import { combineReducers } from 'redux'
import currentStream from './currentStream'
import events from './events'
import followers from './followers'





export default combineReducers({
  currentStream,
  events,
  followers,
})

// Module imports
import {
  createStore,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'





// Component imports
import defaultState from './store/initialState'
import reducer from './store/reducers/index'

/* actions */
import * as followersActions from './store/actions/followers'
import * as streamActions from './store/actions/streams'





export const actions = {
  ...followersActions,
  ...streamActions,
}





export const initStore = (initialState = defaultState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

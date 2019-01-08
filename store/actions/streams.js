// Module imports
import { sortBy } from 'lodash'
import axios from 'axios'





// Component imports
import actionTypes from '../actionTypes'
import twitchAPI from '../../services/twitchAPI'





// Component constants
const twitchUserID = '72632519'





export const getCurrentStream = () => async dispatch => {
  let response = null
  let success = false

  try {
    response = await twitchAPI.get(`/kraken/streams/${twitchUserID}`)
    success = true
  } catch (error) {
    console.error(error)
  }

  dispatch({
    payload: { ...response.data.stream },
    status: success ? 'success' : 'error',
    type: actionTypes.GET_CURRENT_STREAM,
  })
}
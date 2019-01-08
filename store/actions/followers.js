// Module imports
import { sortBy } from 'lodash'
import axios from 'axios'





// Component imports
import { getTwitchFollowers } from '../../helpers'
import actionTypes from '../actionTypes'





export const getFollowers = () => async (dispatch, getState) => {
  const { followers } = getState()
  const newFollows = []
  let newFollowers = null
  let success = false
  
  try {
    newFollowers = await getTwitchFollowers(followers)
    success = true
  } catch (error) {
    console.error(error)
  }
  
  newFollowers.reverse()
  
  dispatch({
    payload: { newFollowers },
    status: success ? 'success' : 'error',
    type: actionTypes.GET_FOLLOWERS,
  })
}

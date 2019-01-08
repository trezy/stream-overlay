// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




export default function (state = initialState.followers, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = { ...state }

  switch (type) {
    case actionTypes.GET_FOLLOWERS:
      if (status === 'success') {
        for (const follower of payload.newFollowers) {
          newState[follower.user._id] = follower
        }
      }
      
      return newState
      
    default:
      return newState
  }
}
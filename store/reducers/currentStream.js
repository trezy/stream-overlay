// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




export default function (state = initialState.currentStream, action) {
  const {
    payload,
    status,
    type,
  } = action
  let newState = { ...state }

  switch (type) {
    case actionTypes.GET_CURRENT_STREAM:
      if (status === 'success') {
        payload.created_at = new Date(payload.created_at)
        newState = payload
      }
      
      return newState
      
    default:
      return newState
  }
}
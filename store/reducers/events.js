// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




export default function (state = initialState.events, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = [...state]

  switch (type) {
    case actionTypes.GET_FOLLOWERS:
      if (status === 'success') {
        for (const follower of payload.newFollowers) {
          follower.created_at = new Date(follower.created_at)
          
          newState.push({
            createdAt: follower.created_at,
            type: 'follow',
            user: follower.user,
          })
        }
      }
      
      return newState
      
    default:
      return newState
  }
}
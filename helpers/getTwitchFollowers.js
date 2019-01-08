// Module imports
import getConfig from 'next/config'





// Component imports
import twitchAPI from '../services/twitchAPI'





// Constants
const { publicRuntimeConfig } = getConfig()
const twitchUserID = '72632519'





async function getTwitchFollowers (followers, newFollowers = [], cursor = null) {
  let shouldContinue = true

  const response = await twitchAPI.get(`/kraken/channels/${twitchUserID}/follows${cursor ? `?cursor=${cursor}` : ''}`)

  for (const follower of response.data.follows) {
    if (followers[follower.user._id]) {
      shouldContinue = false
    } else {
      newFollowers.push(follower)
    }
  }

  if (shouldContinue && (newFollowers.length < response.data._total)) {
    await getTwitchFollowers(followers, newFollowers, response.data._cursor)
  }
  
  return newFollowers
}

export { getTwitchFollowers }
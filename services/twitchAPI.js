// Module imports
import axios from 'axios'
import getConfig from 'next/config'





// Component constants
const { publicRuntimeConfig } = getConfig()
const { twitch: twitchAPI } = publicRuntimeConfig.apis





export default axios.create({
  baseURL: twitchAPI.url,
  headers: { 
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': twitchAPI.clientID,
  },
})
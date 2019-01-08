const withSass = require('@zeit/next-sass')

const { 
  TWITCH_API_CLIENT_ID,
  TWITCH_API_URL,
} = process.env





module.exports = withSass({
  publicRuntimeConfig: {
    apis: {
      twitch: {
        clientID: TWITCH_API_CLIENT_ID,
        url: TWITCH_API_URL,
      },
    },
  },
})

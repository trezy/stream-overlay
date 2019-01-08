// Module imports
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import LocalForage from 'localforage'



// Component imports
import { initStore } from '../store'
import { AppLayout } from '../components'





// Style imports
import '../scss/reset.scss'
import '../scss/libraries.scss'
import '../scss/app.scss'





class NextApp extends App {
  constructor (props) {
    super(props)

    LocalForage.config({
      name: 'TrezyCodes Stream Overlay',
      storeName: 'webStore',
    })
  }

  static async getInitialProps (appProps) {
    return AppLayout.getInitialProps(appProps)
  }

  render () {
    const {
      store,
    } = this.props

    return (
      <Container>
        <Provider store={store}>
          <AppLayout {...this.props} />
        </Provider>
      </Container>
    )
  }
}





export default withRedux(initStore)(NextApp)

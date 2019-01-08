// Module imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NextHead from 'next/head'
import React from 'react'
import Router from 'next/router'





// Component imports
import { actions } from '../store'
import { 
  FollowerGoal,
  StreamEvents,
} from '../components'





class StreamingVideoFrame extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  state = {
    availableCaptureDevices: [],
    screen: this.props.screen || null,
    webcam: this.props.webcam || null,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _getCaptureDevices = async () => {
    await navigator.mediaDevices.getUserMedia({ video: true })

    const mediaDevices = await navigator.mediaDevices.enumerateDevices()
    const videoCaptureDevices = mediaDevices.filter(({ kind }) => kind === 'videoinput')

    this.setState({ availableCaptureDevices: videoCaptureDevices })
  }
  
  _handleMountAndUpdate (previousState = {}) {
    const {
      screen,
      webcam,
    } = this.state

    if (previousState.screen !== screen) {
      if (screen) {
        this._startCapture('screen')
      } else if (previousState.hasOwnProperty(screen)) {
        this._stopCapture('screen')
      }
    }

    if (previousState.webcam !== webcam) {
      if (webcam) {
        this._startCapture('webcam')
      } else if (previousState.hasOwnProperty(webcam)) {
        this._stopCapture('webcam')
      }
    }

    if ((previousState.webcam !== webcam) || (previousState.screen !== screen)) {
      const query = []

      if (webcam) {
        query.push(`webcam=${webcam}`)
      }

      if (screen) {
        query.push(`screen=${screen}`)
      }

      const newRoute = `/?${query.join('&')}`

      Router.push(newRoute, newRoute, { shallow: true })
    }
  }
  
  _pollFollowers = () => {
    this.followersPollingID = setTimeout(async () => {
      const { getFollowers } = this.props
      
      await getFollowers()
      
      this._pollFollowers()
    }, 5000)
  }

  _startCapture = async type => {
    const captureDeviceId = this.state[type]
    const targetEl = this[`${type}El`]

    let mediaStream = null

    if (captureDeviceId === 'screen-capture') {
      mediaStream = await navigator.getDisplayMedia({
        // audio: true,
        video: true,
      })
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: captureDeviceId,
          },
        },
      })
    }

    targetEl.current.srcObject = mediaStream // eslint-disable-line no-param-reassign

    this.forceUpdate()
  }

  _stopCapture = type => {
    const targetEl = this[`${type}El`]

    targetEl.pause()
    targetEl.removeAttribute('src')
    targetEl.load()

    this.forceUpdate()
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._handleMountAndUpdate()
    this._getCaptureDevices()
    this._pollFollowers()
    this.props.getCurrentStream()
  }

  componentDidUpdate (previousProps, previousState) {
    this._handleMountAndUpdate(previousState)
  }

  constructor (props) {
    super(props)

    this.webcamEl = React.createRef()
    this.screenEl = React.createRef()
  }

  static getInitialProps = ({ query: { screen, webcam } }) => ({ screen, webcam })

  render () {
    const {
      availableCaptureDevices,
      screen,
      webcam,
    } = this.state

    let videoSourceOptions = null

    if (availableCaptureDevices.length || screen || webcam) {
      videoSourceOptions = (
        <React.Fragment>
          <option>
            Select a video source
          </option>

          <option value="screen-capture">
            Screen Capture
          </option>

          {availableCaptureDevices.map(({ deviceId, label }) => (
            <option
              key={deviceId}
              value={deviceId}>
              {label}
            </option>
          ))}
          
          {(webcam && !availableCaptureDevices.find(({ deviceId }) => deviceId === webcam)) && (
            <option value={webcam}>
              Webcam (loading...)
            </option>
          )}
          
          {(screen && !availableCaptureDevices.find(({ deviceId }) => deviceId === screen)) && (
            <option value={screen}>
              Screen (loading...)
            </option>
          )}
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <NextHead>
          <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
          <link href="/static/styles/nes.min.css" rel="stylesheet" />
        </NextHead>

        <aside className="stream-sidebar">
          <div className="is-dark is-rounded nes-container">
            {/* eslint-disable jsx-a11y/media-has-caption */}
            <video
              autoPlay
              controls={false}
              ref={this.webcamEl} />
            {/* eslint-enable */}
          </div>
          
          <StreamEvents />
          
          <FollowerGoal />
        </aside>

        <main className="is-dark is-rounded nes-container stream-main">
          {/* eslint-disable jsx-a11y/media-has-caption */}
          <video
            autoPlay
            controls={false}
            ref={this.screenEl} />
          {/* eslint-enable */}
        </main>

        <dialog
          className="is-dark is-rounded nes-dialog stream-dialog"
          open={!screen || !webcam}>
          {!availableCaptureDevices && (
            'Searching for devices...'
          )}

          {availableCaptureDevices && (
            <React.Fragment>
              <select
                onChange={({ target: { value } }) => {
                  this.setState({ webcam: value })
                }}
                value={webcam || ''}>
                {videoSourceOptions}
              </select>

              <select
                onChange={({ target: { value } }) => {
                  this.setState({ screen: value })
                }}
                value={screen || ''}>
                {videoSourceOptions}
              </select>
            </React.Fragment>
          )}
        </dialog>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentStream: actions.getCurrentStream,
  getFollowers: actions.getFollowers,
}, dispatch)





export default connect(null, mapDispatchToProps)(StreamingVideoFrame)
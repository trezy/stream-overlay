// Module imports
import { connect } from 'react-redux'
import axios from 'axios'
import leftPad from 'left-pad'
import React from 'react'





// Component imports
import { ProgressBar } from '.'





// Component constants
const mapStateToProps = ({ followers }) => ({ followers })
const twitchClientId = 'qmozd17tqggbpbt1ig6x1tm4hsg96q'





@connect(mapStateToProps)
class FollowerGoal extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  state = {
    followerGoal: 50,
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { followers } = this.props
    const { followerGoal } = this.state
    const followerCount = Object.keys(followers).length
    
    return (
      <div className="stream-follower-goal">
        <header>Follower Goal</header>
        
        <ProgressBar
          max={followerGoal}
          value={followerCount} />
        
        <div className="follower-counts">
          <span className="follower-count">{leftPad(followerCount, 6, '0')}</span>
          <span className="follower-count-goal">{leftPad(followerGoal, 6, '0')}</span>
        </div>
      </div>
    )
  }
}





export { FollowerGoal }
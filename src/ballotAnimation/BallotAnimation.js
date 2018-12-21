import React, {Component} from 'react';
import './BallotAnimation.css'

class BallotAnimation extends Component{
  render(){
    return(<div className='ballot-animation'>
      <div className='ballot'>
        <div className='writing-wrapper'>
        <div className='writing-line'></div>
        <div className='writing-line'></div>
        <div className='writing-line'></div>
        <div className='writing-line'></div>
        </div>
      </div>
      <div className='ballot-box'>
        
      </div>
    </div>)
  }
}

export default BallotAnimation;
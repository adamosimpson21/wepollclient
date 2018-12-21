import React, {Component} from 'react';
import './BallotAnimation.css'
import ballotBox from  './ballot-box.png';
import ballotBoxBottom from  './ballot-box-bottom.png';

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
      <div className='ballot-box-wrapper'>
        <div className='ballot-box'>
          <img id='ballot-box' src={require('./ballot-box.png')} alt='ballot-box'/>
          <img id='ballot-box-bottom' src={require('./ballot-box-bottom.png')} alt='ballot-box-bottom' />
        </div>
      </div>
    </div>)
  }
}

export default BallotAnimation;
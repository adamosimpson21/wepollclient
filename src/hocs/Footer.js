import React, {Component} from 'react'
import './Footer.css'
import connect from 'react-redux/es/connect/connect'
import {levelProgress, checkLevel} from '../helper/experience'
import withRouter from "react-router/es/withRouter";

class Footer extends Component{
   render(){
    if( this.props.currentUser && this.props.currentUser.isAuthenticated){
      const user = this.props.currentUser.user
      return(<div className='footer'>
              <div className='footerContent'>
                <div className='progressBarContainer'>
                  <div className="progress-bar xpProgressBar" role="progressbar"
                       aria-valuenow={user.experience}
                       aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(user.experience)+'%'}}>
                  </div>
                </div>
                You are level {checkLevel(user.experience)} and have {user.experience} experience!
              </div>
            </div>)
    } else {
      return(<div className='footer'>Sign up to access experience and leveling!</div>)
    }
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps)(Footer));
import React, {Component} from 'react'
import './Footer.css'
import connect from 'react-redux/es/connect/connect'
import {levelProgress, checkLevel} from '../helper/experience'
import withRouter from "react-router/es/withRouter";

class Footer extends Component{
  render(){
    const { currentUser } = this.props
    if(currentUser && currentUser.isAuthenticated){
      return(<div className='footer'>
               <div className='footerContent'>
                 <div className='progressBarContainer'>
                   <div className="progress-bar xpProgressBar" role="progressbar"
                       aria-valuenow={currentUser.user.experience}
                       aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(currentUser.user.experience)+'%'}}>
                   </div>
                 </div>
                 You are level {checkLevel(currentUser.user.experience)} with {currentUser.user.experience} experience!
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
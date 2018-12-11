import React, {Component} from 'react'
import './Footer.css'
import connect from 'react-redux/es/connect/connect'
import {levelProgress, checkLevel} from '../helper/experience'
import {presidentNameArray} from '../helper/constants'
import withRouter from "react-router/es/withRouter";
import PresidentLink from "./PresidentLink";

class Footer extends Component{
  render(){
    const { currentUser } = this.props
    const userLevel = checkLevel(currentUser.user.experience)
    if(currentUser && currentUser.isAuthenticated){
      return(<div className='footer'>
               <div className='footerContent'>
                 <div className='progressBarContainer'>
                   <div className="progress-bar xpProgressBar" role="progressbar"
                       aria-valuenow={currentUser.user.experience}
                       aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(currentUser.user.experience)+'%'}}>
                   </div>
                 </div>
                 Level: {userLevel} (<PresidentLink level={userLevel}/>) Experience: {currentUser.user.experience}
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
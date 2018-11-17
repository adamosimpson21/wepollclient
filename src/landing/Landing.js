import React, {Component} from 'react'
import './Landing.css'
import Link from "react-router-dom/es/Link";
import connect from "react-redux/es/connect/connect";
import WePollTwitterFeed from '../hocs/WePollTwitterFeed';
import {addMessage} from "../store/actions/messages";
import Button from "../hocs/Button";

class Landing extends Component{
  render(){
    return(
      <div className='landing-wrapper'>
        <div className='landingTitle'>
        <h1>Welcome to WePoll!</h1>
        <div className='landingDescription'>WePoll is a free to use app that helps people Represent Themselves! Answer political, social, and economic
          polls to improve debate and Democracy!</div>
        </div>
        <div className='landingButtons'>
          <Link to='/question'><Button label='Check out some Questions' id='landing-question-button'/></Link>
          {!this.props.currentUser.isAuthenticated && <Link to='/register'><Button label='Sign up Today' /></Link>}
          {!this.props.currentUser.isAuthenticated && <Link to='/logIn'><Button label='Have an account already? Log In' /></Link>}
          {/*<Link to='/party'><Button label='Party' /></Link>*/}
          <Link to='/shop'><Button label='Shop for awesome items' /></Link>
          <Link to='/profile'><Button label='Your Profile' /></Link>
          {/*<Link to='/settings'><Button label='Settings' /></Link>*/}
          <Link to='/about'><Button label='About WePoll' /></Link>
        </div>
        <div className='twitter-feed-landing'>
          <WePollTwitterFeed />
        </div>
      </div>)
  }
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser,
    messages: state.messages
  }
}

export default connect(mapStateToProps, {addMessage})(Landing);
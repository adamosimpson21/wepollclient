import React, {Component} from 'react'
import './Landing.css'
import ButtonLG from '../hocs/ButtonLG'
import Link from "react-router-dom/es/Link";
import connect from "react-redux/es/connect/connect";
import WePollTwitterFeed from '../hocs/WePollTwitterFeed';

class Landing extends Component{
  render(){
    return(
      <div>
        <div className='landingTitle'>
        <h1>Welcome to WePoll!</h1>
        <div className='landingDescription'>WePoll is a free to use app that helps people Represent Themselves! Answer political, social, and economic
          polls to improve debate and Democracy!</div>
        </div>
        <div className='landingButtons'>
          <Link to='/question'><ButtonLG label='Check out some Questions' id='landing-question-button'/></Link>
          {!this.props.currentUser.isAuthenticated && <Link to='/register'><ButtonLG label='Sign up Today' /></Link>}
          {!this.props.currentUser.isAuthenticated && <Link to='/logIn'><ButtonLG label='Have an account already? Log In' /></Link>}
          {/*<Link to='/party'><ButtonLG label='Party' /></Link>*/}
          <Link to='/shop'><ButtonLG label='Shop for awesome items' /></Link>
          <Link to='/profile'><ButtonLG label='Your Profile' /></Link>
          {/*<Link to='/settings'><ButtonLG label='Settings' /></Link>*/}
          <Link to='/about'><ButtonLG label='About WePoll' /></Link>

        </div>
        <div className='twitter-feed-landing'>
          <WePollTwitterFeed />
        </div>
      </div>)
  }
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Landing);
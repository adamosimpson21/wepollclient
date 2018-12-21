import React, {Component} from 'react'
import './Splash.css'
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";

class Splash extends Component{
  state={ fading: false}

  handleLanding = () => {
    this.setState({fading:true});
    setTimeout(() => this.props.history.push('/landing'), 1)
  }

  handleAbout = () => {
    this.props.history.push('/about')
  }

  render(){
    return(
      <div className='splashPage'>
        <div id="landing-header">
          <h1>Welcome to WePoll!</h1>
          <br />
          <Button label='Represent Yourself!' color='green' onClick={this.handleLanding} />
          <br />
          <Button label='Learn More' color='frame' classes='alt-entrance' onClick={this.handleAbout}/>
        </div>
        <ul className={`slideshow ${this.state.fading && ' fading-slideshow'}`} >
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

      </div>)
  }
}

export default withRouter(Splash);
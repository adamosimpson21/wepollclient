import React, {Component} from 'react'
import './Splash.css'
import Link from "react-router-dom/es/Link";

class Splash extends Component{
  render(){
    return(
      <div className='splashPage'>
        <div id="landing-header">
          <h1>Welcome to WePoll!</h1>
          <br />
          <div className='splashButton' >
            <Link to='/landing'>Represent Yourself!</Link>
          </div>
        </div>
        <ul className="slideshow">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

      </div>)
  }
}

export default Splash;
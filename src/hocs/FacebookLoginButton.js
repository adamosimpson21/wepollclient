import FacebookLogin from "react-facebook-login";
import React, {Component} from "react";

class FacebookLoginButton extends Component{
  responseFacebook = (response) => {
    console.log(response);
  }

  componentClicked = event => {
    console.log(event);
  }

  render(){
    return(<FacebookLogin
      appId="545684012567896"
      autoLoad={true}
      fields="name,picture"
      onClick={this.componentClicked}
      callback={this.responseFacebook}
    />)
  }
}

export default FacebookLoginButton;
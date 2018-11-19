import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import LogIn from "../register/LogIn";
import Register from "../register/Register";
import Splash from "../splash/Splash";
import MessageDisplay from "./MessageDisplay";
import Switch from "react-router/es/Switch";

class EmptyLayout extends Component{
  render(){
    return(<div className='App'>
      <MessageDisplay />
      <Switch>
        <Route path='/logIn' component={LogIn} />
        <Route path='/register' component={Register}/>
        <Route path='/splash' component={Splash}/>
        <Redirect from="/" to="/splash"/>
      </Switch>
    </div>)
  }
}

export default EmptyLayout;
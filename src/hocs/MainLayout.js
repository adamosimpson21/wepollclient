import React, {Component} from 'react';
import NavBar from "./NavBar";
import MessageDisplay from "./MessageDisplay";
import Footer from "./Footer";

class MainLayout extends Component{
  render(){
    return(<div className='App'>
      <NavBar/>
      <div className='app-content'>
        <MessageDisplay />
        {this.props.children}
      </div>
      <Footer/>
    </div>)
  }
}

export default MainLayout;
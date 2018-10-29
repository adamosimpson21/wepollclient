import React, {Component} from 'react'
import './Settings.css';
import MyLoader from "../hocs/Loader";

class Settings extends Component{
  render(){
    return(<div className='settingsBody'>
      <div className='settings-loader'>
      <MyLoader />
      This is the settings Page
      </div>
    </div>)
  }
}

export default Settings;
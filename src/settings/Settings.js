import React, {Component} from 'react'
import './Settings.css';
import Loader from 'react-loader-spinner';


class Settings extends Component{
  render(){
    return(<div className='settingsBody'>
      <div className='settings-loader'>
      {/*<Loader*/}
        {/*type="Circles"*/}
        {/*color="#00BFFF"*/}
        {/*height={200}*/}
        {/*width={100}*/}
      {/*/>*/}
      This is the settings Page
      </div>
    </div>)
  }
}

export default Settings;
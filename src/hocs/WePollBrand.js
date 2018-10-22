import React, {Component} from 'react';
import './WePollBrand.css';
import wepollHeader from '../images/wepollHeader.jpg'

class WePollBrand extends Component{
  render(){
    return(<img src={wepollHeader} alt="We Poll Brand"  className='wepoll-brand'/>)
  }
}

export default WePollBrand;
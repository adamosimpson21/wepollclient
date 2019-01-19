import React, {Component} from 'react';
import './SkipNavigationLink.css';

class SkipNavigationLink extends Component{
  render(){
    return(<a className="skip-main" href={this.props.skipTo}>Skip to main content</a>)
  }
}

export default SkipNavigationLink;
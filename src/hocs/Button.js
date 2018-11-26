import React, {Component} from 'react'
import './Button.css'

class Button extends Component {
  render (){
    const {label, color} = this.props
    const colorTheme = color => {
      switch(color){
      case 'green':
        return 'green-button';
      case 'blue':
        return 'blue-button';
      case 'red':
        return 'red-button';
      case 'yellow':
        return 'yellow-button';
      default:
        return 'blue-button';
    }}

    return (
      <button
        className={`buttonHOC ${colorTheme(color)} ${this.props.classes}`}
        {...this.props}>
        {label}
      </button>
    )
  }
}

export default Button;
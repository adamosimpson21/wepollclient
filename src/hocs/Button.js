import React, {Component} from 'react'
import './Button.css'

class Button extends Component {
  render (){
    const {label, color, classes, pressed} = this.props
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
      case 'frame':
          return 'frame-button';
      default:
        return 'blue-button';
    }}

    return (
      <button
        className={`buttonHOC ${colorTheme(color)} ${classes} ${pressed ? ' pressed' : null}`}
        {...this.props}>
        {label}
      </button>
    )
  }
}

export default Button;
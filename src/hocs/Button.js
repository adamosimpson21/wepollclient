import React, {Component} from 'react'
import './Button.css'

class Button extends Component {
  render (){
    const {label} = this.props
    return (
      <button
        className='buttonHOC'
        {...this.props}>
        {label}
      </button>
    )
  }
}

export default Button;
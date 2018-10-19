import React, {Component} from 'react'
import './ButtonLG.css'

class ButtonLG extends Component {
  render (){
    const {label} = this.props
    return (
      <button
        className='buttonHOCLG'
        {...this.props}>
        {label}
      </button>
    )
  }
}

export default ButtonLG;
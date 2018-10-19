import React, {Component} from 'react'
import './BackFrame.css'

const BackFrame = (WrappedComponent) => {
  class BackFrame extends Component {
    render () {
      return (
        <div className='backFrame'>
          <WrappedComponent
            {...this.props}
          />
        </div>)
    }
  }

  return BackFrame
}

export default BackFrame;
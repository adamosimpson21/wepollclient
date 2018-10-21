import React, {Component} from 'react'
import './ErrorDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import { removeError } from '../store/actions/errors'

class ErrorDisplay extends Component{
  removeError = () => {
    this.props.removeError()
  }
  render(){
    const { errors} = this.props
    if(errors.message!==null){
      return(
        <div className='error-display'>
          {errors.message}
          <button onClick={this.removeError} className='error-display-remove'><strong>X</strong></button>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state){
  return{
    errors:state.errors
  }
}

export default connect(mapStateToProps, {removeError})(withRouter(ErrorDisplay))
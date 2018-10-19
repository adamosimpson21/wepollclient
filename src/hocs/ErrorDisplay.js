import React, {Component} from 'react'
import './ErrorDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import { removeError } from '../store/actions/errors'

class ErrorDisplay extends Component{
  render(){
    const { errors, history, removeError } = this.props

    if(errors.message){
      history.listen(() => {
        removeError();
      });
      return(
        <div className='error-display'>
          {errors.message}
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
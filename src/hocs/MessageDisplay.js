import React, {Component} from 'react'
import './MessageDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import {removeMessage} from "../store/actions/messages";

class MessageDisplay extends Component{
  removeMessage = () => {
    this.props.removeMessage()
  }
  render(){
    const { messages } = this.props
    if(messages.length > 0){
      console.log("Got to message display: ", messages);
      return(
        <div className='message-display'>
          {messages[0].message}
          <button onClick={this.removeMessage} className='message-display-remove'><strong>X</strong></button>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state){
  return{
    messages:state.messages
  }
}

export default connect(mapStateToProps, {removeMessage})(withRouter(MessageDisplay))
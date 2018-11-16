import React, {Component} from 'react'
import './MessageDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import {removeMessage} from "../store/actions/messages";

class MessageDisplay extends Component{
  render(){
    const { messages } = this.props
    if(messages.length > 0){
      const allMessages = messages.map((message, index) => (
        <div className={`message-display message-${message.degree}-style` } key={index}>
          {message.message}
        </div>
      ))
      return(
        <div className='message-display-wrapper'>
          <button onClick={this.props.removeMessage} className='message-display-remove'><strong>X</strong></button>
          {allMessages}
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
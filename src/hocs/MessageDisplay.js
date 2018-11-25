import React, {Component} from 'react'
import './MessageDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import {removeMessage} from "../store/actions/messages";
import { CSSTransitionGroup } from 'react-transition-group'

class MessageDisplay extends Component{
  render(){
    const { messages } = this.props
    if(messages.length > 0){
      const allMessages = messages.map((message, index) => (
        <div className={`message-display message-${message.degree}-style` } key={index}>
          {message.message}
        </div>
      ))
      setTimeout(this.props.removeMessage, 4000);
      return(
        <div className='message-display-wrapper'>
          <CSSTransitionGroup
            transitionName="message-display-transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
          <button onClick={this.props.removeMessage} className='message-display-remove'><strong>X</strong></button>
          {allMessages}
          </CSSTransitionGroup>
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
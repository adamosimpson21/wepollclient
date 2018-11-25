import React, {Component} from 'react'
import './MessageDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import {removeMessage} from "../store/actions/messages";

class MessageDisplay extends Component{
  state={
    showingMessage:true
  }

  fadeMessage = () => {
    this.setState({showingMessage: false})
    setTimeout(this.props.removeMessage, 2000);
    setTimeout(() => this.setState({showingMessage: true}), 2001);
  }

  render(){
    const { messages } = this.props
    const hasMessage = messages.length > 0
    if(hasMessage){
      const allMessages = messages.map((message, index) => (
        <div className={`message-display message-${message.degree}-style` } key={index}>
          {message.message}
        </div>
      ))
      return(
        <div className={`message-display-wrapper ${this.state.showingMessage ? 'message-showing' : 'message-hidden'}`}>
          <button onClick={this.fadeMessage} className='message-display-remove'><strong>X</strong></button>
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
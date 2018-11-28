import React, {Component} from 'react'
import './MessageDisplay.css'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import {removeMessage} from "../store/actions/messages";

class MessageDisplay extends Component{
  state={
    showingMessage:true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.removeMessage();
    }
  }

  fadeMessage = () => {
    this.setState({showingMessage: false})
    setTimeout(this.props.removeMessage, 1500);
    setTimeout(() => this.setState({showingMessage: true}), 1501);
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
      this.state.showingMessage && setTimeout(this.fadeMessage,5000);
      return(
        <div className={`message-display-wrapper ${this.state.showingMessage ? 'message-showing' : 'message-hidden'}`}>
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

export default withRouter(connect(mapStateToProps, {removeMessage})(MessageDisplay))
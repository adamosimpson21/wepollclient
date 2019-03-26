import React, {Component} from 'react'
import './EditQuestion.css';
import withRouter from "react-router/es/withRouter";
import connect from "react-redux/es/connect/connect";
import {addError} from "../../store/actions/errors";
import {removeQuestionAction} from "../../store/actions/questions";
import {changePriorityAction} from "../../store/actions/questions";
import Button from "../../hocs/Button";

class EditQuestion extends Component{
  state={
    priority:undefined
  }

  componentDidMount(){
    this.setState({priority:this.props.question.priority})
  }

  // TODO: implement after specs
  handleEdit = event => {
    event.preventDefault();
  }

  handleDelete = event => {
    event.preventDefault();
    this.props.removeQuestionAction(this.props.match.params.questionId)
    this.props.history.push("/question")
  }

  handleSubmitPriority = event => {
    event.preventDefault();
    this.props.changePriorityAction(this.props.match.params.questionId, this.state.priority);
    this.props.history.push("/question");
  }

  incrementPriority = event => {
    event.preventDefault();
    if(this.state.priority < 9999999){
      this.setState({priority: this.state.priority+1})
    }
  }

  decrementPriority = event => {
    event.preventDefault();
    if(this.state.priority > -9999999){
      this.setState({priority: this.state.priority-1})
    }
  }

  render(){
    const { author } = this.props.question;
    const { isAuthenticated, user } = this.props.currentUser
    if(isAuthenticated && (user._id === author._id || user.authLevel === 'founder')) {
      return (
        <div>{user._id === author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
          { user.authLevel === 'founder' && <label id='question-change-priority'> Sort Priority:
            <input
              type='number'
              name='priority'
              aria-label='Sort Priority'
              title='Sort Priority. Highest #s first. Default 0'
              min={-9999999}
              max={9999999}
              value={this.state.priority}
              readOnly
              required
            />
            <Button classes="increment-priority" label="+" onClick={this.incrementPriority}/>
            <Button classes="decrement-priority" label="-" onClick={this.decrementPriority}/>
            <Button classes="submit-change-priority" label="Submit Priority" onClick={this.handleSubmitPriority} />
          </label>}
          {process.env.REACT_APP_ENV_TYPE === 'development' &&
          <Button color='yellow' onClick={this.handleEdit} label='Edit this Question (Coming Soon)'/>}
          <Button color='red' onClick={this.handleDelete} label='Delete this Question'/>
        </div>)
    } else {
      return null;
    }
  }
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, {addError, removeQuestionAction, changePriorityAction})(EditQuestion));

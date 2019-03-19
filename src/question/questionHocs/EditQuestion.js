import React, {Component} from 'react'
import './EditQuestion.css';
import withRouter from "react-router/es/withRouter";
import connect from "react-redux/es/connect/connect";
import {addError} from "../../store/actions/errors";
import {removeQuestionAction} from "../../store/actions/questions";
import Button from "../../hocs/Button";

class EditQuestion extends Component{
  // TODO: implement after specs
  handleEdit = event => {
    event.preventDefault();
  }

  handleDelete = event => {
    event.preventDefault();
    this.props.removeQuestionAction(this.props.match.params.questionId)
    this.props.history.push("/question")
  }

  render(){
    const { author } = this.props
    const { isAuthenticated, user } = this.props.currentUser
    if(isAuthenticated && (user._id === author._id || user.authLevel === 'founder')) {
      return (
        <div>{user._id === author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
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

export default withRouter(connect(mapStateToProps, {addError, removeQuestionAction})(EditQuestion));

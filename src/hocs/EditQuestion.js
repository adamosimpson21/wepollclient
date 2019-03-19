import React, {Component} from 'react'
import './EditQuestion.css';
import Button from "./Button";
import withRouter from "react-router/es/withRouter";
import connect from "react-redux/es/connect/connect";
import {
  answerQuestionAction,
  getAllQuestions,
  loadOneQuestionAction,
  removeQuestionAction
} from "../store/actions/questions";
import {addError} from "../store/actions/errors";
import BackFrame from "./BackFrame";


class EditQuestion extends Component{
  state={
    isRevealed:false
  }



  render(){
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
    questions: state.questions,
    currentUser: state.currentUser,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction, answerQuestionAction, addError, getAllQuestions})(EditQuestion));
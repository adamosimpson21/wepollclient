import React, {Component} from 'react';
import './QuestionDetails.css'
import { loadOneQuestionAction, removeQuestionAction, answerQuestionAction } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import Link from 'react-router-dom/es/Link'
import BackFrame from "../hocs/BackFrame";
import moment from 'moment';
import {addError} from "../store/actions/errors";
import Loader from 'react-loader-spinner';
import Button from "../hocs/Button";

class QuestionDetails extends Component{
  state={
    heldAnswer: '',
    answerSelected:false
  }

  componentDidMount(){
    const { currentUser, match, history, addError, loadOneQuestionAction } = this.props
    const questionId = match.params.questionId
    if(process.env.REACT_APP_ENV_TYPE!=='development'){
      if(currentUser.isAuthenticated && currentUser.user.questions.includes(questionId)){
        addError("You've answered this question already");
        history.push(`/question/${questionId}/results`)
      }
    }
    loadOneQuestionAction(questionId)
  }

  handleAnswer = event => {
    event.preventDefault();
    this.setState({answerSelected:true, heldAnswer: event.target.value})
  }

  confirmAnswer = event => {
    if(this.state.answerSelected){
      event.preventDefault();
      const {currentUser, answerQuestionAction, match, history, addError} = this.props
      const questionId = match.params.questionId
      if (currentUser.isAuthenticated && !currentUser.user.questions.includes(questionId)) {
        answerQuestionAction(questionId, this.state.heldAnswer)
        history.push(`/question/${questionId}/results`)
      } else if (currentUser.isAuthenticated) {
        addError("You've answered this question already")
        history.push(`/question/${questionId}/results`)
      } else {
        addError("You must be logged in to do that")
        history.push(`/logIn`)
      }
    } else {
      this.setState({answerSelected:true})
    }
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

  render(){
    if(this.props.questions.length === 1){
      const { questionContent, title, author, education, createdAt, xpReward, rating, answers, _id } = this.props.questions[0]
      const { isAuthenticated, user } = this.props.currentUser
      const answerDisplays = answers.map(answer => <div className='answer-display' key={answer}><button onClick={this.handleAnswer} value={answer}>{answer}</button></div>)
      return(<div className='question-answer-form'>
        <div className='question-title'>{title}</div>
        <hr />
        <div className='question-content'>{questionContent}</div>
        <hr />
        <div className='question-education'>{education}</div>
        <hr />
        {answerDisplays}
        {process.env.REACT_APP_ENV_TYPE==='development' && <Link to={`/question/${_id}/results`}>Go to results page (for development)</Link>}

        { this.state.answerSelected && <Button label='Send your ballot' onClick={this.confirmAnswer}/> }

        <div className='question-xpReward'>Answer this Question to get {xpReward} experience and 5 Opinion Points</div>
        <div className='question-history'>This question has a {rating} rating and was created at {moment(createdAt).format("MMMM Do, YYYY")} by {author.username}</div>
        { isAuthenticated && (user._id===author._id || user.authLevel==='founder') && (
          <div>{user._id===author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
            {process.env.REACT_APP_ENV_TYPE==='development' &&  <button onClick={this.handleEdit}>Edit this Question (Not Implemented)</button>}
            <button className='question-delete' onClick={this.handleDelete}>Delete this Question</button>
          </div>
        )}
      </div>)
    } else {
      return(<Loader
          type="Circles"
          color="#00BFFF"
          height={200}
          width={100}
        />)
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

// TODO: write logic to redirect to results page if use has answered question

export default withRouter(connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction, answerQuestionAction, addError})(BackFrame(QuestionDetails)));
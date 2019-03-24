import React, {Component} from 'react';
import './QuestionDetails.css'
import { loadOneQuestionAction, removeQuestionAction, answerQuestionAction, getAllQuestions } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import Link from 'react-router-dom/es/Link'
import BackFrame from "../hocs/BackFrame";
import moment from 'moment';
import {addError} from "../store/actions/errors";
import Button from "../hocs/Button";
import HorizontalLine from "../hocs/HorizontalLine";
import MyLoader from "../hocs/Loader";
import {ballotAnimationDelay} from "../helper/constants";
import EducationEmbed from "./questionHocs/EducationEmbed";
import EditQuestion from "./questionHocs/EditQuestion";
// import {multiAnswer} from "../helper/constants";

class QuestionDetails extends Component{
  state={
    heldAnswer: '',
    answerSelected:false,
    securityLevel: 'private',
    showSecurityInfo: false
  }

  componentDidMount(){
    const { currentUser, match, history, addError, loadOneQuestionAction, questions, getAllQuestions } = this.props
    const questionId = match.params.questionId
    if(questions.length< 1){
      getAllQuestions();
    }
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

  confirmAnswer = (securityLevel, event) => {
    if(this.state.answerSelected){
      event.preventDefault();
      const {currentUser, answerQuestionAction, match, history, addError} = this.props
      const questionId = match.params.questionId
      if (currentUser.isAuthenticated && !currentUser.user.questions.includes(questionId)) {
        answerQuestionAction(questionId, this.state.heldAnswer, securityLevel)
        history.push('/ballotAnimation')
        setTimeout(() => history.push(`/question/${questionId}/results`), ballotAnimationDelay)
      } else if (currentUser.isAuthenticated) {
        addError("You've answered this question already")
        history.push(`/question/${questionId}/results`)
      } else {
        addError("You must be logged in to do that")
        history.push(`/register`)
      }
    } else {
      this.setState({answerSelected:true})
    }
}

  render(){
    if(this.props.questions.length >= 1){
      const foundQuestion = this.props.questions.find(question => question._id===this.props.match.params.questionId);
      if(!foundQuestion){
        this.props.addError("Sorry, couldn't find that question");
        this.props.history.push(`/question`)
      }
      const { questionContent, title, author, education, createdAt, xpReward, rating, answers, _id } = foundQuestion;
      const answerDisplays = answers.map(answer =>  <Button
                                                        key={answer}
                                                        color='green'
                                                        value={answer}
                                                        classes='answer-display'
                                                        onClick={this.handleAnswer}
                                                        checked={this.state.heldAnswer === answer}
                                                        pressed={(this.state.heldAnswer === answer) ? 1 : 0}
                                                        label={answer} />)
      return(<div className='question-answer-form' >
        <div className='question-title'>{title}</div>
        <HorizontalLine />
        <div className='question-content'>{questionContent}</div>
        <HorizontalLine />
        <EducationEmbed education={education}/>
        <HorizontalLine />
        {answerDisplays}
        <HorizontalLine />
        {process.env.REACT_APP_ENV_TYPE==='development' && <Link to={`/question/${_id}/results`}>Go to results page (for development)</Link>}
        { this.state.answerSelected && <div>
        <div className='security-light-wrapper'>
          <Button color='red' label='Send Secret Ballot' onClick={this.confirmAnswer.bind(this, 'secret')} />
          <Button color='yellow' label='Send Private Ballot' onClick={this.confirmAnswer.bind(this, 'private')}/>
          <Button color='green' label='Send Public Ballot' onClick={this.confirmAnswer.bind(this, 'public')}/>
        </div>
          {this.state.showSecurityInfo ? <div className='security-light-info'>
              <div id='ballot-type-secret'>Secret - Top security level, no demographic data or information about the user retained</div>
              <div id='ballot-type-private'>Private - Secure poll response. Carries a link to demographic data that can be accessed later by analytical systems.</div>
              <div id='ballot-type-public'>Public - Secure poll response. Poll question and answer are displayed on a user's public profile page, and carries a link to demographic data that can be accessed later by analytical systems.</div>
              Ballot types in Beta
            </div> :
            <Button label='Learn about Ballot Types' onClick={() => this.setState({showSecurityInfo: true})} />}
        </div>}

        <div className='question-xpReward'>Answer this Question to get {xpReward} experience and 5 Opinion Points</div>
        <div className='question-history'>This question has a {rating} rating and was created at {moment(createdAt).format("MMMM Do, YYYY")} by {author.username}</div>
        <EditQuestion question={foundQuestion} />
      </div>)
    } else {
      return(<MyLoader/>)
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

export default withRouter(connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction, answerQuestionAction, addError, getAllQuestions})(BackFrame(QuestionDetails)));
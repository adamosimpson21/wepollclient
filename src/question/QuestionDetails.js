import React, {Component} from 'react';
import './QuestionDetails.css'
import { loadOneQuestionAction, removeQuestionAction, answerQuestionAction } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'
import withRouter from 'react-router/es/withRouter'
import Link from 'react-router-dom/es/Link'

class QuestionDetails extends Component{
  componentDidMount(){
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  handleAnswer = event => {
    event.preventDefault();
    this.props.answerQuestionAction(this.props.match.params.questionId, event.target.value)
    this.props.history.push(`/question/${this.props.match.params.questionId}/results`)
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
    if(this.props.questions[0]){
      const { questionContent, description, title, author, education, createdAt, xpReward, rating, answers, _id } = this.props.questions[0]
      const { isAuthenticated, user } = this.props.currentUser
      const answerDisplays = answers.map(answer => (
        <div className='answer-display' key={answer}><button onClick={this.handleAnswer} value={answer}>{answer}</button></div>
      ))
      return(<div>
        <div className='question-title'>{title}</div>
        <div className='question-title'>{questionContent}</div>
        <div className='question-title'>{education}</div>
        <div className='question-title'>{description}</div>
        {answerDisplays}
        {process.env.NODE_ENV==='development' && <div><Link to={'/question/'+_id + '/results'}>Go to results page (for development)</Link></div>}
        <div className='question-title'>Answer this Question to get {xpReward} experience</div>
        <div className='question-title'>This question has a {rating} rating and was created at {createdAt} by {author.username}</div>
        { isAuthenticated && (user._id===author._id || user.authLevel==='founder') && (
          <div>{user._id===author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
            {process.env.NODE_ENV==='development' &&  <button onClick={this.handleEdit}>Edit this Question (Not Implemented)</button>}
            <button onClick={this.handleDelete}>Delete this Question</button>
          </div>
        )}
      </div>)
    } else {
      return(<div>Question loading...</div>)
    }

  }
}

function mapStateToProps(state){
  return{
    questions: state.questions,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction, answerQuestionAction})(withRouter(QuestionDetails));
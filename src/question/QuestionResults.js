import React, {Component} from 'react';
import './QuestionResults.css';
import connect from 'react-redux/es/connect/connect'
import { loadOneQuestionAction, removeQuestionAction } from '../store/actions/questions'
import withRouter from 'react-router/es/withRouter'

class QuestionResults extends Component{
  componentDidMount(){
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  countResults = (answers, results) => {
    // This is to prevent answers that don't appear in the question from appearing (old data most likely)
    let resultsObj = {};
    answers.forEach(answer => {
      resultsObj[answer] = 0
    })
    results.forEach(result => {
      if(resultsObj[result.answer]!==null){
        ++resultsObj[result.answer]
      }
    })
    return resultsObj;
  }

  render() {
    if(this.props.questions[0]){
      const { questionContent, description, title, author, education, results, createdAt, xpReward, rating, answers, _id } = this.props.questions[0]
      const { isAuthenticated, user } = this.props.currentUser
      let resultsObj = this.countResults(answers, results);
      const answerDisplays = answers.map(answer => (
        <div className='answer-display' key={answer}>{answer} : {resultsObj[answer]}</div>
      ))

      return(<div>
        <div className='question-title'>{title}</div>
        <div className='question-title'>{questionContent}</div>
        <div className='question-title'>{education}</div>
        <div className='question-title'>{description}</div>
        {answerDisplays}
        <div className='question-title'>This question has a {rating} rating and was created at {createdAt} by {author.username}</div>
        { isAuthenticated && (user._id===author._id || user.authLevel==='founder') && (
          <div>You wrote this!
            <button onClick={this.handleEdit}>Edit this Question (Not Implemented)</button>
            <button onClick={this.handleDelete}>Delete this Question</button>
          </div>
        )}
      </div>)
    } else {
      return(<div>Loading Question...</div>)
    }

  }
}


function mapStateToProps(state){
  return{
    questions: state.questions,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction})(withRouter(QuestionResults));

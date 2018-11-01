import React, {Component} from 'react';
import './QuestionResults.css';
import connect from 'react-redux/es/connect/connect'
import { loadOneQuestionAction, removeQuestionAction } from '../store/actions/questions'
import withRouter from 'react-router/es/withRouter'
import BackFrame from "../hocs/BackFrame";
import moment from "moment";
import withAuth from "../hocs/withAuth";
import Loader from 'react-loader-spinner';
import QuestionResultsVisualization from "./QuestionResultsVisualization";

class QuestionResults extends Component{
  componentDidMount(){
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  countResults = (answers, results) => {
    // This is to prevent answers that don't appear in the question from appearing (old data most likely)
    let resultsObj = {};
    answers.forEach(answer => resultsObj[answer] = 0);
    results.forEach(result => Number.isInteger(resultsObj[result.answer]) ? ++resultsObj[result.answer] : null );
    return resultsObj;
  }


  render() {
    if(this.props.questions.length === 1){
      const { questionContent, title, author, education, results, createdAt, rating, answers } = this.props.questions[0];
      const { isAuthenticated, user } = this.props.currentUser;
      let resultsObj = this.countResults(answers, results);
      const answerDisplays = answers.map(answer => <div className='answer-display' key={answer}>{answer} : {resultsObj[answer]}</div>);
      return(<div className='question-results'>
        <div className='question-title'>{title}</div>
        <div className='question-content'>{questionContent}</div>
        <div className='question-education'>{education}</div>
        {answerDisplays}
        <div className='question-history'>This question has a {rating} rating and was created at {moment(createdAt).format("MMMM Do, YYYY")} by {author.username}</div>
        {/* Founders and authors have access to editing and deleting */}
        { isAuthenticated && (user._id===author._id || user.authLevel==='founder') && (
          <div>{user._id===author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
            {process.env.REACT_APP_ENV_TYPE==='development' &&  <button onClick={this.handleEdit}>Edit this Question (Not Implemented)</button>}
            <button className='question-delete' onClick={this.handleDelete}>Delete this Question</button>
          </div>
        )}
        <QuestionResultsVisualization results={results} answers={answers}/>
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
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction})(withAuth(BackFrame(QuestionResults))));

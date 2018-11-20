import React, {Component} from 'react';
import './QuestionResults.css';
import connect from 'react-redux/es/connect/connect'
import { loadOneQuestionAction, removeQuestionAction } from '../store/actions/questions'
import withRouter from 'react-router/es/withRouter'
import BackFrame from "../hocs/BackFrame";
import moment from "moment";
import withAuth from "../hocs/withAuth";
import QuestionResultsVisualization from "./QuestionResultsVisualization";
import HorizontalLine from "../hocs/HorizontalLine";
import Link from "react-router-dom/es/Link";
import Button from "../hocs/Button";
import MyLoader from "../hocs/Loader";

class QuestionResults extends Component{
  componentDidMount(){
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  render() {
    if(this.props.questions.length >= 1){
      const { questionContent, title, author, education, results, createdAt, rating, answers } = this.props.questions.find(question => question._id===this.props.match.params.questionId);
      const { isAuthenticated, user } = this.props.currentUser;
      return(<div className='question-results'>
        <div className='question-title'>{title}</div>
        <HorizontalLine />
        <div className='question-content'>{questionContent}</div>
        <HorizontalLine />
        <div className='question-education'>{education}</div>
        <HorizontalLine />
        <Link to='/question'><Button label='Questions Page'/></Link>
        <div className='question-history'>This question has a {rating} rating and was created at {moment(createdAt).format("MMMM Do, YYYY")} by {author.username}</div>
        {/* Founders and authors have access to editing and deleting */}
        { isAuthenticated && (user._id===author._id || user.authLevel==='founder') && (
          <div className='question-results-edit'>{user._id===author._id ? <div>You wrote this!</div> : <div>You have founder privileges to do this</div>}
            {process.env.REACT_APP_ENV_TYPE==='development' &&  <Button onClick={this.handleEdit} color='yellow' label='Edit this Question (Not Implemented)' />}
            <Button onClick={this.handleDelete} label='Delete this Poll' color='red'/>
          </div>
        )}
        <QuestionResultsVisualization results={results} answers={answers}/>
      </div>)
    } else {
      return(<MyLoader />)
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

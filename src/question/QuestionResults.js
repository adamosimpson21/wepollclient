import React, {Component} from 'react';
import './QuestionResults.css';
import connect from 'react-redux/es/connect/connect'
import { loadOneQuestionAction, removeQuestionAction, getAllQuestions } from '../store/actions/questions'
import withRouter from 'react-router/es/withRouter'
import BackFrame from "../hocs/BackFrame";
import moment from "moment";
import withAuth from "../hocs/withAuth";
import QuestionResultsVisualization from "./QuestionResultsVisualization";
import HorizontalLine from "../hocs/HorizontalLine";
import Link from "react-router-dom/es/Link";
import Button from "../hocs/Button";
import MyLoader from "../hocs/Loader";
import EducationEmbed from "./questionHocs/EducationEmbed";
import EditQuestion from "./questionHocs/EditQuestion";

class QuestionResults extends Component{
  componentDidMount(){
    if(this.props.questions.length < 1){
      this.props.getAllQuestions();
    }
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  handleDelete = event => {
    event.preventDefault();
    this.props.removeQuestionAction(this.props.match.params.questionId)
    this.props.history.push("/question")
  }

  render() {
    if(this.props.questions.length >= 1 && this.props.currentUser.isAuthenticated){
      const { questionContent, title, author, education, results, createdAt, rating, answers, _id } = this.props.questions.find(question => question._id===this.props.match.params.questionId);
      const { user } = this.props.currentUser;
      const hasNotAnswered = this.props.questions.filter(question => !user.questions.includes(question._id)).filter(question => question._id !== _id)
      const randomQuestion = hasNotAnswered.length > 0 ? hasNotAnswered[Math.floor((Math.random()*hasNotAnswered.length))] : false
      return(<div className='question-results'>
        <div className='question-title'>{title}</div>
        <HorizontalLine />
        <div className='question-content'>{questionContent}</div>
        <HorizontalLine />
        <EducationEmbed education={education}/>
        <HorizontalLine />
        {randomQuestion && <Link to={'/question/' + randomQuestion._id}><Button label='Next Question'/></Link>}
        <Link to='/question'><Button label='Questions Page'/></Link>
        <div className='question-history'>This question has a {rating} rating and was created at {moment(createdAt).format("MMMM Do, YYYY")} by {author.username}</div>
        <EditQuestion author={author} />
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

export default withRouter(connect(mapStateToProps, {loadOneQuestionAction, removeQuestionAction, getAllQuestions})(withAuth(BackFrame(QuestionResults))));

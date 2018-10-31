import React, {Component} from 'react';
import './QuestionResults.css';
import connect from 'react-redux/es/connect/connect'
import { loadOneQuestionAction, removeQuestionAction } from '../store/actions/questions'
import withRouter from 'react-router/es/withRouter'
import BackFrame from "../hocs/BackFrame";
import moment from "moment";
import withAuth from "../hocs/withAuth";
import Loader from 'react-loader-spinner';
import PieChart from "../visualization/PieChart";
import Histogram from "../visualization/Histogram";
import Button from "../hocs/Button";

class QuestionResults extends Component{
  defaultState={
    vizType:'histogram',
    age:0,
    familySize:0,
    gender:'All',
    income:0,
    location:'All',
    race:'All'
  }

  state=this.defaultState


  componentDidMount(){
    this.props.loadOneQuestionAction(this.props.match.params.questionId)
  }

  // filters results my current state, which indicates what the user is filtering by
  dataFilter = result => {

  }

  countResults = (answers, results) => {
    // This is to prevent answers that don't appear in the question from appearing (old data most likely)
    let resultsObj = {};
    answers.forEach(answer => resultsObj[answer] = 0);
    results.forEach(result => Number.isInteger(resultsObj[result.answer]) ? ++resultsObj[result.answer] : null );
    return resultsObj;
  }

  toDataArray = object => {
    return Object.keys(object).map(key => ({answer:key, count:object[key]})  )
  }

  render() {
    if(this.props.questions.length === 1){
      const { questionContent, title, author, education, results, createdAt, rating, answers } = this.props.questions[0];
      const { isAuthenticated, user } = this.props.currentUser;
      const height = 500;
      const width = 500;
      const filteredResults = results.filter(this.dataFilter);
      let resultsObj = this.countResults(answers, results);
      const visualizationData = this.toDataArray(resultsObj)
      console.log("results are: ", results);
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
        <Button label='Pie Chart' onClick={() => this.setState({vizType:'pie'})}/><Button label='Bar Chart' onClick={() => this.setState({vizType:'histogram'})}/>
        {this.state.vizType==='pie' && <PieChart data={visualizationData} height={height} width={width} outerRadius={200} innerRadius={10}  cornerRadius={12}/>}
        {this.state.vizType==='histogram' && <Histogram data={visualizationData} height={height} width={width} />}

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

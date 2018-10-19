import React, {Component} from 'react';
import './QuestionTitle.css'
import Link from 'react-router-dom/es/Link';
import BackFrame from '../hocs/BackFrame'

class QuestionTitle extends Component{
  render(){
    return(<div className='question-title'>
      <h2>Look at all of these cool questions you can answer!</h2>
      <h5>You've answered all of the questions already? Why not create your own?</h5>
      <Link to="/newQuestionForm" >Create a new Question</Link>
    </div>)
  }
}

export default BackFrame(QuestionTitle);
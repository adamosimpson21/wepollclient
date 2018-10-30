import React, {Component} from 'react';
import './QuestionTitle.css'
import Link from 'react-router-dom/es/Link';
import BackFrame from '../hocs/BackFrame'
import Button from "../hocs/Button";

class QuestionTitle extends Component{
  render(){
    return(<div className='question-title'>
      <h2 >Represent yourself by answering the polls below!</h2>
      <Link to="/newQuestionForm" className='question-new-form-link'><Button label='Want to ask a different question? Create a poll here!'/></Link>
    </div>)
  }
}

export default BackFrame(QuestionTitle);
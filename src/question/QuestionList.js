import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'

class QuestionList extends Component{
  render(){
    const { questions } = this.props
    if(questions.length > 0){
      const allQuestions = questions.map(question => (
        <div className='question-thumbnail' key={question._id} >
          <p>{question.title}</p>
          <p>{question.description}</p>
          <Link to={'/question/'+question._id}>Answer this question</Link>
        </div>
      ))
      return(<div>{allQuestions}</div>)
    } else {
      return(<div>Questions Loading...</div>)
    }
  }
}

export default QuestionList;

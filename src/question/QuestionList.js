import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'
import Button from "../hocs/Button";
import Loader from "react-loader-spinner";

class QuestionList extends Component{
  render(){
    const { questions } = this.props
    if(questions.length > 0){
      const allQuestions = questions.map(question => (
        <div className='question-thumbnail' key={question._id} >
          <p>{question.title}</p>
          <p>{question.description}</p>
          <Link to={'/question/'+question._id}><Button label='Check it out' /></Link>
        </div>
      ))
      return(<div className='question-list'>{allQuestions}</div>)
    } else {
      return(<div>
          <Loader
            type="Circles"
            color="#00BFFF"
            height={200}
            width={100}
          />
      </div>)
    }
  }
}



export default QuestionList;

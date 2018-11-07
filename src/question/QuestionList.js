import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'
import Button from "../hocs/Button";
import Loader from "react-loader-spinner";
import Icon from '../hocs/Icon'

class QuestionList extends Component{
  render(){
    const { questions, currentUser } = this.props
    if(questions.length > 0){
      const allQuestions = questions.map(question => (
        <div className='question-thumbnail-wrapper'>
          <div className='question-thumbnail' key={question._id} >
            {(currentUser.isAuthenticated && currentUser.user.questions.includes(question._id)) && <div>Answered<Icon icon='success' viewBox='0 0 1028 1028' height='48px' width='48px'/></div>}
            <p>{question.title.length>75 ? question.title.slice(0, 75).concat('...') : question.title}</p>
            <p>{question.description.length>75 ? question.description.slice(0, 75).concat('...') : question.description}</p>
            {(currentUser.isAuthenticated && currentUser.user.questions.includes(question._id)) ? <Link to={`/question/${question._id}/results`}><Button label='See current tally' /></Link>
              : <Link to={'/question/'+question._id}><Button label='Check it out' /></Link>}
          </div>
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

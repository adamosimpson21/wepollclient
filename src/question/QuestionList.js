import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'
import Button from "../hocs/Button";
import Loader from "react-loader-spinner";
import Icon from '../hocs/Icon'

class QuestionList extends Component{
  sortByDate = (a,b) => new Date(a.createdAt) - new Date(b.createdAt);

  firstQuestionFirst = (acc, element) => {
    if (element._id === '5bcd6e9fcef9fb37f8a72866' || element._id ==='5be3fbd45b0efc405424316c') {
      return [element, ...acc];
    }
    return [...acc, element];
  }

  render(){
    const { questions, currentUser } = this.props
    const firstQId = process.env.REACT_APP_ENV_TYPE==='development' ? '5be3fbd45b0efc405424316c' : '5bcd6e9fcef9fb37f8a72866'

    if(questions.length > 0){
      const allQuestions = questions.sort(this.sortByDate).reduce(this.firstQuestionFirst, []).map(question => {
        const hasAnswered = currentUser.isAuthenticated && currentUser.user.questions.includes(question._id)
        return(<div className='question-thumbnail-wrapper' key={question._id}>
          <div className={'question-thumbnail ' + (question._id === firstQId && !hasAnswered ? ' first-question-thumbnail' : '')}>
            {hasAnswered && <div>Answered<Icon icon='success' viewBox='0 0 1028 1028' height='48px' width='48px'/></div>}
            <p>{question.title.length > 75 ? question.title.slice(0, 75).concat('...') : question.title}</p>
            <p>{question.description.length > 75 ? question.description.slice(0, 75).concat('...') : question.description}</p>
            {hasAnswered ?
              <Link to={`/question/${question._id}/results`}>
                <Button label='See current tally'/>
              </Link>
              : <Link to={'/question/' + question._id}>
                  <Button label='Check it out'/>
                </Link>}
          </div>
        </div>
        )})
      return(<div className='question-list'>
              {allQuestions}
            </div>)
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

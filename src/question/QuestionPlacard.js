import React, {Component} from 'react';
import Icon from "../hocs/Icon";
import HorizontalLine from "../hocs/HorizontalLine";
import Link from "react-router-dom/es/Link";
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";
import './QuestionPlacard.css'

class QuestionPlacard extends Component{
  render() {
    const {currentUser, question} = this.props
    const firstQId = process.env.REACT_APP_ENV_TYPE === 'development' ? '5be3fbd45b0efc405424316c' : '5bcd6e9fcef9fb37f8a72866'
    const hasAnswered = currentUser.isAuthenticated && currentUser.user.questions.includes(question._id)
    const isPopular = question.results.length >= 10;
    const isHighlyRated = question.rating > 90;
    const twoWeeksInMilliseconds = 1.21e+9;
    const isTrending = (Date.parse(question.createdAt) + twoWeeksInMilliseconds) > Date.now();
    return (<div className='question-thumbnail-wrapper'>
        <div className={'question-thumbnail ' + (question._id === firstQId && !hasAnswered ? ' first-question-thumbnail' : '')}>
          {hasAnswered && <div>Answered<Icon icon='success' viewBox='0 0 1028 1028' height='48px' width='48px'/></div>}
          <p
            className='question-thumbnail-title'>{question.title.length > 75 ? question.title.slice(0, 75).concat('...') : question.title}</p>
          {isPopular && <div>Popular</div>}
          {isHighlyRated && <div>Highly Rated</div>}
          {isTrending && <div>Trending</div>}
          <HorizontalLine/>
          <p
            className='question-thumbnail-description'>{question.description.length > 75 ? question.description.slice(0, 75).concat('...') : question.description}</p>
          {hasAnswered ?
            <Link to={`/question/${question._id}/results`}>
              <Button label='See current tally'/>
            </Link>
            : <Link to={'/question/' + question._id}>
              <Button label='Check it out'/>
            </Link>}
        </div>
      </div>
    )
  }
}

export default withRouter(QuestionPlacard);
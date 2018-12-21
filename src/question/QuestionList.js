import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'
import Button from "../hocs/Button";
import Icon from '../hocs/Icon'
import {handleChange} from "../helper/handleChange";
import MyLoader from "../hocs/Loader";
import withRouter from "react-router/es/withRouter";

class QuestionList extends Component{
  state={
    searchText: '',
    sortBarVisible: false,
    sortType: 'popular',
    ascending: true
  }

  sortByDate = (a,b) =>  (new Date(a.createdAt) - new Date(b.createdAt))*(this.state.ascending ? 1 : -1);
  sortByRating = (a,b) => (b.rating - a.rating)*(this.state.ascending ? 1 : -1);
  sortByPopular = (a,b) => (b.results.length - a.results.length)*(this.state.ascending ? 1 : -1);
  sortByReward = (a,b) => (b.xpReward - a.xpReward)*(this.state.ascending ? 1 : -1);

  sortQuestions = () => {
    switch(this.state.sortType) {
      case 'date':
        return this.sortByDate;
      case 'rating':
        return this.sortByRating;
      case 'popular':
        return this.sortByPopular;
      case 'reward':
        return this.sortByReward;
      default:
        return this.sortByDate;
    }
  }

  filterQuestions = question => {
    // TODO: naive approach, refine later
    const searchText = this.state.searchText.toLowerCase()
    if(searchText.length <= 1) return true;
    return question.title.toLowerCase().includes(searchText) ||
      question.description.toLowerCase().includes(searchText) ||
      question.questionContent.toLowerCase().includes(searchText) ||
      question.education.toLowerCase().includes(searchText) ||
      question.answers.includes(searchText);
  }

  firstQuestionFirst = (acc, element) => {
    if (element._id === '5bcd6e9fcef9fb37f8a72866' || element._id ==='5be3fbd45b0efc405424316c') {
      return [element, ...acc];
    }
    return [...acc, element];
  }

  questionPlacard = question => {
    const { currentUser} = this.props
    const firstQId = process.env.REACT_APP_ENV_TYPE==='development' ? '5be3fbd45b0efc405424316c' : '5bcd6e9fcef9fb37f8a72866'
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
    )
  }

  render(){
    const { questions } = this.props
    const searchBar = (<div className='question-search-bar'>
      <Icon icon='search' viewBox='0 0 310.42 310.42'/>
      <input
        type='text'
        name='searchText'
        aria-label='Search for questions'
        title='Search for questions'
        value={this.state.searchText}
        onChange = {handleChange.bind(this)}
      />
    </div>)
    const sortBar = (<div className='question-sort-bar'>
      <label> Ascending?
        <input
          name='ascending'
          type='checkbox'
          value={this.state.ascending}
          onChange={handleChange.bind(this)}
          defaultChecked={true}
        />
      </label>
      <label> Sort By
        <input
          type='radio'
        />
      </label>
    </div>)
    if(questions.length > 0){
      const allQuestions = questions.filter(this.filterQuestions)
                                    .reduce(this.firstQuestionFirst, [])
                                    .sort(this.sortQuestions())
                                    .map(this.questionPlacard)
      if(allQuestions.length >= 1){
        return(<div className='question-list-search-bar-wrapper'>
          {searchBar}
          {this.state.sortBarVisible ? sortBar : <Button label='View Sort Options' onClick={() => this.setState({sortBarVisible:true})}/>}
          <div className='question-list'>
            {allQuestions}
          </div>
        </div>)
      } else {
        // Questions have loaded, but all have been filtered out
        return(<div className='question-list-search-bar-wrapper'>
          {searchBar}
          <div className='question-list-empty-set'>
            <p>No polls matching that search</p>
            <Link to="/newQuestionForm" className='question-new-form-link'><Button label={`Create a ${this.state.searchText} poll`}/></Link>
          </div>
        </div>)
      }
    } else {
      return(<MyLoader />)
    }
  }
}



export default withRouter(QuestionList);

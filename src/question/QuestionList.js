import React, {Component} from 'react';
import './QuestionList.css'
import Link from 'react-router-dom/es/Link'
import Button from "../hocs/Button";
import Icon from '../hocs/Icon'
import {handleChange} from "../helper/handleChange";
import MyLoader from "../hocs/Loader";
import withRouter from "react-router/es/withRouter";
import HorizontalLine from "../hocs/HorizontalLine";
import QuestionPlacard from "./QuestionPlacard";

class QuestionList extends Component{
  state={
    searchText: '',
    sortBarVisible: false,
    sortType: 'date',
    showAnswered: true,
    showUnAnswered: true,
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
      question.education.toLowerCase().includes(searchText);
  }

  filterAnswered = question => {
    let {showAnswered, showUnAnswered} = this.state
    if(showAnswered && showUnAnswered) return true
    const hasAnswered = (this.props.currentUser.isAuthenticated && this.props.currentUser.user.questions.includes(question._id))
    if(showAnswered || showUnAnswered) {
      return (hasAnswered && showAnswered) || (!hasAnswered && showUnAnswered)
    } else {
      return false
    }
  }

  firstQuestionFirst = (acc, element) => {
    if (element._id === '5c8824b1bc6da00004b8d746' || element._id ==='5be3fbd45b0efc405424316c') {
      return [element, ...acc];
    }
    return [...acc, element];
  }

  handleRadio = event => {
    this.setState({ sortType: event.target.value })
  }

  sortBar = () => {
    return(<div className='question-sort-bar'>
      <div className='sort-bar-top'>
    <span className='sort-bar-wrapper'>Answered
      <label className='sort-bar-label'>
        <input
          className='sort-bar-checkbox'
          name='showAnswered'
          key='showAnswered'
          type='checkbox'
          value={this.state.showAnswered}
          checked={this.state.showAnswered}
          onChange={handleChange.bind(this)}
        />
        <span className="sort-bar-slider" />
      </label>
    </span>
        <span className='sort-bar-wrapper'>UnAnswered
      <label className='sort-bar-label'>
        <input
          className='sort-bar-checkbox'
          name='showUnAnswered'
          key='showUnAnswered'
          type='checkbox'
          value={this.state.showUnAnswered}
          checked={this.state.showUnAnswered}
          onChange={handleChange.bind(this)}
        />
        <span className="sort-bar-slider" />
      </label>
    </span>
        <span className='sort-bar-wrapper'>Ascending
      <label className='sort-bar-label'>
        <input
          className='sort-bar-checkbox'
          name='ascending'
          key='ascending'
          type='checkbox'
          value={this.state.ascending}
          checked={this.state.ascending}
          onChange={handleChange.bind(this)}
        />
        <span className="sort-bar-slider" />
      </label>
    </span>
        <Button label='X' color='red' classes='question-sort-bar-close' onClick={() =>  this.setState({sortBarVisible:false})} />
      </div>
      <HorizontalLine/>
      <div className='sort-bar-bottom'>
        <input
          id='date'
          type='radio'
          name='sortBy'
          value='date'
          checked={this.state.sortType==='date'}
          onChange = {this.handleRadio}
        />
        <label htmlFor='date' className='radio-label'>Date</label>
        <input
          id='popular'
          type='radio'
          name='sortBy'
          value='popular'
          checked={this.state.sortType==='popular'}
          onChange = {this.handleRadio}
        />
        <label htmlFor='popular' className='radio-label'>Popular</label>
        <input
          id='rewards'
          type='radio'
          name='sortBy'
          value='rewards'
          checked={this.state.sortType==='rewards'}
          onChange = {this.handleRadio}
        />
        <label htmlFor='rewards' className='radio-label'>Rewards</label>
        <input
          id='rating'
          type='radio'
          name='sortBy'
          value='rating'
          checked={this.state.sortType==='rating'}
          onChange = {this.handleRadio}
        />
        <label htmlFor='rating' className='radio-label'>Rating</label>
      </div>
    </div>)
  }

  searchBar = () => {
    return(<div className='question-search-bar'>
    <Icon icon='search' viewBox='0 0 310.42 310.42'/>
    <input
      type='text'
      name='searchText'
      aria-label='Search for questions'
      title='Search for questions'
      value={this.state.searchText}
      onChange = {handleChange.bind(this)}
    />
  </div>)}

  render(){
    const { questions } = this.props
    if(questions.length > 0){
      const allQuestions = questions.filter(this.filterQuestions)
                                    .filter(this.filterAnswered)
                                    .sort(this.sortQuestions())
                                    .reduce(this.firstQuestionFirst, [])
                                    .map(question => <QuestionPlacard question={question} key={question._id} currentUser={this.props.currentUser}/>)
      return(<div className='question-list-search-bar-wrapper'>
        {this.searchBar.bind(this)()}
        {this.state.sortBarVisible ? this.sortBar.bind(this)() : <Button label='Sort Options' classes='view-sort-menu-button' onClick={() => this.setState({sortBarVisible:true})}/>}
        {allQuestions.length >= 1 ?
        (<div className='question-list'>{allQuestions}</div>) :
        // Questions have loaded, but all have been filtered out
        (<div className='question-list question-list-empty-set'>
          <p>No polls matching that search</p>
          <Link to="/newQuestionForm" className='question-new-form-link'><Button label={`Create a ${this.state.searchText} poll`}/></Link>
        </div>)}
      </div>)
    } else {
      // Questions haven't loaded
      return(<MyLoader />)
    }
  }
}



export default withRouter(QuestionList);

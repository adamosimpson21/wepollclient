import React, {Component} from 'react'
import './Question.css'
import {getAllQuestions} from '../store/actions/questions'
import QuestionTitle from './QuestionTitle'
import QuestionList from './QuestionList'
import connect from 'react-redux/es/connect/connect'
import {handleChange} from "../helper/handleChange";
import Icon from "../hocs/Icon";

class Question extends Component{
  state={
    searchText: ''
  }

  componentDidMount(){
    this.props.getAllQuestions();
  }

  filterQuestions = question => {
    const searchText = this.state.searchText.toLowerCase()
    return question.title.toLowerCase().includes(searchText) ||
           question.description.toLowerCase().includes(searchText) ||
           question.questionContent.toLowerCase().includes(searchText) ||
           question.education.toLowerCase().includes(searchText) ||
           question.answers.includes(searchText);
  }

  render(){
    const { questions, currentUser } = this.props
    const {searchText} = this.state
    return(<div>
      <QuestionTitle />
      <div  className='question-search-bar'>
      <Icon icon='search' viewBox='0 0 310.42 310.42'/>
        <input
          type='text'
          name='searchText'
          aria-label='Search for questions'
          title='Search for questions'
          value={this.state.searchText}
          onChange = {handleChange.bind(this)}
        />
      </div>
      <QuestionList questions={searchText.length > 2 ? questions.filter(this.filterQuestions) : questions} currentUser={currentUser} />
    </div>)
  }
}


function mapStateToProps(state){
  return {
    questions:state.questions,
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps, {getAllQuestions})(Question);
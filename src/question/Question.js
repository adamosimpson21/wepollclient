import React, {Component} from 'react'
import './Question.css'
import {getAllQuestions} from '../store/actions/questions'
import QuestionTitle from './QuestionTitle'
import QuestionList from './QuestionList'
import connect from 'react-redux/es/connect/connect'

class Question extends Component{
  componentDidMount(){
    this.props.getAllQuestions();
  }

  render(){
    const { questions, currentUser } = this.props
    return(<div>
      <QuestionTitle />
      <QuestionList questions={questions} currentUser={currentUser} />
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
import React, {Component} from 'react';
import './NewQuestionForm.css'
import { postQuestion } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'

class NewQuestionForm extends Component{
  constructor(props){
    super(props)
    this.state = this.defaultState
  }

  defaultState = {
    questionContent: '',
    title:'',
    description:'',
    education:'',
    numAnswers:3
  }


  handleSubmit = event => {
    event.preventDefault()
    // TODO: Can this be refactored to reduce or map?
    let answers = []
    for(let i = 0; i<this.state.numAnswers; i++){
      // TODO: there has to be a better way to access answer1, answer2, answer3, etc.
      answers.push(this.state['answer' + (i+1)])
    }
    const { questionContent, title, description, education } = this.state
    this.props.postQuestion({questionContent, title, description, education, answers})
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  }

  render(){
    // TODO: refactor this? Currently works, but there's probably a better way to do it? reduce?
    let answerInputs = [];
    for(let index = 0; index<this.state.numAnswers; index++){
      answerInputs.push(<label key={index}> Answer {index+1}:
        <input
          type='text'
           //TODO: understand and research the implications of setState on states that weren't in the initial constructor
          name={`answer${index+1}`}
          aria-label={`Answer #${index+1}`}
          value={this.state.answers}
          onChange = {this.handleChange}
          required
        />
      </label>)
    }


    return(<div className='new-question-form'>
      <form onSubmit={this.handleSubmit}>
        <label> Question:
          <input
            type='text'
            name='questionContent'
            aria-label='Your Question'
            value={this.state.questionContent}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label> Title:
          <input
            type='text'
            name='title'
            aria-label='Short title'
            value={this.state.title}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label> Description:
          <input
            type='text'
            name='description'
            aria-label='Detailed Description'
            value={this.state.description}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label> Education:
          <input
            type='text'
            name='education'
            aria-label='An Educational Resource to teach others about possible answers'
            value={this.state.education}
            onChange = {this.handleChange}
            required
          />
        </label>
        {/* TODO: Implement tags */}
        { process.env.REACT_APP_ENV_TYPE ==='development' &&
        <label> Tags:
          <input
            type='text'
            name='tags'
            aria-label='Keywords to search for'
            value='Not Implemented yet'
            onChange = {this.handleChange}
          />
        </label> }
        <label> Number of Answers:
          <input
            type='number'
            name='numAnswers'
            aria-label='An Educational Resource to teach others about possible answers'
            value={this.state.numAnswers}
            onChange = {this.handleChange}
            required
          />
        </label>
        <br />
        {answerInputs}
        <button type="submit">Create this Question</button>
      </form>
    </div>)
  }
}

export default connect(null, {postQuestion})(NewQuestionForm);
import React, {Component} from 'react';
import './NewQuestionForm.css'
import { postQuestion } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";

class NewQuestionForm extends Component{
  defaultState = {
    questionContent: '',
    title:'',
    description:'',
    education:'',
    numAnswers:3
  }

  state = this.defaultState


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
    this.props.history.push('/question')
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
          title={`Answer #${index+1}`}
          value={this.state.answers}
          onChange = {this.handleChange}
          required
        />
      </label>)
    }


    return(<div>
      <form onSubmit={this.handleSubmit} className='new-question-form'>
        <h2>Fill out the form below to create a new question on WePoll.</h2>
        <h4> After you successfully submit, it will appear at the bottom of the page (you may have to scroll down)</h4>
        <label> Question:
          <input
            type='text'
            name='questionContent'
            aria-label='Your Question'
            title='Your Question'
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
            title='Short title'
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
            title='Detailed Description'
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
            title='An Educational Resource to teach others about possible answers'
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
            title='Keywords to search for'
            value='Not Implemented yet'
            onChange = {this.handleChange}
          />
        </label> }
        <label id='question-form-number-of-answers'> Number of Answers:
          <input
            type='number'
            name='numAnswers'
            aria-label='Number of Answers'
            title='Number of Answers, minimum 2, maximum 20'
            min={2}
            max={20}
            value={this.state.numAnswers}
            onChange = {this.handleChange}
            required
          />
        </label>
        {answerInputs}
        <Button label='Create this Question' type="submit" />
      </form>
    </div>)
  }
}

export default withRouter(connect(null, {postQuestion})(NewQuestionForm));
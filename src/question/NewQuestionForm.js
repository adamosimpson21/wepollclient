import React, {Component} from 'react';
import './NewQuestionForm.css'
import { postQuestion } from '../store/actions/questions'
import connect from 'react-redux/es/connect/connect'
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";
import {handleChange} from "../helper/handleChange";
import {addError} from "../store/actions/errors";
import {addMessage} from "../store/actions/messages";

class NewQuestionForm extends Component{
  defaultState = {
    questionContent: '',
    title:'',
    description:'',
    education:'',
    answerType:'single',
    numAnswers:3
  }

  state = this.defaultState

  handleSubmit = event => {
    event.preventDefault()
    const answers = new Array(parseInt(this.state.numAnswers, 10)).fill('').map((old, index) => this.state['answer' + (index+1)])
    // Check if Answers are the same string
    const distinctAnswers = [...new Set(answers)];
    if(answers.length !== distinctAnswers.length){
      this.props.addError("Must have all unique Answers");
    } else {
      const { questionContent, title, description, education, answerType } = this.state
      this.props.postQuestion({questionContent, title, description, education, answers, answerType})
      this.props.history.push('/question')
    }
  }

  handleRadio = event => {
    this.setState({ answerType: event.target.value })
  }

  incrementNumAnswers = event => {
    event.preventDefault();
    if(this.state.numAnswers < 20){
      this.setState({numAnswers: this.state.numAnswers+1})
    }
  }

  decrementNumAnswers = event => {
    event.preventDefault();
    if(this.state.numAnswers > 2){
      this.setState({numAnswers: this.state.numAnswers-1})
    }
  }

  render(){
    const answerInputs = new Array(parseInt(this.state.numAnswers, 10)).fill('').map((old, index) => (
      <label key={index}> Answer {index+1}:
        <input
          type='text'
          name={`answer${index+1}`}
          aria-label={`Answer #${index+1}`}
          title={`Answer #${index+1}`}
          value={this.state.answers}
          onChange = {handleChange.bind(this)}
          maxLength='50'
          required
        />
      </label>))
    return(<div>
      <form onSubmit={this.handleSubmit} className='new-question-form'>
        <label>
          <h2>Create your own Discussion</h2>
          <h4>Discover what WePoll users think about a topic. Ask a question, get feedback, learn about public opinion</h4>
          <Button label='Reset Form' onClick={()=> this.setState(this.defaultState)} />
        </label>
        <label> Question:
          <input
            type='text'
            name='questionContent'
            aria-label='Your Question'
            title='Your Question'
            value={this.state.questionContent}
            onChange = {handleChange.bind(this)}
            required
          />
          <p className='new-question-form-field-description'>Ask any question you'd like. The best questions clearly and concisely state the issue at hand.</p>
        </label>

        <label> Title:
          <input
            type='text'
            name='title'
            aria-label='Short title'
            title='Short title'
            value={this.state.title}
            onChange = {handleChange.bind(this)}
            maxLength='30'
            required
          />
          <p className='new-question-form-field-description'>Your title should be the topic of your question in a few words.</p>
        </label>
        <label> Description:
          <input
            type='text'
            name='description'
            aria-label='Detailed Description'
            title='Detailed Description'
            value={this.state.description}
            onChange = {handleChange.bind(this)}
            maxLength='75'
            required
          />
          <p className='new-question-form-field-description'>An 'at a glance' description of your question. </p>
        </label>
        <label> Education:
          <input
            type='text'
            name='education'
            aria-label='An Educational Resource to teach others about possible answers'
            title='An Educational Resource to teach others about possible answers'
            value={this.state.education}
            onChange = {handleChange.bind(this)}
            required
          />
          <p className='new-question-form-field-description'>Educate the reader about for and against arguments for your poll. Why do some people want one answer, while others favor a different one?</p>
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
            onChange = {handleChange.bind(this)}
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
            readOnly
            required
          />
          <Button classes="increment-num-answers" label="+" onClick={this.incrementNumAnswers}/>
          <Button classes="decrement-num-answers" label="-" onClick={this.decrementNumAnswers}/>
        </label>
        { process.env.REACT_APP_ENV_TYPE==='development' && <label> Answer Type:
            <input
              id='single'
              type='radio'
              name='answerType'
              aria-label='single'
              title='User can only select one answer'
              value='single'
              onChange = {this.handleRadio}
              checked={this.state.answerType==='single'}
            />
          <label htmlFor='single' className='radio-label'> Single Answer </label>
            <input
              id='multiple'
              type='radio'
              name='answerType'
              aria-label='multiple'
              title='User can select multiple answers'
              value='multiple'
              onChange = {this.handleRadio}
              checked={this.state.answerType==='multiple'}
            />
          <label  htmlFor='multiple' className='radio-label'> Multiple Answers (Coming Soon)</label>
            <input
              id='range'
              type='radio'
              name='answerType'
              aria-label='range'
              title='User can select a range of answers'
              value='range'
              onChange = {this.handleRadio}
              checked={this.state.answerType==='range'}
            />
          <label  htmlFor='range' className='radio-label'> Range (Coming Soon) </label>
        </label> }
        {answerInputs}
        <Button label='Create this Question' type="submit" />
      </form>
    </div>)
  }
}

function mapStateToProps(state){
  return {
    messages: state.messages
  }
}

export default withRouter(connect(mapStateToProps, {postQuestion, addError, addMessage})(NewQuestionForm));
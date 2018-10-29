import React, {Component} from 'react'
import './PartyForm.css'
import { createPartyAction } from '../store/actions/party'
import connect from 'react-redux/es/connect/connect'
import Button from "../hocs/Button";
import BackFrame from "../hocs/BackFrame";
import { handleChange } from "../helper/handleChange";

class PartyForm extends Component{
  defaultState = {
    name: '',
    description:'',
    joinType:'open',
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af5af77aed859c2f16c5234900f54ab9&auto=format&fit=crop&w=1350&q=80"
  }

  state = this.defaultState

  handleSubmit = event => {
    event.preventDefault()
    this.props.createPartyAction(this.state)
    this.setState(this.defaultState)
  }

  render(){
    const { name, description, image} = this.state
    return(<div className='new-party-body'>
      <p>Add a new party to the game. Admin and Founders only</p>
      <form onSubmit={this.handleSubmit} className='new-party-form'>
        <label className='new-party-name'>Party Name:
          <input
            type='text'
            name='name'
            aria-label='party name'
            value={name}
            onChange = {handleChange.bind(this)}
            required
          />
        </label>
        <label className='new-party-description'>Party Description:
          <input
            type='text'
            name='description'
            aria-label='party description'
            value={description}
            onChange = {handleChange.bind(this)}
            required
          />
        </label>
        <legend>Party Join Type</legend>
        <label className='new-party-join-type'>Open
          <input
            type='radio'
            name='joinType'
            aria-label='party join type open'
            value='open'
            onChange = {handleChange.bind(this)}
            required
          />
        </label>
        <label className='new-party-join-type'>Closed
          <input
            type='radio'
            name='joinType'
            aria-label='party join type closed'
            value='closed'
            onChange = {handleChange.bind(this)}
            required
          />
        </label>
        {/*<label className='new-party-join-type'>Approval*/}
          {/*<input*/}
            {/*type='radio'*/}
            {/*name='joinType'*/}
            {/*aria-label='party join type approval'*/}
            {/*value='approval'*/}
            {/*onChange = {handleChange.bind(this)}*/}
            {/*required*/}
          {/*/>*/}
        {/*</label>*/}
        <label className='new-party-image'>Party Image:
          <input
            type='text'
            name='image'
            aria-label='party image'
            value={image}
            onChange = {handleChange.bind(this)}
            required
          />
        </label>
        <Button type="submit" label='Add Party'/>
      </form>
    </div>)
  }
}

 function mapStateToProps(state){
  return {
    parties: state.parties
  }
 }

export default connect(mapStateToProps, {createPartyAction})(BackFrame(PartyForm));
import React, {Component} from 'react'
import './ItemForm.css'
import { postItem } from '../store/actions/items'
import connect from 'react-redux/es/connect/connect'
import Button from "../hocs/Button";
import BackFrame from "../hocs/BackFrame";

class ItemForm extends Component{
  constructor(props){
    super(props)
    this.state = this.defaultState
  }

  defaultState = {
    name: '',
    cost: 1,
    description:'',
    canHaveMultiple: false,
    image: "https://images.unsplash.com/photo-1520946708818-4966701c25e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ada9b03ec040b816c353056c77eb6cd3&auto=format&fit=crop&w=1350&q=80"
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.postItem({...this.state})
    this.setState(this.defaultState)
  }

  render(){
    return(<div className='new-item-body'>
      <p>Add a new item to the game. Admin and Founders only</p>
      <form onSubmit={this.handleSubmit} className='new-item-form'>
        <label className='new-item-name'>Item Name:
          <input
            type='text'
            name='name'
            aria-label='item name'
            value={this.state.name}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label className='new-item-description'>Item Description:
          <input
            type='text'
            name='description'
            aria-label='item description'
            value={this.state.description}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label className='new-item-cost'>Item Cost:
          <input
            type='number'
            name='cost'
            aria-label='item cost'
            value={this.state.cost}
            onChange = {this.handleChange}
            required
          />
        </label>
        <label className='new-item-can-have-multiple'>Can have multiple:
          <input
            type='checkbox'
            name='canHaveMultiple'
            aria-label='Can a User have multiple in their inventory'
            value={this.state.canHaveMultiple}
            onChange={this.handleChange}
          />
        </label>
        <label className='new-item-image'>Item Image:
          <input
            type='text'
            name='image'
            aria-label='item image'
            value={this.state.image}
            onChange = {this.handleChange}
            required
          />
        </label>
        <Button type="submit" label='Add Item'/>
      </form>
    </div>)
  }
}

 function mapStateToProps(state){
  return {
    items: state.items
  }
 }

export default connect(mapStateToProps, {postItem})(BackFrame(ItemForm));
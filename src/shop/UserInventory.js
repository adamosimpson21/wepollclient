import React, {Component} from 'react';
import './UserInventory.css';
import connect from 'react-redux/es/connect/connect'
import {buyCoins, removeFromInventory} from '../store/actions/user'
import InventoryItem from './InventoryItem'
import Loader from "react-loader-spinner";
import HorizontalLine from "../hocs/HorizontalLine";

class UserInventory extends Component{
  defaultState = {
    coinsToBuy : 5
  }

  state = this.defaultState

  handleChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.buyCoins(this.state.coinsToBuy)
    this.setState(this.defaultState)
  }

  render(){
    const { user } = this.props.currentUser
    const { items, removeFromInventory } = this.props
    if(Object.keys(user).length > 0){
      let userItems = (<div>You don't have any items!</div>)
      if(items.length >0 && user.inventory.length>0){
        userItems = user.inventory.map((item, index) => (
          <InventoryItem
            key={index}
            item={item}
            removeItem={removeFromInventory.bind(this, item)}
          />))
      }
      return(
        <div>
          <div className='user-inventory-header'>
          {user.username}'s Inventory!
            <HorizontalLine/>
          You have {user.coins} Opinion Points
            <HorizontalLine/>
            Answer questions to earn more
          </div>
          {(user.authLevel==='admin' || user.authLevel==='founder') &&
          <form onSubmit={this.handleSubmit}>
            <label>Buy Coins:
              <input
                type='number'
                name='coinsToBuy'
                aria-label='Number of Coins to Buy'
                value={this.state.coinsToBuy}
                onChange = {this.handleChange}
                required
              />
            </label>
            <button type="submit">Add Coins</button>
          </form>}
          <div>
            <div className='inventory-items'>
              {userItems}
            </div>
          </div>
        </div>
    )} else {
      return(<Loader
          type="Circles"
          color="#00BFFF"
          height={200}
          width={100}
        />)
    }
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    items: state.items
  };
}

export default connect(mapStateToProps, {buyCoins, removeFromInventory})(UserInventory);
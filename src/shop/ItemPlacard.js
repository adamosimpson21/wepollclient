import React, {Component} from 'react'
import './ItemPlacard.css';
import BackFrame from '../hocs/BackFrame'
import Button from "../hocs/Button";

class ItemPlacard extends Component{
  render(){
    const {name, canHaveMultiple, description, cost, image, removeItem, addToInventory, currentUser} = this.props
    return(
      <div className='shop-item-placard'>
        <img className='shop-item-image' alt={name} src={image} />
        <p>{name}</p>
        <p>{description ? description : null}</p>
        <p>Can Have Multiple: {canHaveMultiple ? 'Yes' : 'No'}</p>
        <p>Cost: {cost} Opinion Points</p>
        <Button onClick={addToInventory} label='Buy This Item' />
        {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <div><button onClick={removeItem} className='shop-remove-item'> Remove This Item from the Game (founders and admins only) </button></div>}
      </div>
    )
  }
}

export default BackFrame(ItemPlacard);
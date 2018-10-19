import React, {Component} from 'react'
import './ItemPlacard.css'

class ItemPlacard extends Component{
  render(){
    const {name, stack, cost, image, removeItem, addToInventory} = this.props
    return(
      <div>
        <p>Item name is {name}</p>
        <p>Item stack is {stack}</p>
        <p>Item cost is {cost}</p>
        <img className='item-image' alt={name} src={image} />
        <button onClick={addToInventory}>Buy This Item</button>
        <span onClick={removeItem}> X </span>
      </div>
    )
  }
}

export default ItemPlacard;
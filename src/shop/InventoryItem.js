import React, {Component} from 'react';
import './InventoryItem.css'
import connect from 'react-redux/es/connect/connect'
import { removeFromInventory } from '../store/actions/user'

class InventoryItem extends Component{
  populateItem(itemId){
    let itemMatch = {}
    this.props.items.forEach(item => {
      if(item._id===itemId){
        itemMatch = {...item}
      }
    })
    return itemMatch;
  }

  render(){
    const { item, removeItem } = this.props
    let itemWithDetails = this.populateItem(item)
    return(
      <div className='item-in-inventory'>This is an item {itemWithDetails.name}
        <img className='item-image' alt={itemWithDetails.name} src={itemWithDetails.image} />
        <button onClick={removeItem}>Delete Me</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps, { removeFromInventory })(InventoryItem);
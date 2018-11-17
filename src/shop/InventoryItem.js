import React, {Component} from 'react';
import './InventoryItem.css'
import connect from 'react-redux/es/connect/connect'
import { removeFromInventory } from '../store/actions/user'
import BackFrame from "../hocs/BackFrame";
import Button from "../hocs/Button";

class InventoryItem extends Component{
  render(){
    const { items, item, removeItem } = this.props
    let itemWithDetails = items.find(itemProp => itemProp._id === item)
    return(
      <div className='item-in-inventory'>
        <img className='shop-item-image' alt={itemWithDetails.name} src={itemWithDetails.image} />
        <div>{itemWithDetails.name}</div>
        <div>You have {itemWithDetails.stack} of these</div>
        <div>Can have multiple: {itemWithDetails.canHaveMultiple ? <span>Yes</span> : <span>No</span>}</div>
        <div>{itemWithDetails.description ? itemWithDetails.description : null}</div>
        <Button onClick={removeItem} label='Remove' color='red'/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps, { removeFromInventory })(BackFrame(InventoryItem));
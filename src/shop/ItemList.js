import React, {Component} from 'react'
import './ItemList.css'
import ItemPlacard from "./ItemPlacard";
import { removeItem } from '../store/actions/items'
import {addToInventory} from '../store/actions/user'
import connect from 'react-redux/es/connect/connect'

class ItemList extends Component{
  render(){
    const { items, removeItem, addToInventory} = this.props
    if(items.length>0){
      const allItems = items.map(item => (
        <ItemPlacard
          key={item._id}
          {...item}
          removeItem={removeItem.bind(this, item._id)}
          addToInventory={addToInventory.bind(this, item._id)}
        />
      ))
      return(<div className='itemList'>{allItems}</div>)
    } else {
      return(<div>Loading Items...</div>)
    }
  }
}

function mapStateToProps(state){
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, { removeItem, addToInventory })(ItemList);
import React, {Component} from 'react'
import './Shop.css'
import ItemList from './ItemList'
import ItemForm from "./ItemForm";
import { fetchItems } from '../store/actions/items';
import connect from 'react-redux/es/connect/connect';
import UserInventory from './UserInventory';

class Shop extends Component{
  componentDidMount(){
    this.props.fetchItems();
  }

  render(){
    const { items } = this.props
    return(<div>
      <ItemForm />
      <UserInventory />
      <ItemList items={items}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps, {fetchItems})(Shop);
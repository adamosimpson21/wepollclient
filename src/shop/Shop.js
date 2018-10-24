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
    const { items, currentUser } = this.props
    return(<div>
      {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <ItemForm />}
      {currentUser.isAuthenticated ? <UserInventory /> : <div>Log In to access your inventory</div>}
      <div> Buy these Items from the store! </div>
      <ItemList items={items}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {fetchItems})(Shop);
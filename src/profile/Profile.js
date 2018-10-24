import React, {Component} from 'react'
import './Profile.css'
import withAuth from '../hocs/withAuth'
import connect from 'react-redux/es/connect/connect'
import { checkLevel } from '../helper/experience'
import Button from '../hocs/Button'
import {fetchItems} from '../store/actions/items'
import {removeFromInventory} from "../store/actions/user";
import moment from "moment";

class Profile extends Component{
  state = {
      revealPassword:false,
      revealDemographics:false
    }

  componentDidMount(){
    this.props.fetchItems();
  }

  revealPassword = () => {
    this.setState({revealPassword:true})
  }

  revealDemographics = () => {
    this.setState({revealDemographics:true})
  }

  render(){
    const user = this.props.currentUser.user;
    if(Object.keys(user).length > 0) {
      let items = (<div>You don't have any items!</div>)
      if(user.inventory.length > 0 && this.props.items.length > 0){
        items = user.inventory.map((item, index) =>{
          let itemWithDetails = this.props.items.find(itemProp => itemProp._id===item)
          return(<img className='profile-item-image' alt={itemWithDetails.name} src={itemWithDetails.image} key={index}/>)
        })
      }
      return (<div className='profile-body'>
        <div className='user-aside'>
          {user.username}
          {user.avatar && <img className='avatar-image' alt='user avatar' src={user.avatar} /> }
          You're level {checkLevel(user.experience)}
        </div>
        <div className='profile-main'>
          <div className='profile-list'>Username: {user.username}</div>
          <div className='profile-list'>Party: {user.party ? user.party : 'none'}</div>
          <div className='profile-list'>Questions Answered: {user.questions.length}</div>
          <div className='profile-list'>Questions Authored: {user.authored.length}</div>
          <div className='profile-list'>Joined WePoll: {moment(user.createdAt).format('MMMM Do YYYY')}</div>
          <div className='profile-list-inventory'>Inventory: {items}</div>
          <div className='profile-list-password'>Password:
            {this.state.revealPassword ?
              <span className='password-joke'>Haha, just kidding</span> :
              <Button label='Show Password' onClick={this.revealPassword}/> }
          </div>
        </div>
        <div className='profile-demographics'>
          {this.state.revealDemographics ? (
            <div className='profile-demographics-body'>
              <div className='profile-demographics-list'>Age: {user.age}</div>
              <div className='profile-demographics-list'>Race: {user.race}</div>
              <div className='profile-demographics-list'>Est. Income: {user.income}</div>
              <div className='profile-demographics-list'>Gender: {user.gender}</div>
              <div className='profile-demographics-list'>Education: {user.education}</div>
              <div className='profile-demographics-list'>Location: {user.location}</div>
              <div className='profile-demographics-list'>Household size: {user.familySize}</div>
            </div>) :
            (<Button label='Show Demographics' onClick={this.revealDemographics}/>) }
        </div>
      </div>)
    } else {
      return(<div>Please log in to see your profile</div>)
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    items: state.items
  };
}

export default connect(mapStateToProps, {fetchItems, removeFromInventory})(withAuth(Profile));
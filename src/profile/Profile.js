import React, {Component} from 'react'
import './Profile.css'
import withAuth from '../hocs/withAuth'
import connect from 'react-redux/es/connect/connect'
import { checkLevel } from '../helper/experience'
import Button from '../hocs/Button'
import {fetchItems} from '../store/actions/items'
import {removeFromInventory, updateDemographics} from "../store/actions/user";
import moment from "moment";
import {loadOnePartyAction} from "../store/actions/party";
import Link from "react-router-dom/es/Link";
import UpdateDemographics from "./UpdateDemographics";

class Profile extends Component{
  state = {
      revealPassword:false,
      revealDemographics:false,
      updateDemographics: false
    }

  componentDidMount(){
    this.props.fetchItems();
    if(this.props.currentUser.user.party){
      this.props.loadOnePartyAction(this.props.currentUser.user.party)
    }
  }

  revealPassword = () => {
    this.setState({revealPassword:true})
  }

  revealDemographics = () => {
    this.setState({revealDemographics:true})
    this.setState({updateDemographics:false})
  }

  updateDemographics = () => {
    this.setState({updateDemographics:true})
    this.setState({revealDemographics:false})
  }

  render(){
    const user = this.props.currentUser.user;
    if(Object.keys(user).length > 0) {

      let items = (<div>You don't have any items!</div>)
      if(user.inventory.length > 0 && this.props.items.length > 0){
        items = user.inventory.map((item, index) =>{
          let itemWithDetails = this.props.items.find(itemProp => itemProp._id===item)
          return(<img className='profile-item-image' alt={itemWithDetails.name} title={itemWithDetails.name} src={itemWithDetails.image} key={index}/>)
        })
      }

      let party = null
      if(user.party && this.props.parties.length === 1){
        party = this.props.parties[0]
      }

      return (<div className='profile-body'>
        <div className='user-aside'>
          {user.username}
          {user.avatar && <img className='avatar-image' alt='user avatar' src={user.avatar} /> }
          You're level {checkLevel(user.experience)}
        </div>
        <div className='profile-main'>
          <div className='profile-list'>Username: {user.username}</div>
          <div className='profile-list'>Party: {(user.party && party) ? <Link to={`party/${party._id}`}>{party.name}</Link> : 'none'}</div>
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
              <Button label='Update My Demographics' onClick={this.updateDemographics} />
              <div className='profile-demographics-list'>Age: {user.age}</div>
              <div className='profile-demographics-list'>Race: {user.race}</div>
              <div className='profile-demographics-list'>Est. Income: {user.income}</div>
              <div className='profile-demographics-list'>Gender: {user.gender}</div>
              <div className='profile-demographics-list'>Education: {user.education}</div>
              <div className='profile-demographics-list'>Location: {user.location}</div>
              <div className='profile-demographics-list'>Household size: {user.familySize}</div>
            </div>) :
            (<Button label='Show Demographics' onClick={this.revealDemographics}/>)}
          {this.state.updateDemographics &&
            <UpdateDemographics
              switchBack={this.revealDemographics.bind(this)}
            />}
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
    items: state.items,
    parties: state.parties
  };
}

export default connect(mapStateToProps, {fetchItems, removeFromInventory, loadOnePartyAction, updateDemographics})(withAuth(Profile));
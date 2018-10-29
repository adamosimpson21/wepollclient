import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {loadOnePartyAction, joinPartyAction} from "../store/actions/party";
import './PartyView.css'
import Button from "../hocs/Button";
import BackFrame from "../hocs/BackFrame";
import MyLoader from "../hocs/Loader";

class PartyView extends Component{
  componentDidMount(){
    this.props.loadOnePartyAction(this.props.match.params.partyId)
  }

  handleJoin = event => {
    event.preventDefault()
    this.props.joinPartyAction(this.props.match.params.partyId)
  }

  render(){
    if(this.props.parties.length === 1){
      const party = this.props.parties[0];
      const user = this.props.currentUser.user;
      const isMyParty = user.party ? user.party===party._id : false;
      return(<div className='party-view'>
        <div className='party-view-title'>{party.name} party</div>
        <img className='party-view-image' alt={party.name} src={party.image} />
        <div>{party.members.length} members</div>
        <div>{party.description}</div>
        {party.president ? <div>The president is {party.president}</div> : <div>No President yet</div>}
        <div>There are {party.officers.length} officers</div>
        <div>This party is {party.joinType} to new members</div>
        {party.joinType==='open' ? isMyParty ? <div>You are in this party</div> : <Button label='Join this Party' onClick={this.handleJoin} /> : null}
        {isMyParty && <Button label='Come chat with us! '/>}
        <div>Prestige: {party.prestige}</div>
      </div>)
    } else {
      return(<MyLoader />)
    }
  }
}

function mapStateToProps(state){
  return {
    parties: state.parties,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, { loadOnePartyAction, joinPartyAction })(BackFrame(PartyView));
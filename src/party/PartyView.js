import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {loadOnePartyAction, joinPartyAction} from "../store/actions/party";
import './PartyView.css'
import Loader from "react-loader-spinner";
import Button from "../hocs/Button";
import BackFrame from "../hocs/BackFrame";

class PartyView extends Component{
  componentDidMount(){
    this.props.loadOnePartyAction(this.props.match.params.partyId)
  }

  render(){
    if(this.props.parties.length === 1){
      const party = this.props.parties[0]
      const user = this.props.currentUser.user
      return(<div className='party-view'>
        <div className='party-view-title'>{party.name} party</div>
        <img className='party-view-image' src={party.image} />
        <div>{party.members.length} members</div>
        <div>{party.description}</div>
        {party.president ? <div>The president is {party.president}</div> : <div>No President yet</div>}
        <div>There are {party.officers.length} officers</div>
        <div>This party is {party.joinType} to new members</div>
        {user.party===party._id ? <div>You are in this party</div> : <button>Join this party</button>}
        <Button label='Come chat with us! '/>
        <div>Prestige: {party.prestige}</div>
      </div>)
    } else {
      return(<Loader
      type="Circles"
      color="#00BFFF"
      height={200}
      width={100}
      />)
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
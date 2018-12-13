import React, {Component} from 'react'
import './PartyList.css'
import PartyPlacard from "./PartyPlacard";
import { deletePartyAction, joinPartyAction } from '../store/actions/party'
import connect from 'react-redux/es/connect/connect'
import MyLoader from "../hocs/Loader";

class PartyList extends Component{
  render(){
    const { parties, deletePartyAction, currentUser, joinPartyAction} = this.props
    if(parties.length>0){
      const allParties = parties.map(party => (
        <PartyPlacard
          key={party._id}
          {...party}
          deletePartyAction={deletePartyAction.bind(this, party._id)}
          joinPartyAction={joinPartyAction.bind(this, party._id)}
          currentUser={ currentUser}
        />
      ))
      return(<div className='party-list'>{allParties}</div>)
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

export default connect(mapStateToProps, { deletePartyAction, joinPartyAction })(PartyList);
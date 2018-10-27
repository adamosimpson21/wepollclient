import React, {Component} from 'react'
import './PartyList.css'
import PartyPlacard from "./PartyPlacard";
import { deletePartyAction, joinPartyAction } from '../store/actions/party'
import connect from 'react-redux/es/connect/connect'
import Loader from "react-loader-spinner";

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
      return(<div>
        <Loader
        type="Circles"
        color="#00BFFF"
        height={200}
        width={100}
        />
      </div>)
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
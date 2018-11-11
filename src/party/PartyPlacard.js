import React, {Component} from 'react'
import './PartyPlacard.css';
import BackFrame from '../hocs/BackFrame';
import Link from "react-router-dom/es/Link";
import Button from "../hocs/Button";

class PartyPlacard extends Component{
  render(){
    const {name, description, image, joinType, deletePartyAction, joinPartyAction, currentUser, _id } = this.props
    return(
      <div className='party-placard'>
        <img className='party-image' alt={name} src={image} />
        <div><Link to={`party/${_id}`}>{name}</Link></div>
        <p>{description ? description : null}</p>
        {currentUser.isAuthenticated ? joinType==='open' ?
            <Button onClick={joinPartyAction} label='Join this party' />
          : <div>This party is closed to new members</div>
          : <div>Log in to join this party</div>}
        {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <div><button onClick={deletePartyAction} className='party-remove-party'> Remove This Party from the Game (founders and admins only) </button></div>}
      </div>
    )
  }
}

export default BackFrame(PartyPlacard);
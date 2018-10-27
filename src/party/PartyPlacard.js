import React, {Component} from 'react'
import './PartyPlacard.css';
import BackFrame from '../hocs/BackFrame';

class PartyPlacard extends Component{
  render(){
    const {name, description, image, deletePartyAction, joinPartyAction, currentUser} = this.props
    return(
      <div className='party-placard'>
        <img className='party-image' alt={name} src={image} />
        <p>{name}</p>
        <p>{description ? description : null}</p>
        {currentUser.isAuthenticated && <button onClick={joinPartyAction}>Join this party</button>}
        {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <div><button onClick={deletePartyAction} className='party-remove-party'> Remove This Party from the Game (founders and admins only) </button></div>}
      </div>
    )
  }
}

export default BackFrame(PartyPlacard);
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
        <span className='party-placard-top-section'>
        <img className='party-image' alt={name} src={image} />
        <Link to={`party/${_id}`}><Button label={`Learn more about the ${name}`}/></Link>
        {currentUser.isAuthenticated ? joinType==='open' ?
          <Button onClick={joinPartyAction} label='Join this party' color='green' style={{ fontSize:'1.1rem'}}/>
          : <div>This party is closed to new members</div>
          : <div>Log in to join this party</div>}
        {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <Button onClick={deletePartyAction} label='Remove This Party from the Game (founders and admins only)' color='red'/>}
        </span>
        <p>{description ? description : null}</p>
      </div>
    )
  }
}

export default BackFrame(PartyPlacard);
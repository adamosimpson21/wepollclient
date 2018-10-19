import React, {Component} from 'react'
import './Party.css'
import Button from "../hocs/Button";

class Party extends Component{
  constructor(props){
    super(props)
    this.state = {
      parties:[]
    }
  }

  componentWillMount(){
    this.loadParties();
  }

  loadParties(){
    return true
  }

  render(){
    const allParties = this.state.parties.map(party => (
      <div className='partyPlacard'>
        <div>Party.Title</div>
        <div>Party.Image</div>
        <div>Party.Description</div>
        <Button label='Check out this party'/>
      </div>
    ))
    return(
      <div>
        <div className='partyTitle'>
          <h1>Welcome to the Party!</h1>
          <div className='partyDescription'>Join a party that best represents your politics!  In the future, you will be able to create parties, and join parties in multiple categories!</div>
        </div>
        <div className='partyList'>
          {allParties}
        </div>
      </div>)
  }
}

export default Party;
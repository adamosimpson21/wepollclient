import React, {Component} from 'react'
import './Party.css'
import PartyList from './PartyList'
import PartyForm from "./PartyForm";
import { loadPartiesAction } from '../store/actions/party';
import connect from 'react-redux/es/connect/connect';

class Party extends Component{
  componentDidMount(){
    this.props.loadPartiesAction();
  }

  render(){
    const { parties, currentUser } = this.props
    return(<div>
      {(currentUser.user.authLevel==='admin' || currentUser.user.authLevel==='founder') && <PartyForm />}
      <div> Join these Parties! </div>
      <PartyList parties={parties}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    parties: state.parties,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {loadPartiesAction})(Party);
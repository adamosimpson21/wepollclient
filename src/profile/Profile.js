import React, {Component} from 'react'
import './Profile.css'
import withAuth from '../hocs/withAuth'
import connect from 'react-redux/es/connect/connect'
import {checkLevel, experienceObj, levelProgress} from '../helper/experience'
import Button from '../hocs/Button'
import {fetchItems} from '../store/actions/items'
import {removeFromInventory, updateDemographics} from "../store/actions/user";
import moment from "moment";
import {loadOnePartyAction} from "../store/actions/party";
import Link from "react-router-dom/es/Link";
import UpdateDemographics from "./UpdateDemographics";
import HorizontalLine from "../hocs/HorizontalLine";
import {loadOneQuestionAction} from "../store/actions/questions";
import PresidentLink from "../hocs/PresidentLink";


class Profile extends Component{
  state = {
      revealDemographics:false,
      updateDemographics: false,
      expandAnswered:false
    }

  componentDidMount(){
    const { fetchItems, currentUser, loadOneQuestionAction, loadOnePartyAction} = this.props
    fetchItems();
    if(Object.keys(currentUser.user).length !== 0 && currentUser.user.questions.length > 0) {
      currentUser.user.questions.forEach(question => {
        loadOneQuestionAction(question)
      })
    }
    currentUser.user.party && loadOnePartyAction(this.props.currentUser.user.party)
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
    const { user }= this.props.currentUser;
    if(Object.keys(user).length !== 0) {
      const itemMapper = () => user.inventory.map((item, index) =>{
        let itemWithDetails = this.props.items.find(itemProp => itemProp._id===item)
        return(<img className='profile-item-image' alt={itemWithDetails.name} title={itemWithDetails.name} src={itemWithDetails.image} key={index}/>)
      })

      const userLevel = checkLevel(user.experience)
      const party = (user.party && this.props.parties.length === 1) ? this.props.parties[0] : null
      const partyJSX = (user.party && party) ? <Link to={`party/${party._id}`}>{party.name}</Link> : 'none'
      const items = (user.inventory.length > 0 && this.props.items.length > 0) ? itemMapper() : (<div>You don't have any items!</div>)
      const usersAnsweredQuestions = user.questions.map(question => (<div>Question Here</div>))

      return (<div className='profile-body'>
        <div className='user-aside'>
          {user.avatar && <img className='avatar-image' alt='user avatar' src={user.avatar} /> }
          <br />
          {user.username}
          <br />
          Level {userLevel} <PresidentLink level={userLevel}/>
          <div className='progressBarContainer'>
            <div className="progress-bar xpProgressBar" role="progressbar" aria-valuenow={user.experience}
                 aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(user.experience)+'%'}}>
            </div>
          </div>
          Experience: {user.experience} / {experienceObj[userLevel+1]}
        </div>
        <HorizontalLine/>
        <div className='profile-main'>
          <table>
            <tbody>
              {/*<tr>*/}
                {/*<td>Username: </td>*/}
                {/*<td>{user.username}</td>*/}
              {/*</tr>*/}
              <tr>
                <td>Party: </td>
                <td>{partyJSX}</td>
              </tr>
              <tr>
                <td>Questions Answered: </td>
                {/* Groundwork for displaying user's answered questions */}
                {/*<td>{user.questions.length} <Button label='Expand' onClick={() => this.setState({expandAnswered:true})}/></td>*/}
                <td>{user.questions.length} </td>
              </tr>
              {this.state.expandAnswered && <tr>
                <td colSpan={2}>
                  {usersAnsweredQuestions}
                </td>
              </tr>}

              <tr>
                <td>Questions Authored: </td>
                <td>{user.authored.length}</td>
              </tr>
              <tr>
                <td>Joined WePoll: </td>
                <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>
              </tr>
              <tr>
                <td>Inventory: </td>
                <td>{items}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <HorizontalLine/>
        <div className='profile-demographics'>
          {this.state.revealDemographics ? (
            <div className='profile-demographics-body'>
              <Button label='Update My Demographics' onClick={this.updateDemographics} />
              <table>
                <tbody>
                  <tr>
                    <td>Age:  </td>
                    <td>{user.age}</td>
                  </tr>
                  <tr>
                    <td>Est. Income:  </td>
                    <td>{user.income}</td>
                  </tr>
                  <tr>
                    <td>Household size:  </td>
                    <td>{user.familySize}</td>
                  </tr>
                  <tr>
                    <td>Race: </td>
                    <td> {user.race}</td>
                  </tr>
                  <tr>
                    <td>Gender: </td>
                    <td> {user.gender}</td>
                  </tr>
                  <tr>
                    <td>Location: </td>
                    <td>{user.location}</td>
                  </tr>
                  <tr>
                    <td>Education:  </td>
                    <td>{user.education}</td>
                  </tr>
                </tbody>
              </table>
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
    parties: state.parties,
    questions: state.questions
  };
}

export default connect(mapStateToProps, {fetchItems,  removeFromInventory,  loadOnePartyAction,  updateDemographics,  loadOneQuestionAction})(withAuth(Profile));
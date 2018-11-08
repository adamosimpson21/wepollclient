import React, {Component} from 'react';
import './UpdateDemographics.css'
import { updateDemographics} from "../store/actions/user";
import connect from "react-redux/es/connect/connect";
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";
import { handleChange } from "../helper/handleChange";
import {educationOptions, genderOptions, locationOptions, raceOptions} from "../helper/demographicsOptions";

class UpdateDemographics extends Component{
  defaultState={
    age:1,
    race:'Not Specified',
    income:0,
    gender:'Not Specified',
    education:'Not Specified',
    location:'Not Specified',
    familySize:1
  }

  state=this.defaultState

  componentDidMount(){
    this.setState(this.props.currentUser.user)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateDemographics(this.state)
    this.props.switchBack();
  }

  createOptions = array => {
    return array.map(option => (
      <option value={option} key={option}>{option}</option>
    ))
  }

  render(){
    const { age, education, familySize, gender, income, location, race} = this.state
    return(<form onSubmit={this.handleSubmit} className='profile-update-demographics'>
      <h4> Update your demographics below. This is optional and estimate where applicable</h4>
      <h5> WePoll will never give your information to third parties. It's used for in-app filtering of results. Your username will not be included with this data.</h5>
      <label> Age:
        <input
          type='number'
          name='age'
          aria-label='Your Age'
          title='Your Age'
          value={age}
          min={1}
          max={150}
          onChange = {handleChange.bind(this)}
        />
      </label>
      <label> Race:
        <select name='race' aria-label='Race' title='Race' value={race} onChange={handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(raceOptions)}
        </select>
      </label>
      <label> Income:
        <input
          type='number'
          name='income'
          aria-label='Your Annual Income'
          title='Your Annual Income'
          value={income}
          min={0}
          step={5000}
          max={1000000000}
          onChange = {handleChange.bind(this)}
        />
      </label>
      <label> Gender:
        <select name='gender' aria-label='gender' title='gender' value={gender} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(genderOptions)}
        </select>
      </label>
      <label> Education:
        <select name='education' aria-label='education' title='education' value={education} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(educationOptions)}
        </select>
      </label>
      <label> Location:
        <select name='location' aria-label='location' title='location' value={location} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(locationOptions)}
        </select>
      </label>
      <label> Family Size:
        <input
          type='number'
          name='familySize'
          aria-label='Number of people living in your house'
          title='Number of people living in your house'
          value={familySize}
          min={1}
          max={20}
          onChange = {handleChange.bind(this)}
        />
      </label>
      <Button label='Update your Demographics' type="submit" />
    </form>)
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}


export default withRouter(connect(mapStateToProps, {updateDemographics})(UpdateDemographics));
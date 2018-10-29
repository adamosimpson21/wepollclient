import React, {Component} from 'react';
import './UpdateDemographics.css'
import { updateDemographics} from "../store/actions/user";
import connect from "react-redux/es/connect/connect";
import Button from "../hocs/Button";
import withRouter from "react-router/es/withRouter";
import { handleChange } from "../helper/handleChange";

class UpdateDemographics extends Component{
  defaultState={
    age:1,
    race:'Not Specified',
    income:0,
    gender:'Not Specified',
    education:'Not Specified',
    location:'Not Specified',
    familySize:0
  }

  state=this.defaultState

  componentDidMount(){
    this.setState({...this.props.currentUser.user})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateDemographics({...this.state})
    this.props.history.push('/profile')
  }

  createOptions = array => {
    return array.map(option => (
      <option value={option} key={option}>{option}</option>
    ))
  }

  render(){
    const { age, education, familySize, gender, income, location, race} = this.state
    return(<form onSubmit={this.handleSubmit} className='profile-update-demographics'>
      <h4> Update your demographics below. This is optional and you may estimate where applicable</h4>
      <label> Age:
        <input
          type='number'
          name='age'
          aria-label='Your Age'
          title='Your Age'
          value={age}
          onChange = {handleChange.bind(this)}
        />
      </label>
      <label> Race:
        <select name='race' aria-label='Race' title='Race' value={race} onChange={handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(['White', 'Black', 'Native American', 'Hispanic', 'Other', 'Not Specified'])}
        </select>
      </label>
      <label> Income:
        <input
          type='number'
          name='income'
          aria-label='Your Annual Income'
          title='Your Annual Income'
          value={income}
          onChange = {handleChange.bind(this)}
        />
      </label>
      <label> Gender:
        <select name='gender' aria-label='gender' title='gender' value={gender} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(['Male', 'Female', 'Other', 'Choose not to say', 'Not Specified'])}
        </select>
      </label>
      <label> Education:
        <select name='education' aria-label='education' title='education' value={education} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions(['Doctorate', 'Masters', 'Bachelors', 'High School', 'Less than High School', 'Not Specified'])}
        </select>
      </label>
      <label> Location:
        <select name='location' aria-label='location' title='location' value={location} onChange = {handleChange.bind(this)} defaultChecked={'Not Specified'}>
          {this.createOptions([ 'Not Specified', 'Non-USA' ,'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ])}
        </select>
      </label>
      <label> Family Size:
        <input
          type='number'
          name='familySize'
          aria-label='Number of people living in your house'
          title='Number of people living in your house'
          value={familySize}
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
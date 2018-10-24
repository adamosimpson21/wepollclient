import React, {Component} from 'react'
import './Register.css';
import connect from 'react-redux/es/connect/connect';
import { authUser } from '../store/actions/auth';
import Button from "../hocs/Button";
import Link from "react-router-dom/es/Link";

class Register extends Component{
  state={
      username:'',
      password:''
    }

  handleChange = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .authUser("signup", this.state)
      .then(() => {
        this.props.history.push("/");
      })
  }

  render(){
    const { username, password } = this.state;

    return(<div className='register-page'>
      <h1>Join WePoll today</h1>
      <h4>All you have to do is choose a username and password</h4>
      <form onSubmit = {this.handleSubmit} className='register-form'>
        <label className='register-form-username'>Choose a Username:
          <input
            className='register-form-username-input'
            autoComplete="off"
            id="username"
            name="username"
            onChange={this.handleChange}
            type="text"
            minLength='8'
            value={username}
            required
          />
        </label>
        <label className='register-form-password'>Your Password:
          <input
            className='register-form-password-input'
            autoComplete="off"
            id="password"
            name="password"
            onChange={this.handleChange}
            type="password"
            minLength='8'
            value={password}
            required
          />
        </label>
        <Button type="submit" label='Register Now'/>
        <Link to='/login'>Already have an account?</Link>
      </form>
    </div>)
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { authUser })(Register);
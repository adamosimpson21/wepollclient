import React, {Component} from 'react'
import './LogIn.css'
import connect from 'react-redux/es/connect/connect'
import { authUser} from '../store/actions/auth'
import Button from "../hocs/Button";
import Link from "react-router-dom/es/Link";

class LogIn extends Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .authUser("signin", this.state)
      .then(() => {
        this.props.history.push("/");
      })
  }

  render(){
    const { username, password } = this.state;
    return(<div className='login-page'>
      <h1>Log In!</h1>
      <form onSubmit = {this.handleSubmit} className='login-form'>
        <label className='login-form-username'>Username:
          <input
            className='login-form-username-input'
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
        <label className='login-form-password'>Password:
          <input
            className='login-form-password-input'
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
        <Button type="submit" label='Log In'/>
        <Link to='/register'>Don't have an account?</Link>
      </form>
    </div>)
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { authUser })(LogIn);
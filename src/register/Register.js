import React, {Component} from 'react'
import './Register.css';
import connect from 'react-redux/es/connect/connect';
import { authUser } from '../store/actions/auth';

class Register extends Component{
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
      .authUser("signup", this.state)
      .then(() => {
        this.props.history.push("/");
      })
  }

  render(){
    const { username, password } = this.state;

    return(<div>
      <form onSubmit = {this.handleSubmit}>
        <h1>Register Here</h1>
        <label>Username
          <input
            autoComplete="off"
            id="username"
            name="username"
            onChange={this.handleChange}
            type="text"
            value={username}
          />
        </label>
        <label>Password
          <input
            autoComplete="off"
            id="password"
            name="password"
            onChange={this.handleChange}
            type="password"
            value={password}
          />
        </label>
        <button type="submit">Register</button>
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
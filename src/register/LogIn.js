import React, {Component} from 'react'
import './LogIn.css'
import ErrorDisplay from '../hocs/ErrorDisplay'
import connect from 'react-redux/es/connect/connect'
import { authUser} from '../store/actions/auth'

class LogIn extends Component{
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
      .authUser("signin", this.state)
      .then(() => {
        this.props.history.push("/");
      })
  }

  render(){
    const { username, password } = this.state;
    return(<div>
      <form onSubmit = {this.handleSubmit}>
        <h1>Log In!</h1>
        <ErrorDisplay />
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
        <button type="submit">Log In</button>
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
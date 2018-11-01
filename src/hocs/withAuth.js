import React, { Component } from "react";
import { connect } from "react-redux";
import {addError} from '../store/actions/errors'

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated === false && process.env.REACT_APP_ENV_TYPE!=='development') {
        this.props.addError("You have to Log in to do that")
        this.props.history.push("/logIn");
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false && process.env.REACT_APP_ENV_TYPE!=='development') {
        this.props.addError("You have to Log in to do that")
        this.props.history.push("/logIn");
      }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated };
  }

  return connect(mapStateToProps, { addError })(Authenticate);
}

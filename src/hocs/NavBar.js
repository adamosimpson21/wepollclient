import React, {Component} from 'react';
import './NavBar.css';
import NavLink from "react-router-dom/es/NavLink";
import Icon from "./Icon";
import ResponsiveMenu from 'react-responsive-navbar';
import { logout } from "../store/actions/auth";
import connect from 'react-redux/es/connect/connect';
import withRouter from "react-router/es/withRouter";
import WePollBrand from "./WePollBrand";

class NavBar extends Component{
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render(){
    return(
        <header>
          <div className="fullNavbar">
              <NavLink to="/landing" className='wepoll-navbar-brand'><WePollBrand /></NavLink>
            <nav>
              <NavLink activeClassName="activeNavLink" to="/question"><li><Icon icon="questionMark" /><span className='navbar-text'>Questions</span></li></NavLink>
              <NavLink activeClassName="activeNavLink" to="/shop"><li><Icon icon="shop" /><span className='navbar-text'>Shop</span></li></NavLink>
              <NavLink activeClassName="activeNavLink" to="/profile"><li><Icon icon="user" /><span className='navbar-text'>Profile</span></li></NavLink>
              {/*<NavLink activeClassName="activeNavLink" to="/party"><li><Icon icon="group" /><span className='navbar-text'>Party</span></li></NavLink>*/}
              {/*<NavLink activeClassName="activeNavLink" to="/settings"><li><Icon icon="gear" /><span className='navbar-text'>Settings</span></li></NavLink>*/}
              <NavLink activeClassName="activeNavLink" to="/about"><li><Icon icon="questionMark" /><span className='navbar-text'>About</span></li></NavLink>
              {this.props.currentUser.isAuthenticated ? (
                <a onClick={this.logout} className='navbar-last-element'><li><Icon icon="logOut" /><span className='navbar-text'>Log out</span></li></a>
              ) : (
                <NavLink activeClassName="activeNavLink" to="/logIn"><li><Icon icon="signIn" /><span className='navbar-text'>Log In</span></li></NavLink>
              )}
              {!this.props.currentUser.isAuthenticated && (
                <NavLink activeClassName="activeNavLink" className='navbar-last-element' to="/register"><li>Register</li></NavLink>
              )}
            </nav>
          </div>
        </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavBar));
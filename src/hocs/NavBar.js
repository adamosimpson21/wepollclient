import React, {Component} from 'react';
import './NavBar.css';
import NavLink from "react-router-dom/es/NavLink";
import Icon from "./Icon";
import ResponsiveMenu from 'react-responsive-navbar';
import { logout } from "../store/actions/auth";
import connect from 'react-redux/es/connect/connect';

class NavBar extends Component{
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render(){
    return(
      <ResponsiveMenu
        menuOpenButton={<header>
          <Icon icon="hamburgerMenu" />
        </header>}
        menuCloseButton={<header className="headerCloseButton">
          <Icon icon="close"/>
        </header>}
        changeMenuOn="700px"
        largeMenuClassName="largeMenu"
        smallMenuClassName="smallMenu"
        menu={
          <header>
            <div className="fullNavbar">
              <h2>
                <NavLink to="/landing"><li>Main Menu</li></NavLink>
              </h2>
              <nav>
                <span className='navSmallMenuRow'>
                  <NavLink activeClassName="activeNavLink" to="/question"><li> <Icon icon="questionMark" />Questions</li></NavLink>
                  <NavLink activeClassName="activeNavLink" to="/shop"><li> <Icon icon="shop" />Shop</li></NavLink>
                  <NavLink activeClassName="activeNavLink" to="/profile"><li><Icon icon="user" />Profile</li></NavLink>
                </span>
                <span className='navSmallMenuRow'>
                  <NavLink activeClassName="activeNavLink" to="/party"><li><Icon icon="group" />Party</li></NavLink>
                  <NavLink activeClassName="activeNavLink" to="/settings"><li><Icon icon="gear" />Settings</li></NavLink>
                  <NavLink activeClassName="activeNavLink" to="/about"><li><Icon icon="questionMark" />About</li></NavLink>
                  {this.props.currentUser.isAuthenticated ? (
                      <li><a onClick={this.logout}><Icon icon="logOut" />Log out</a></li>
                  ) : (
                      <NavLink activeClassName="activeNavLink" to="/logIn"><li><Icon icon="signIn" />Log In</li></NavLink>
                  )}
                  {!this.props.currentUser.isAuthenticated && (
                      <NavLink activeClassName="activeNavLink" to="/register"><li>Register</li></NavLink>
                  )}
                </span>
              </nav>
            </div>
          </header>
        }
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(NavBar);
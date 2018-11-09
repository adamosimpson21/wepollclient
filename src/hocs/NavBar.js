import React, {Component} from 'react';
import './NavBar.css';
import NavLink from "react-router-dom/es/NavLink";
import Icon from "./Icon";
import { logout } from "../store/actions/auth";
import connect from 'react-redux/es/connect/connect';
import withRouter from "react-router/es/withRouter";
import WePollBrand from "./WePollBrand";
import VerticalLine from "./VerticalLine";

class NavBar extends Component{
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render(){
    const iconSize = '24px';
    return(
        <header>
            <NavLink to="/landing" className='wepoll-navbar-brand'><WePollBrand /></NavLink>
          <nav>
            <NavLink activeClassName="activeNavLink" to="/question"><li><Icon icon="questionMark" width={iconSize} height={iconSize}/><span className='navbar-text'>Questions</span></li></NavLink>
            <VerticalLine/>
            <NavLink activeClassName="activeNavLink" to="/shop"><li><Icon icon="shop"  width={iconSize} height={iconSize}/><span className='navbar-text'>Shop</span></li></NavLink>
            <VerticalLine/>
            <NavLink activeClassName="activeNavLink" to="/profile"><li><Icon icon="user"  width={iconSize} height={iconSize}/><span className='navbar-text'>Profile</span></li></NavLink>
            <VerticalLine/>
            <NavLink activeClassName="activeNavLink" to="/party"><li><Icon icon="group"  width={iconSize} height={iconSize}/><span className='navbar-text'>Party</span></li></NavLink>
            {/*<NavLink activeClassName="activeNavLink" to="/settings"><li><Icon icon="gear" /><span className='navbar-text'>Settings</span></li></NavLink>*/}
            <VerticalLine/>
            <NavLink activeClassName="activeNavLink" to="/about"><li><Icon icon="info"  width={iconSize} height={iconSize} viewBox='0 0 437.6 437.6'/><span className='navbar-text'>About</span></li></NavLink>
            <VerticalLine/>
            {this.props.currentUser.isAuthenticated ? (
              <a onClick={this.logout} className='navbar-last-element'><li><Icon icon="logOut"  width={iconSize} height={iconSize}/><span className='navbar-text'>Log out</span></li></a>
            ) : [
              <NavLink activeClassName="activeNavLink" to="/logIn" key={'login'}><li><Icon icon="signIn"  width={iconSize} height={iconSize}/><span className='navbar-text'>Log In</span></li></NavLink>,
              <VerticalLine key={'verticalLine'}/>,
              <NavLink activeClassName="activeNavLink" className='navbar-last-element' to="/register" key={'register'}><li><Icon icon="register"  width={iconSize} height={iconSize} viewBox={'0 0 720 720'} /><span className='navbar-text'>Register</span></li></NavLink>
            ]}
          </nav>
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
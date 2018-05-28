import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import logo from '../../../media/images/logo.png';



class SplashHeeader extends Component {
  render() {
    console.debug(this.props)
    return (
      <div className="splash-header">
        <div className="container clearfix">
          <div className="logo">
            <img src={logo} alt="GravityBrain" />
          </div>

          <div className="links text-right  m--hidden-mobile">
            <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">Login</NavLink>
            <NavLink to={`/signup`} className="btn no-border m-btn btn-sm signup">Sign up</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashHeeader
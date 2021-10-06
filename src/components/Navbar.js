import React, { Component } from 'react'
import farmer from '../assets/images/token-logo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light fixed-top bg-light flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://app.ubeswap.org"
          target="_blank"
          rel="noopener noreferrer">
          <img src={farmer} width="30" height="30" className="d-inline-block align-top " alt="" />
          &nbsp; Ubeswap Clone
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

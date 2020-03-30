import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
    <header className="header">
      {this.props.groupName}
      {/* <button className="login-button">ログイン</button> */}
      <Link className="login-link" to="/login">ログイン</Link>
    </header>
    )
  }
}
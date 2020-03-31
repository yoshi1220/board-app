import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * ログアウトボタン押下
   */
  clickLogoutButton = async () => {
    // ログアウト処理
    this.props.logoutAsAdmin();

    // ログアウト画面に移動
    this.props.history.push({ pathname: '/logout' });
  }

  /**
   * ログインボタン押下
   */
  clickLoginButton = async () => {
    // ログイン画面に移動
    this.props.history.push({ pathname: '/login' });
  }


  renderLoginLogout() {
    let loginLogoutDom = '';
    if (this.props.isAdmin) {
      // loginLogoutDom = <Link className="login-link" to="/logout">ログアウト</Link>
      loginLogoutDom = <button className="login-link" onClick={this.clickLogoutButton}>ログアウト</button>
    } else {
      // loginLogoutDom = <Link className="login-link" to="/login">管理者ログイン</Link>
      loginLogoutDom = <button className="login-link" onClick={this.clickLoginButton}>管理者ログイン</button>
    }
    return loginLogoutDom;
  }

  render() {
    return (
    <header className="header">
      {this.props.groupName}
      {/* <button className="login-link">ログイン</button> */}
      {/* <Link className="login-link" to="/login">管理者ログイン</Link> */}
      {this.renderLoginLogout()}
    </header>
    )
  }
}


export default withRouter(Header);
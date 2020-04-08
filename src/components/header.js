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
    // ログイン情報を削除
    sessionStorage.removeItem('isAdmin')

    // // 投稿一覧を再取得
    // this.props.onSelect(this.props.groupId, false);

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

  /**
   * ログイン、ログアウトボタンの表示
   */
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

  /**
   * 管理者の場合はカテゴリの投稿件数を表示する。
   */
  renderCategoryCount() {
    let renderDom = ''
    if (this.props.isAdmin) {
      renderDom = <span>&emsp;&emsp;投稿件数： {this.props.categoryCount}</span> ;
    } else {
      renderDom = <span></span>;
    }

    return renderDom;
  }

  render() {
    return (
    <header className="header">
      {this.props.groupName}
      {this.renderCategoryCount()}
      {/* <button className="login-link">ログイン</button> */}
      {/* <Link className="login-link" to="/login">管理者ログイン</Link> */}
      {this.renderLoginLogout()}
    </header>
    )
  }
}


export default withRouter(Header);
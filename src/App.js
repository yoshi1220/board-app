import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './board.scss';
import MainArea from './containers/mainArea';
import SideArea from './containers/sideArea';
import Login from './containers/login';
import Logout from './containers/logout';
import { boardActions } from './actions/boardActions';

class App extends React.Component {
  constructor(props) {
    super(props);

    // reduxの初期値を取得
    this.props.getInitialData();
  }

  // /**
  //  * カテゴリの削除
  //  */
  // onDeleteGroup(id) {
  //   let _state = Object.assign({}, this.state);

  //   // カテゴリの削除
  //   const deleteGroupItem = async () => {
  //     try {
  //       await axios.delete(BASE_URL + `/groups/${id}`);

  //       // 画面上のカテゴリを削除
  //       for (let i = 0; i < _state.groupList.length; i++) {
  //         if (_state.groupList[i].id === id) {
  //           _state.groupList.splice(i, 1)
  //           break;
  //         }
  //       }

  //       // 選択中のカテゴリが削除された場合は、一番最初のカテゴリを選択し直す
  //       if (_state.selectedGroup === id) {
  //         _state.selectedGroup = _state.groupList[0].id;
  //         this.setState(_state);

  //         // 投稿の一覧を再取得
  //         this.onSelectGroup(_state.selectedGroup, _state.isAdmin);
  //       }

  //       this.setState(_state);

  //       // エラーメッセージの消去
  //       this.setState({errorMessage: ''})
  //     } catch(error) {
  //       console.log(error)
  //     }
  //   }

  //   deleteGroupItem();
  // }

  /**
   * render
   */
  render() {
    return (
      <Router>
        <div className = "wrap">
          <Switch>
            <Route exact path="/" component={() => (
              <React.Fragment>
                <SideArea />
                <MainArea />
              </React.Fragment>
            )} />
            <Route path="/login" component={() => (
              <Login />
            )}/>
           <Route path="/logout" component={() => (
              <Logout />
            )}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: () => dispatch(boardActions.getInitialData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
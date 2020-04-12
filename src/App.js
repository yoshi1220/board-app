import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './board.scss';
import MainArea from './containers/mainArea';
import SideArea from './containers/sideArea';
import Login from './components/login';
import Logout from './components/logout';
import { boardActions } from './actions/boardActions';

import axios from 'axios';

// const BASE_URL = 'http://18.180.46.53'
// const BASE_URL = 'http://18.178.76.89'
const BASE_URL = 'http://localhost:3001'

class App extends React.Component {
  constructor(props) {
    super(props);

    let isAdmin = false;
    // ログイン済みの場合は管理者権限を与える
    if (sessionStorage.getItem('isAdmin') == 'true') {
      isAdmin = true;
    }

    // ダミーデータ
    this.state = {
      // カテゴリ一覧
      groupList: [
        {
          id: "1",
          name: " "
        }
      ],
      // 投稿一覧
      posts: [
        {
          label: " ",
          id: " ",
          name: " ",
          email: " ",
          content: " ",
          complete: true
        }
      ],
      // 選択中のカテゴリ
      selectedGroup: "1",
      // 管理者の判定
      isAdmin: isAdmin,
      // エラーメッセージ
      errorMessage: "",
    }

    // 初期データの取得処理
    const getInitialData = async () => {
      try {
        // グルーリストの内容を取得
        let res = await axios.get(BASE_URL + '/groups')
        this.setState({groupList: Array.from(res.data)})

        // 最初のグループを選択する
        const group_id = this.state.groupList[0].id;
        this.setState({selectedGroup: group_id});

        // 最初のグループの内容を初期データとして取得
        let _state = Object.assign({}, this.state);

        res = await axios.get(BASE_URL + `/boards/find/${group_id}?isAdmin=${_state.isAdmin}`)

        _state.posts = Array.from(res.data);

        // stateの更新
        this.setState(_state);

      } catch (error) {
        console.log('initial error');
        console.log(error);
      }
    }

    // データ初期化
    getInitialData();

    // reduxの初期値を取得
    this.props.getInitialData2();
  }

 
  /**
   * 新規カテゴリの追加
   */
  onAddGroup(groupName) {
    let _state = Object.assign({}, this.state);

    // 新しいカテゴリ
    let groupItem = {
      name: groupName
    };

    // カテゴリの新規登録
    const createGroupItem = async () => {
      try {
        let res = await axios.post(BASE_URL + '/groups', groupItem);

        // 登録されたカテゴリを一覧に表示
        let addedGroupItem = {
          id: res.data.id,
          name: res.data.name
        };
        _state.groupList.push(addedGroupItem);

        this.setState(_state);
        this.setState({errorMessage: ''})
      } catch(error) {
        this.setState({errorMessage: 'カテゴリ名を入力してください。'})
        console.log(error)
      }
    }

    createGroupItem();
  }

  /**
   * カテゴリ名の編集
   */
  onEditGroup(id, groupName) {
    let _state = Object.assign({}, this.state);

    let groupItem = {
      name: groupName
    }

    const updateGroupItem = async () => {
      try {
        await axios.patch(BASE_URL + `/groups/${id}`, groupItem);

        // 画面上の編集されたカテゴリの名称を更新
        for (let i = 0; i < _state.groupList.length; i++) {
          if (_state.groupList[i].id === id) {
            this.state.groupList[i].name = groupName;
            break;
          }
        }
        this.setState(_state);
        this.setState({errorMessage: ''})
      } catch(error) {
        console.log(error)
      }
    }

    updateGroupItem();
  }

  /**
   * カテゴリの削除
   */
  onDeleteGroup(id) {
    let _state = Object.assign({}, this.state);

    // カテゴリの削除
    const deleteGroupItem = async () => {
      try {
        await axios.delete(BASE_URL + `/groups/${id}`);

        // 画面上のカテゴリを削除
        for (let i = 0; i < _state.groupList.length; i++) {
          if (_state.groupList[i].id === id) {
            _state.groupList.splice(i, 1)
            break;
          }
        }

        // 選択中のカテゴリが削除された場合は、一番最初のカテゴリを選択し直す
        if (_state.selectedGroup === id) {
          _state.selectedGroup = _state.groupList[0].id;
          this.setState(_state);

          // 投稿の一覧を再取得
          this.onSelectGroup(_state.selectedGroup, _state.isAdmin);
        }

        this.setState(_state);

        // エラーメッセージの消去
        this.setState({errorMessage: ''})
      } catch(error) {
        console.log(error)
      }
    }

    deleteGroupItem();
  }

  /**
   * 管理者としてログイン
   */
  loginAsAdmin() {
    this.setState({isAdmin: true});
  }

  /**
   * 管理者からログアウト
   */
  logoutAsAdmin() {
    this.setState({isAdmin: false});
  }

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
                <MainArea
                  // groupName={groupName}
                  // isAdmin={this.state.isAdmin}
                  // boardList={this.state.posts}
                  // onAddPost={this.onAddPost.bind(this)}
                  // onCompletePost={this.onCompletePost.bind(this)}
                  // onDeletePost={this.onDeletePost.bind(this)}
                  // logoutAsAdmin={this.logoutAsAdmin.bind(this)}
                  // errorMessage={this.state.errorMessage}
                  // categoryCount={categoryCount}
                />
              </React.Fragment>
            )} />
            <Route path="/login" component={() => (
              <Login
                loginAsAdmin={this.loginAsAdmin.bind(this)}
                onSelect={this.onSelectGroup.bind(this)}
                groupId={this.state.selectedGroup}
                baseUrl={BASE_URL}
              />
            )}/>
           <Route path="/logout" component={() => (
              <Logout
                logoutAsAdmin={this.logoutAsAdmin.bind(this)}
                onSelect={this.onSelectGroup.bind(this)}
                groupId={this.state.selectedGroup}
              />
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
    getInitialData2: () => dispatch(boardActions.getInitialData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
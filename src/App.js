import React from 'react';
import './board.scss';
import MainArea from './components/mainArea';
import SideArea from './components/sideArea';
import Login from './components/login';
import Logout from './components/logout';

import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// const BASE_URL = 'http://18.180.46.53'
const BASE_URL = 'http://18.178.76.89'
// const BASE_URL = 'http://localhost:3001'

export default class App extends React.Component {
  constructor(props) {
    super(props);

      let isAdmin = false;
      // ログイン済みの場合は管理者権限を与える
      if (sessionStorage.getItem('isAdmin') == 'true') {
        isAdmin = true;
      }

    // ダミーデータ
    this.state = {
      groupList: [
        {
          id: "1",
          name: " "
        }
      ],
      boardList: {
        "1": [
          {
            label: " ",
            id: " ",
            name: " ",
            email: " ",
            content: " ",
            complete: true
          }
        ]
      },
      selectedGroup: "1",
      // postCount: 5,
      // groupCount: 1,
      isAdmin: isAdmin,
      categoryCount: 0,
      errorMessage: "",
    }

    // 初期データの取得処理
    const getInitialData = async () => {
      try {
        // グルーリストの内容を取得
        let res = await axios.get(BASE_URL + '/groups')
        this.setState({groupList: Array.from(res.data)})

        // 各グループリストの掲示内容を取得
        for (let i = 0; i < this.state.groupList.length; i++) {
          const group_id = this.state.groupList[i].id;
          if (i === 0) {
            this.setState({selectedGroup: group_id});
          }

          res = await axios.get(BASE_URL + `/boards/find/${group_id}`)

          let _state = Object.assign({}, this.state);
          _state.boardList[group_id] = Array.from(res.data);

          // カテゴリの投稿件数
          console.log('categoryCount: ' + Array.from(res.data).length);
          

          // stateの更新
          this.setState(_state);
        }

        // カテゴリの投稿件数を取得
        let _state = Object.assign({}, this.state);
        let count = _state.boardList[_state.selectedGroup].length;
        _state.categoryCount = count;
         // stateの更新
         this.setState(_state);

      } catch (error) {
        console.log(error);
      }
    }

    // データ初期化
    getInitialData();
  }

  /**
   * 投稿の新規追加
   */
  onAddPost(name, email, title, content) {
    let _state = Object.assign({}, this.state);

    // 新しい投稿
    let boardItem = {
      group_id: _state.selectedGroup,
      title: title,
      name: name,
      email: email,
      content: content,
      complete: false
    };

    // 投稿の新規登録
    const createBoardItem = async () => {
      try {
        let res = await axios.post(BASE_URL + '/boards', boardItem);

        // 追加された投稿を画面に表示
        let addedBoardItem = {
          id: res.data.id,
          title: res.data.title,
          name: res.data.name,
          email: res.data.email,
          content: res.data.content,
          complete: res.data.complete
        };

        _state.boardList[_state.selectedGroup].push(addedBoardItem);
        _state.categoryCount = _state.boardList[_state.selectedGroup].length;

        this.setState(_state);
        this.setState({errorMessage: ""})
      } catch(error) {
        console.log(error)
        // this.setState({errorMessage: error.response.data.content[0]})
        this.setState({errorMessage: '本文は必須入力です。'})
      }
    }

    createBoardItem();
  }

  /**
   * 投稿の削除（管理者専用）
   */
  onDeletePost(id) {
    let _state = Object.assign({}, this.state);

    // カテゴリの削除
    const deletePost = async () => {
      try {
        await axios.delete(BASE_URL + `/boards/${id}`);

       // 画面上の投稿を非表示にする
       let boardList = _state.boardList[_state.selectedGroup];
       for (let i = 0; i < boardList.length; i++) {
         if (boardList[i].id === id) {
           boardList.splice(i, 1)
           break;
         }
       }
       _state.categoryCount = boardList.length;
       this.setState(_state);

      } catch(error) {
        console.log(error)
      }
    }

    deletePost();
  }

  /**
   * 投稿の完了（非表示）
   */
  onCompletePost(id) {
    let _state = Object.assign({}, this.state);

    // 更新する投稿
    let boardItem = {
      complete: true
    }

    // 投稿の完了（非表示）
    const completeBoardItem = async () => {
      try {
        await axios.patch(BASE_URL + `/boards/${id}`, boardItem);

        // 画面上の投稿を非表示にする
        let boardList = _state.boardList[_state.selectedGroup];
        for (let i = 0; i < boardList.length; i++) {
          if (boardList[i].id === id) {
            boardList[i].complete = true;
            break;
          }
        }
        this.setState(_state);
      } catch(error) {
        console.log(error)
      }
    }

    completeBoardItem();
  }

  /**
   * グループの選択
   */
  onSelectGroup(id) {
    this.setState({selectedGroup: id});

    // カテゴリごとの投稿数
    let count = this.state.boardList[id].length;
    this.setState({categoryCount: count});
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
        _state.boardList[res.data.id] = [];

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

        // カテゴリ配下の投稿も削除
        delete _state.boardList[id];

        // 選択中のカテゴリが削除された場合は、一番最初のカテゴリを選択し直す
        if (_state.selectedGroup === id) {
          _state.selectedGroup = _state.groupList[0].id;
          _state.categoryCount = _state.boardList[_state.selectedGroup].length;
        }

        this.setState(_state);
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
    // 選択中のカテゴリ名を取得
    let groupName = "";
    for (let i = 0; i < this.state.groupList.length; i++) {
      if (this.state.groupList[i].id === this.state.selectedGroup) {
        groupName = this.state.groupList[i].name;
        break;
      }
    }

    return (
      <Router>
        <div className = "wrap">
          <Switch>
            <Route exact path="/" component={() => (
              <React.Fragment>
                <SideArea
                  groupList={this.state.groupList}
                  onSelect={this.onSelectGroup.bind(this)}
                  onAddGroup={this.onAddGroup.bind(this)}
                  onEditGroup={this.onEditGroup.bind(this)}
                  onDeleteGroup={this.onDeleteGroup.bind(this)}
                  isAdmin={this.state.isAdmin}
                />
                <MainArea
                  boardList={this.state.boardList[this.state.selectedGroup]}
                  onAddPost={this.onAddPost.bind(this)}
                  onCompletePost={this.onCompletePost.bind(this)}
                  onDeletePost={this.onDeletePost.bind(this)}
                  groupName={groupName}
                  isAdmin={this.state.isAdmin}
                  logoutAsAdmin={this.logoutAsAdmin.bind(this)}
                  errorMessage={this.state.errorMessage}
                  categoryCount={this.state.categoryCount}
                />
              </React.Fragment>
            )} />
            <Route path="/login" component={() => (
              <Login
                loginAsAdmin={this.loginAsAdmin.bind(this)}
                baseUrl={BASE_URL}
              />
            )}/>
           <Route path="/logout" component={() => (
              <Logout
                logoutAsAdmin={this.logoutAsAdmin.bind(this)}
              />
            )}/>
          </Switch>
        </div>
      </Router>

    );
  }
}
import React from 'react';
import './board.scss';
import MainArea from './components/mainArea';
import SideArea from './components/sideArea';
import Login from './components/login';
import Logout from './components/logout';

import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const BASE_URL = 'http://18.180.46.53'
// const BASE_URL = 'http://localhost:3001'


export default class App extends React.Component {
  constructor(props) {
    super(props);

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
      isAdmin: false,
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
          this.setState(_state);
        }
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

        this.setState(_state);
      } catch(error) {
        console.log(error)
      }
    }

    createBoardItem();
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
    this.setState({selectedGroup: id})
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

      } catch(error) {
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
        }

        this.setState(_state);

      } catch(error) {
        console.log(error)
      }
    }

    deleteGroupItem();
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
                />
                <MainArea
                  boardList={this.state.boardList[this.state.selectedGroup]}
                  onAddPost={this.onAddPost.bind(this)}
                  onCompletePost={this.onCompletePost.bind(this)}
                  groupName={groupName}
                />
              </React.Fragment>
            )} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>

    );
  }
}
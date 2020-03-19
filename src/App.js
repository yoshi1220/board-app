import React from 'react';
import './board.scss';
import MainArea from './components/mainArea';
import SideArea from './components/sideArea';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [
        {
          id: "main",
          name: "main"
        }
      ],
      boardList: {
        "1": [
          {
            label: "title1",
            id: "item-1",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力",
            complete: false
          }
        ]
      },
      selectedGroup: "1",
      postCount: 5,
      groupCount: 1,
    }

    // 初期データの取得処理
    const getInitialData = async () => {
      try {
        // グルーリストの内容を取得
        let res = await axios.get('http://localhost:3001/groups')
        this.setState({groupList: Array.from(res.data)})

        // 各グループリストの掲示内容を取得
        for (let i = 0; i < this.state.groupList.length; i++) {
          const group_id = this.state.groupList[i].id;
          if (i === 0) {
            this.setState({selectedGroup: group_id});
          }

          res = await axios.get(`http://localhost:3001/boards/find/${group_id}`)

          let _state = Object.assign({}, this.state);
          _state.boardList[group_id] = Array.from(res.data);
          this.setState(_state);
        }
      } catch (error) {
        const {
          status,
          statusText
        } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
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
    }

    // 投稿の新規登録
    const createBoardItem = async () => {
      try {
        let res = await axios.post('http://localhost:3001/boards', boardItem);
        console.log('finish');
      } catch(error) {
        console.log(error)
      }
    }

    createBoardItem();

    // 現在の投稿を再取得
    axios.get(`http://localhost:3001/boards/find/${_state.selectedGroup}`)
    .then((results) => {
      _state.boardList[_state.selectedGroup] = Array.from(results.data);
      this.setState(_state);
    })
    .catch((data) =>{
      console.log(data)
    })

    window.location.reload();
  }

  /**
   * 投稿の完了（非表示）
   */
  onCompleteTodo(id) {
    let _state = Object.assign({}, this.state);

    let boardList = _state.boardList[_state.selectedGroup];
    let board_id = 0
    for (let i = 0; i < boardList.length; i++) {
      if (boardList[i].id == id) {
        boardList[i].complete = true;
        break;
      }
    }
    this.setState(_state);

    // 更新する投稿
    let boardItem = {
      complete: true
    }

    // 投稿の完了（非表示）
    const completeBoardItem = async () => {
      try {
        let res = await axios.patch(`http://localhost:3001/boards/${id}`, boardItem);
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
    console.log("onSelectGroup", id);
    this.setState({selectedGroup: id})
  }

  onAddGroup(groupName) {
    let _state = Object.assign({}, this.state);
    // _state.groupCount++;
    // let groupId = "group-" + _state.groupCount
    // let groupItem = {
    //   id: groupId,
    //   name: groupName
    // }
    // _state.groupList.push(groupItem);
    // _state.todoList[groupId] = [];

    // this.setState(_state);

     // 新しいカテゴリ
     let groupItem = {
      name: groupName
    }

    // カテゴリの新規登録
    const createGroupItem = async () => {
      try {
        let res = await axios.post('http://localhost:3001/groups', groupItem);
        console.log('finish');
      } catch(error) {
        console.log(error)
      }
    }

    createGroupItem();

    // 現在のカテゴリ一覧を取得
    axios.get('http://localhost:3001/groups')
    .then((results) => {
      _state.groupList = Array.from(results.data);
      this.setState(_state);
    })
    .catch((data) =>{
      console.log(data)
    })

    window.location.reload();
  }

  onEditGroup(id, groupName) {
    let _state = Object.assign({}, this.state);

    for (let i = 0; i < this.state.groupList.length; i++) {
      if (this.state.groupList[i].id == id) {
        this.state.groupList[i].label = groupName;
        break;
      }
    }

    this.setState(_state);
  }

  onDeleteGroup(id) {
    let _state = Object.assign({}, this.state);
    
    for (let i = 0; i < this.state.groupList.length; i++) {
      if (this.state.groupList[i].id == id) {
        this.state.groupList.splice(i, 1)
        break;
      }
    }
    delete this.state.todoList[id];
    this.setState(_state);
  }

  render() {

    let groupName = "";
    for (let i = 0; i < this.state.groupList.length; i++) {
      if (this.state.groupList[i].id == this.state.selectedGroup) {
        groupName = this.state.groupList[i].name;
        break;
      }
    }

    return (
      <div className = "wrap">
        <SideArea
          groupList={this.state.groupList}
          onSelect={this.onSelectGroup.bind(this)}
          onAddGroup={this.onAddGroup.bind(this)}
          onEditGroup={this.onEditGroup.bind(this)}
          onDeleteGroup={this.onDeleteGroup.bind(this)}/>
        <MainArea
          boardList={this.state.boardList[this.state.selectedGroup]}
          onAddPost={this.onAddPost.bind(this)}
          onCompleteTodo={this.onCompleteTodo.bind(this)}
          groupName={groupName}
        />
      </div>
    );
  }
}
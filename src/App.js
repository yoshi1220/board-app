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
        },
        {
          id: "group-1",
          name: "group1"
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
          },
          {
            label: "title2",
            id: "item-2",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
          {
            label: "title5",
            id: "item-5",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
        ],
        "2": [
          {
            label: "title3",
            id: "item-3",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力",
            complete: false
          },
          {
            label: "title4",
            id: "item-4",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
        ]
      },
      todoList: {
        "1": [
          {
            label: "title1",
            id: "item-1",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力",
            complete: false
          },
          {
            label: "title2",
            id: "item-2",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
          {
            label: "title5",
            id: "item-5",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
        ],
        "2": [
          {
            label: "title3",
            id: "item-3",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力",
            complete: false
          },
          {
            label: "title4",
            id: "item-4",
            name: "匿名",
            email: "test@test.com",
            content: "テスト入力2",
            complete: false
          },
        ]
      },
      selectedGroup: "1",
      postCount: 5,
      groupCount: 1,
    }

    axios.get('http://localhost:3001/groups')
    .then((results) => {
      this.setState({groupList: Array.from(results.data)})

      for (let i = 0; i < this.state.groupList.length; i++) {
        const group_id = this.state.groupList[i].id;
        axios.get(`http://localhost:3001/boards/find/${group_id}`)
        .then((results) => {
          let _state = Object.assign({}, this.state);
          _state.boardList[group_id] = Array.from(results.data);
          this.setState(_state);
        })
        .catch((data) =>{
          console.log('error')
          console.log(data)
        })
      }
    })
    .catch((data) =>{
      console.log('error')
      console.log(data)
    });
  }

  /**
   * 投稿の新規追加
   */
  onAddPost(name, email, title, content) {
    let _state = Object.assign({}, this.state);
    _state.postCount++;
    console.log(name, email, title, content);
    let postList = _state.todoList[_state.selectedGroup];
    let postItem = {
      label: title,
      id: "item-" + _state.postCount,
      complete: false,
      email: email,
      name: name,
      content: content
    }
    postList.push(postItem);
    this.setState(_state);
  }

  onCompleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let boardList = _state.boardList[_state.selectedGroup];
    for (let i = 0; i < boardList.length; i++) {
      if (boardList[i].id == id) {
        boardList[i].complete = true;
        break;
      }
    }
    this.setState(_state);
  }

  onDeleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList.splice(i, 1);
        break;
      }
    }
    this.setState(_state);
  }

  onSelectGroup(id) {
    console.log("onSelectGroup", id);
    this.setState({selectedGroup: id})
  }

  onAddGroup(groupName) {
    let _state = Object.assign({}, this.state);
    _state.groupCount++;
    let groupId = "group-" + _state.groupCount
    let groupItem = {
      id: groupId,
      name: groupName
    }
    _state.groupList.push(groupItem);
    _state.todoList[groupId] = [];

    this.setState(_state);
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
          todoList={this.state.todoList[this.state.selectedGroup]}
          onAddPost={this.onAddPost.bind(this)}
          onCompleteTodo={this.onCompleteTodo.bind(this)}
          onDeleteTodo={this.onDeleteTodo.bind(this)}
          groupName={groupName}
        />
      </div>
    );
  }
}
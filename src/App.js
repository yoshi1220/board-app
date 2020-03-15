import React from 'react';
import './board.scss';
import MainArea from './components/mainArea';
import SideArea from './components/sideArea';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [
        {
          id: "main",
          label: "メイン"
        },
        {
          id: "group-1",
          label: "グループ1"
        }
      ],
      todoList: {
        "main": [
          { label: "Todo1", id: "item-1", complete: false },
          { label: "Todo2", id: "item-2", complete: false },
        ],
        "group-1": [
          { label: "Todo3", id: "item-4", complete: false },
          { label: "Todo4", id: "item-3", complete: false },
        ]
      },
      selectedGroup: "main",
      todoCount: 4,
      groupCount: 1,
    }
  }

  onAddTodo(label) {
    let _state = Object.assign({}, this.state);
    _state.todoCount++;
    let todoList = _state.todoList[_state.selectedGroup];
    let todoItem = {
      label: label,
      id: "item-" + _state.todoCount,
      complete: false
    }
    todoList.push(todoItem);
    this.setState(_state);
  }

  onCompleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList[i].complete = true;
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
      label: groupName
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
        groupName = this.state.groupList[i].label;
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
          todoList={this.state.todoList[this.state.selectedGroup]}
          onAddTodo={this.onAddTodo.bind(this)}
          onCompleteTodo={this.onCompleteTodo.bind(this)}
          onDeleteTodo={this.onDeleteTodo.bind(this)}
          groupName={groupName}
        />
      </div>
    );
  }
}
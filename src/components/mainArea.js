import React from 'react';
import Footer from './footer';
import Header from './header';
import Listitem from './listItem';

export default class MainArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoInputValue: "",
    }
  }

  renderTodoItems() {
    let todoItemDom = [];
    for (var i = 0; i < this.props.todoList.length; i++) {
      // let todoItem = <li className="todo-list-item" key={"item-" + i}>{this.state.todos[i]["label"]}</li>;
      if (!this.props.todoList[i]["complete"]) {
        let todoItem = <Listitem
          data={this.props.todoList[i]}
          key={"item" + i}
          completeTodo={this.onCompleteTodo.bind(this)}
          deleteTodo={this.onDeleteTodo.bind(this)}
        />
        todoItemDom.push(todoItem);
      }
    }
    return todoItemDom;
  }

  onCompleteTodo(id) {
    this.props.onCompleteTodo(id);
  }

  onDeleteTodo(id) {
    this.props.onDeleteTodo(id);
  }

  onClickAddButton(event) {
    this.props.onAddTodo(this.state.todoInputValue);
    this.setState({todoInputValue: ""});
  }

  onChangeTodoInput(event) {
    this.setState({todoInputValue: event.target.value});
    // this.props.onChange(event.target.value);
  }



  render() {
    return (
      <div className="main-area">
        <Header groupName={this.props.groupName}/>
        <main className="list-area">
          <div className="todo-input-area">
            <input
              type="text"
              className="board-input"
              placeholder="名前を入力"
              onChange={this.onChangeTodoInput.bind(this)}
              value={this.state.todoInputValue}>
            </input>
            <input
              type="text"
              className="board-input"
              placeholder="メールアドレスを入力"
              onChange={this.onChangeTodoInput.bind(this)}
              value={this.state.todoInputValue}>
            </input>
            <input
              type="text"
              className="board-input"
              placeholder="タイトルを入力"
              onChange={this.onChangeTodoInput.bind(this)}
              value={this.state.todoInputValue}>
            </input>
            <textarea
              className="board-content"
              placeholder="本文を入力"
            ></textarea>
            <button className="add-button" onClick={this.onClickAddButton.bind(this)}>登録</button>
          </div>
          <ul className="todo-list">
            {this.renderTodoItems()}
          </ul>
        </main>
        <Footer />
      </div>
    )
  }
}
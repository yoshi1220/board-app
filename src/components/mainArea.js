import React from 'react';
import Footer from './footer';
import Header from './header';
import Listitem from './listItem';

export default class MainArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: "",
      inputEmail: "",
      inputTitle: "",
      inputConten: ""
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
        />
        todoItemDom.push(todoItem);
      }
    }
    return todoItemDom;
  }

  /**
   * 投稿の非表示
   */
  onCompleteTodo(id) {
    this.props.onCompleteTodo(id);
  }

  // onDeleteTodo(id) {
  //   this.props.onDeleteTodo(id);
  // }

  /**
   * 投稿の新規追加
   */
  onClickAddButton(event) {
    this.props.onAddPost(
      this.state.inputName,
      this.state.inputEmail,
      this.state.inputTitle,
      this.state.inputContent
    );
    this.setState({
      inputName: "",
      inputEmail: "",
      inputTitle: "",
      inputContent: ""
    });
  }

  /**
   * テキストとstateの連携部分
   */
  onChangeInputName(event) {
    this.setState({inputName: event.target.value});
  }

  onChangeInputEmail(event) {
    this.setState({inputEmail: event.target.value});
  }

  onChangeInputTitle(event) {
    this.setState({inputTitle: event.target.value});
  }

  onChangeInputContent(event) {
    this.setState({inputContent: event.target.value});
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
              onChange={this.onChangeInputName.bind(this)}
              value={this.state.inputName}>
            </input>
            <input
              type="text"
              className="board-input"
              placeholder="メールアドレスを入力"
              onChange={this.onChangeInputEmail.bind(this)}
              value={this.state.inputEmail}>
            </input>
            <input
              type="text"
              className="board-input"
              placeholder="タイトルを入力"
              onChange={this.onChangeInputTitle.bind(this)}
              value={this.state.inputTitle}>
            </input>
            <textarea
              className="board-content"
              placeholder="本文を入力"
              onChange={this.onChangeInputContent.bind(this)}
              value={this.state.inputContent}
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
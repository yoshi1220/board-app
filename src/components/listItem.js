import React from 'react';

export default class ListItem extends React.Component {
  onChangeCheckBox(event) {
    console.log("onChangeCheckBox")
    this.props.completeTodo(event.target.value);
  }

  onClickDeleteButon(event) {
    this.props.deleteTodo(this.props.data.id);
  }

  render() {
    return (
      <li className="todo-list-item">
        <input
          type="checkbox"
          value={this.props.data.id}
          onChange={this.onChangeCheckBox.bind(this)}
        />
        {this.props.data["label"]}
        <button 
          className="delete-button" 
          onClick={this.onClickDeleteButon.bind(this)}>
          削除
        </button>
      </li>
    )
  }
}
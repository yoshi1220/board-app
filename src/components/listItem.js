import React from 'react';

export default class ListItem extends React.Component {
  // onChangeCheckBox(event) {
  //   this.props.completePost(event.target.value);
  // }

  onClickHiddenButon(event) {
    // this.props.deletePost(this.props.data.id);
    this.props.completePost(this.props.data.id);
  }

  render() {
    return (
      <li className="board-list-item">
        {/* <input
          type="checkbox"
          value={this.props.data.id}
          onChange={this.onChangeCheckBox.bind(this)}
        /> */}
        <ul>
          <li className="board-list-item-inside">{this.props.data["name"]}</li>
          <li className="board-list-item-inside">{this.props.data["email"]}</li>
          <li className="board-list-item-inside">{this.props.data["title"]}</li>
          <li className="board-list-item-inside">{this.props.data["content"]}</li>
        </ul>
        <button
          className="hidden-button"
          onClick={this.onClickHiddenButon.bind(this)}>
          非表示
        </button>
      </li>
    )
  }
}
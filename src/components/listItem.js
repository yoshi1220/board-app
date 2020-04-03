import React from 'react';

export default class ListItem extends React.Component {
  // onChangeCheckBox(event) {
  //   this.props.completePost(event.target.value);
  // }

  /**
   * 非表示ボタン押下処理
   */
  onClickHiddenButon(event) {
    // this.props.deletePost(this.props.data.id);
    this.props.completePost(this.props.data.id);
  }

  /**
   * 削除ボタン押下処理
   */
  onClickDeleteButton(event) {
    this.props.deletePost(this.props.data.id);
  }

  /**
   * 権限によって、非表示、削除ボタンの表示切り替え
   */
  renderButton() {
    let renderDom = '';

    if (this.props.isAdmin) {
      renderDom = <button
                    className="hidden-button"
                    onClick={this.onClickDeleteButton.bind(this)}>
                    削除（テスト用）
                  </button>;
    } else {
      renderDom = <button
                    className="hidden-button"
                    onClick={this.onClickHiddenButon.bind(this)}>
                    非表示
                  </button>;
    }

    return renderDom;
  }

  render() {
    return (
      <li className="board-list-item">
        <ul>
          <li className="board-list-item-inside">{this.props.data["name"]}</li>
          <li className="board-list-item-inside">{this.props.data["email"]}</li>
          <li className="board-list-item-inside">{this.props.data["title"]}</li>
          <li className="board-list-item-inside">{this.props.data["content"]}</li>
        </ul>
        {this.renderButton()}
      </li>
    )
  }
}
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

  

  /**
   * 投稿の非表示
   */
  onCompletePost(id) {
    this.props.onCompletePost(id);
  }

  onDeletePost(id) {
    this.props.onDeletePost(id);
  }

  /**
   * 投稿の新規追加
   */
  onClickAddButton(event) {
    this.props.onAddPost(
      this.props.selectedGroup,
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

  /**
   * 投稿の一覧を表示
   */
  renderBoardItems() {
    let boardItemDom = [];
    for (var i = 0; i < this.props.boardList.length; i++) {
      let boardItem = <Listitem
        data={this.props.boardList[i]}
        key={this.props.boardList[i].id}
        completePost={this.onCompletePost.bind(this)}
        deletePost={this.onDeletePost.bind(this)}
        isAdmin={this.props.isAdmin}
      />
      boardItemDom.push(boardItem);
    }
    return boardItemDom;
  }

  /**
   * エラーがある場合はエラーメッセージの表示
   */
  renderError() {
    let errorDom = '';

    if (this.props.errorMessage != "") {
      errorDom = <div className="error-message"><br />{this.props.errorMessage}<br /></div>
    } else {
      errorDom = <span></span>
    }

    return errorDom
  }

  render() {
    return (
      <div className="main-area">
        <Header
          groupName={this.props.groupName}
          isAdmin={this.props.isAdmin}
          logoutAsAdmin={this.props.logoutAsAdmin.bind(this)}
          categoryCount={this.props.categoryCount}
        />
        {this.renderError()}
        <main className="list-area">
          <div className="board-input-area">
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
          <ul className="board-list">
            {this.renderBoardItems()}
          </ul>
        </main>
        <Footer />
      </div>
    )
  }
}
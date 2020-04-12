import React from 'react';
import ReactDOM from 'react-dom';
import AddGroupDialog from './addGroupDialog';
import EditGroupDialog from './editGroupDialog';


export default class SideArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddGroupDialog: false,
      showEditGroupDialog: false,
      selectedGroup: undefined
    }
  }

  onClickGroup(id) {
    this.props.onSelect(id, this.props.isAdmin);
  }

  onClickAddGroup(event) {
    this.setState({showAddGroupDialog: true})
  }

  onSaveAddGroupDialog(groupName) {
    this.props.onAddGroup(groupName);
    this.setState({showAddGroupDialog: false})
  }

  onCancelAddGroupDialog() {
    this.setState({showAddGroupDialog: false})
  }

  onSaveEditGroupDialog(id, groupName) {
    this.props.onEditGroup(id, groupName);
    this.setState({showEditGroupDialog: false})
  }

  onCancelEditGroupDialog() {
    this.setState({showEditGroupDialog: false})
  }

  onDeleteEditGroupDialog(id) {
    this.props.onDeleteGroup(id, this.props.selectedGroup, this.props.groupList[0].id, this.props.isAdmin);
    this.setState({showEditGroupDialog: false})
  }

  onClickGroupEdit(event) {
    let editButton = ReactDOM.findDOMNode(event.target);
    let id = editButton.dataset.id;

    let selectedGroup;
    for (let i = 0; i < this.props.groupList.length; i++) {
      if (this.props.groupList[i].id == id) {
        selectedGroup = this.props.groupList[i];
        break;
      }
    }
    console.log(selectedGroup)
    this.setState({
      showEditGroupDialog: true,
      selectedGroup: selectedGroup
    })
  }

  /**
   * カテゴリ一覧の描画
   */
  renderGroup() {
    let groupListDom = [];
    for (let i = 0; i < this.props.groupList.length; i++) {
      const group = this.props.groupList[i];
      let groupItem
      if (this.props.isAdmin) {
        // 管理者の場合は編集ボタンを追加する
        groupItem = <li key={group.id}>
                      <span onClick={() => {this.onClickGroup(group.id)}}>{group.name}</span>
                      <button 
                        data-id={group.id}
                        className="group-edit-button"
                        onClick={this.onClickGroupEdit.bind(this)}>編集</button>
                    </li>;
      } else {
        groupItem = <li key={group.id}>
                      <span onClick={() => {this.onClickGroup(group.id)}}>{group.name}</span>
                    </li>;
      }
      groupListDom.push(groupItem);
    }
    return groupListDom;
  }

  /**
   * カテゴリ追加ボタンの描画
  */
  renderCategoryAddButton() {
    let renderDom = ''

    if (this.props.isAdmin) {
      renderDom = <button
                    className="add-group-button"
                    onClick={this.onClickAddGroup.bind(this)}>
                      カテゴリ新規作成
                  </button>
    } else {
      renderDom = <span></span>
    }

    return renderDom
  }

  render() {
    return (
      <div className="side-area">
        <ul className="group-list">
          {this.renderGroup()}
        </ul>
        <div className="side-area-footer">
          {this.renderCategoryAddButton()}
        </div>
        <AddGroupDialog
          show={this.state.showAddGroupDialog}
          onSave={this.onSaveAddGroupDialog.bind(this)}
          onCancel={this.onCancelAddGroupDialog.bind(this)}
        />
        <EditGroupDialog
          show={this.state.showEditGroupDialog}
          group={this.state.selectedGroup}
          onSave={this.onSaveEditGroupDialog.bind(this)}
          onCancel={this.onCancelEditGroupDialog.bind(this)}
          onDelete={this.onDeleteEditGroupDialog.bind(this)}
        />
      </div>
    )
  }
}

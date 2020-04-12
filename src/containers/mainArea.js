import { connect } from 'react-redux';
import { boardActions } from '../actions/boardActions';
import { loginLogoutActions } from '../actions/loginLogoutActions';
import MainArea from '../components/mainArea';

/**
 * カテゴリ名の取得
 */
function getGroupName(groupList, selectedGroup) {
  let groupName = "";
  for (let i = 0; i < groupList.length; i++) {
    if (groupList[i].id === selectedGroup) {
      groupName = groupList[i].name;
      break;
    }
  }
  return groupName;
}

/**
 * カテゴリの投稿件数を種痘
 * 管理者の場合のみ取得可能
 */
function getCategroyCount(isAdmin, postLength) {
  let categoryCount = ''
  if (isAdmin) {
    categoryCount = postLength;
  } 
  return categoryCount;
}

const mapStateToProps = (state) => {

  return {
    selectedGroup: state.selectedGroup,
    groupName: getGroupName(state.groupList, state.selectedGroup),
    isAdmin: state.isAdmin,
    categoryCount: getCategroyCount(state.isAdmin, state.posts.length),
    errorMessage: state.errorMessage,
    boardList: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (groupId, name, email, title, content) => {
      dispatch(boardActions.addPost(groupId, name, email, title, content));
    },
    onCompletePost: (id) => {
      console.log('onCompletePost');
      dispatch(boardActions.completePost(id));
    },
    onDeletePost: (id) => {
      dispatch(boardActions.deletePost(id));
    },
    logoutAsAdmin: () => {
      dispatch(loginLogoutActions.logoutAsAdmin());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainArea)


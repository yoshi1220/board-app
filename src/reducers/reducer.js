import { boardActionNames } from '../actions/boardActions';
import { groupActionNames } from '../actions/groupActions';
import { loginLogoutActionNames } from '../actions/loginLogoutActions';

import { groupActions } from '../actions/groupActions';

import _ from 'lodash';

const initialState = {
  // カテゴリ一覧
  groupList: [
    {
      id: "1",
      name: " "
    }
  ],
  // 投稿一覧
  posts: [
    {
      id: " ",
      title: " ",
      name: " ",
      email: " ",
      content: " ",
      complete: true
    }
  ],
  // 選択中のカテゴリ
  selectedGroup: "1",
  // 管理者の判定
  isAdmin: false,
  // エラーメッセージ
  errorMessage: "",
}

const reducer = (state = initialState, action) => {

  let _state = _.cloneDeep(state);

  switch (action.type) {

    /**
     * 初期データの取得処理
     */
    case boardActionNames.GET_INITIAL_DATA:

      _state.groupList = action.payload.groupList;
      _state.selectedGroup = action.payload.selectedGroup;
      _state.posts = action.payload.posts;
      _state.isAdmin = action.payload.isAdmin;

      return _state;

    /**
     * 投稿の新規追加
     */
    case boardActionNames.ADD_POST:
      let addedBoardItem = {
        id: action.payload.data.id,
        title: action.payload.data.title,
        name: action.payload.data.name,
        email: action.payload.data.email,
        content: action.payload.data.content,
        complete: action.payload.data.complete
      };

      _state.posts.push(addedBoardItem);
      _state.errorMessage = action.payload.errorMessage;

      return _state;

    /**
     * 投稿の完了処理（非表示）
     */
    case boardActionNames.COMPLETE_POST:
      // 画面上の投稿を非表示にする
      for (let i = 0; i < _state.posts.length; i++) {
        if (_state.posts[i].id === action.payload.id) {
          _state.posts.splice(i, 1)
          break;
        }
      }

      return _state;

    /**
     * 投稿の削除処理
     */
    case boardActionNames.DELETE_POST:
      // 画面上の投稿を削除する
      for (let i = 0; i < _state.posts.length; i++) {
        if (_state.posts[i].id === action.payload.id) {
          _state.posts.splice(i, 1)
          break;
        }
      }

      return _state;

    /**
     * カテゴリの追加処理
     */
    case groupActionNames.ADD_GROUP:
      // 登録されたカテゴリを一覧に表示
      let addedGroupItem = {
        id: action.payload.data.id,
        name: action.payload.data.name
      };
      _state.groupList.push(addedGroupItem);
      _state.errorMessage = action.payload.errorMessagel;

      return _state;

    /**
     * カテゴリの選択処理
     */
    case groupActionNames.SELECT_GROUP:
      _state.posts = action.payload.posts;
      _state.selectedGroup = action.payload.selectedGroup;

      return _state;

    /**
     * カテゴリの削除
     */
    case groupActionNames.DELETE_GROUP:
       // 画面上のカテゴリを削除
       for (let i = 0; i < _state.groupList.length; i++) {
        if (_state.groupList[i].id === action.payload.id) {
          _state.groupList.splice(i, 1)
          break;
        }
      }

      // 選択中のカテゴリが削除された場合は、一番最初のカテゴリを選択し直す
      if (_state.selectedGroup === action.payload.id) {
        _state.selectedGroup = _state.groupList[0].id;

        // 投稿の一覧を再取得
        groupActions.selectGroup(_state.id, _state.isAdmin);
      }

      _state.errorMessage = '';

      return _state;

    /**
     * 管理者ログイン処理
     */
    case loginLogoutActionNames.LOGIN:
      _state.isAdmin = action.payload.isAdmin;
      return _state;

    /**
     * 管理者ログアウト処理
     */
    case loginLogoutActionNames.LOGOUT:
      _state.isAdmin = action.payload.isAdmin;
      return _state;

    default:
      return state;
  }
}

export default reducer;
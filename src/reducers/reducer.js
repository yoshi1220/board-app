import { boardActionNames } from '../actions/boardActions';

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

  let _state = Object.assign({}, state);
  let posts;

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

      posts = Object.assign([], _state.posts);
      posts.push(addedBoardItem);
      _state.posts = posts;
      _state.errorMessage = action.payload.errorMessage;

      return _state;

    /**
     * 投稿の完了処理（非表示）
     */
    case boardActionNames.COMPLETE_POST:
      // 画面上の投稿を非表示にする
      posts = Object.assign([], _state.posts);
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === action.payload.id) {
          posts.splice(i, 1)
          break;
        }
      }
      _state.posts = posts;

      return _state

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

    default:
      return state;
  }
}

export default reducer;
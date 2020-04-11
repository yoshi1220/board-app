import { boardActionNames } from '../actions/boardActions';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'

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
      label: " ",
      id: " ",
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
  switch (action.type) {
    case boardActionNames.ADD_POST:
      let _state = Object.assign({}, state);

      // 新しい投稿
      let boardItem = {
        group_id: _state.selectedGroup,
        title: action.payload.title,
        name: action.payload.name,
        email: action.payload.email,
        content: action.payload.content,
        complete: false
      };

      // 投稿の新規登録
      const createBoardItem = async () => {
        try {
          let res = await axios.post(BASE_URL + '/boards', boardItem);

          // 追加された投稿を画面に表示
          let addedBoardItem = {
            id: res.data.id,
            title: res.data.title,
            name: res.data.name,
            email: res.data.email,
            content: res.data.content,
            complete: res.data.complete
          };

          _state.posts.push(addedBoardItem);
          _state.errorMessage = '';
          console.log('inside');
        } catch(error) {
          console.log(error)
          // this.setState({errorMessage: error.response.data.content[0]})
          _state.errorMessage = '本文は必須入力です。';
        }
      }

      console.log('before');
      console.log(createBoardItem());
      console.log('after')
      return _state;

    default:
      return state;
  }
}

export default reducer;
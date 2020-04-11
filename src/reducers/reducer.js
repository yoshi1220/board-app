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
  return state;
}

export default reducer;
import axios from 'axios';
import { BASE_URL } from './baseActions';


export const boardActionNames = {
  ADD_POST: 'ADD_POST',
  GET_INITIAL_DATA: 'GET_INITIAL_DATA',
  COMPLETE_POST: 'COMPLETE_POST',
  DELETE_POST: 'DELETE_POST'
}

export const boardActions = {
  getInitialData: () => {
    return async (dispatch) => {
      try {
        let isAdmin = false;
        // ログイン済みの場合は管理者権限を与える
        if (sessionStorage.getItem('isAdmin') == 'true') {
          isAdmin = true;
        }
        // グルーリストの内容を取得
        let resGroup = await axios.get(BASE_URL + '/groups')
        let groupList = Array.from(resGroup.data);

        // 最初のグループを選択する
        const group_id = groupList[0].id;
        let selectedGroup =  group_id;

        // 最初のグループの内容を初期データとして取得
        let resBoard = await axios.get(BASE_URL + `/boards/find/${group_id}?isAdmin=${isAdmin}`)
        let posts = Array.from(resBoard.data);

        dispatch({
          type: boardActionNames.GET_INITIAL_DATA,
          payload: {
            groupList: groupList,
            selectedGroup: selectedGroup,
            posts: posts,
            isAdmin: isAdmin
          }
        });

      } catch (error) {
        console.log('initial error');
        console.log(error);
      }
    }
  },
  addPost: (groupId, name, email, title, content) => {
    return async (dispatch) => {

      // 新しい投稿
      let boardItem = {
        group_id: groupId,
        title: title,
        name: name,
        email: email,
        content: content,
        complete: false
      };

      let errorMessage = '';
      let response;

      try {
        response = await axios.post(BASE_URL + '/boards', boardItem);
      } catch(error) {
        errorMessage = '本文は必須入力です。';
      }

      dispatch({
        type: boardActionNames.ADD_POST,
        payload: {
          data: response.data,
          errorMessage: errorMessage
        }
      });
    }
  },
  completePost: (id) => {
    return async (dispatch) => {
      // 更新する投稿
      let completePost = {
        complete: true
      }

      // 投稿の非表示処理
      await axios.patch(BASE_URL + `/boards/${id}`, completePost);

      dispatch({
        type: boardActionNames.COMPLETE_POST,
        payload: {
          id: id
        }
      });
    }
  },
  deletePost: (id) => {
    return async (dispatch) => {
      // 投稿の削除処理
      await axios.delete(BASE_URL + `/boards/${id}`);

      dispatch({
        type: boardActionNames.DELETE_POST,
        payload: {
          id: id
        }
      });
    }
  }
}
import axios from 'axios';
import { BASE_URL } from './baseActions';


export const groupActionNames = {
  ADD_GROUP: 'ADD_GROUP',
  SELECT_GROUP: 'SELECT_GROUP',
  EDIT_GROUP: 'EDIT_GROUP',
  DELETE_GROUP: 'DELETE_GROUP'
}

export const groupActions = {
  addGroup: (groupName) => {
    return async (dispatch) => {

      // 新しいカテゴリ
      let groupItem = {
        name: groupName
      };

      let errorMessage = '';
      let response;

      try {
        response = await axios.post(BASE_URL + '/groups', groupItem);
      } catch(error) {
        errorMessage = 'カテゴリ名を入力してください。';
      }

      dispatch({
        type: groupActionNames.ADD_GROUP,
        payload: {
          data: response.data,
          errorMessage: errorMessage
        }
      });
    }
  },
  selectGroup: (id, isAdmin) => {
    return async(dispatch) => {

      let response;

      try {
        response = await axios.get(BASE_URL + `/boards/find/${id}?isAdmin=${isAdmin}`);
      } catch(error) {
        console.log(error);
      }

      let posts = Array.from(response.data);

      dispatch({
        type: groupActionNames.SELECT_GROUP,
        payload: {
          posts: posts,
          selectedGroup: id
        }
      });
    }
  },
  editGroup: (id, groupName) => {
    return async(dispatch) => {
      // 更新するカテゴリの名称
      let groupItem = {
        name: groupName
      }

      try {
        await axios.patch(BASE_URL + `/groups/${id}`, groupItem);
      } catch(error) {
        console.log(error);
      }

      dispatch({
        type: groupActionNames.EDIT_GROUP,
        payload: {
          id: id,
          groupName: groupName,
          errorMessage: ''
        }
      });
    }
  },
  deleteGroup: (id) => {
    return async(dispatch) => {
      await axios.delete(BASE_URL + `/groups/${id}`);

      dispatch({
        type: groupActionNames.DELETE_GROUP,
        payload: {
          id: id
        }
      });
    }
  }
}
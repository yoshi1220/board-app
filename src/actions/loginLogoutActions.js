export const loginLogoutActionNames = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const loginLogoutActions = {
  loginAsAdmin: () => {
    return async(dispatch) => {
      dispatch({
        type: loginLogoutActionNames.LOGIN,
        payload: {
          isAdmin: true
        }
      });
    }
  },
  logoutAsAdmin: () => {
    return async(dispatch) => {
      dispatch({
        type: loginLogoutActionNames.LOGOUT,
        payload: {
          idAdmin: false
        }
      });
    }
  }
}
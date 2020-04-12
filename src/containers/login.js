import { connect } from 'react-redux';
import { groupActions } from '../actions/groupActions';
import { BASE_URL } from '../actions/baseActions';

import { loginLogoutActions } from '../actions/loginLogoutActions';
import Login from '../components/login';

const mapStateToProps = (state) => {
  return {
    groupId: state.selectedGroup,
    baseUrl: BASE_URL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAsAdmin: () => {
      dispatch(loginLogoutActions.loginAsAdmin());
    },
    onSelect: (id, isAdmin) => {
      dispatch(groupActions.selectGroup(id, isAdmin));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

import { connect } from 'react-redux';
import { groupActions } from '../actions/groupActions';

import Logout from '../components/logout';

const mapStateToProps = (state) => {
  return {
    groupId: state.selectedGroup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id, isAdmin) => {
      dispatch(groupActions.selectGroup(id, isAdmin));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)

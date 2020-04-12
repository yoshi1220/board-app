import { connect } from 'react-redux';
import SideArea from '../components/sideArea';
import { groupActions } from '../actions/groupActions';

const mapStateToProps = (state) => {
  return {
    groupList: state.groupList,
    selectedGroup: state.selectedGroup,
    isAdmin: state.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGroup: (groupName) => {
      dispatch(groupActions.addGroup(groupName));
    },
    onSelect: (id, isAdmin) => {
      dispatch(groupActions.selectGroup(id, isAdmin));
    },
    onEditGroup: (id, groupName) => {
      dispatch(groupActions.editGroup(id, groupName));
    },
    onDeleteGroup: (id, selectedGroup, nextGroup, isAdmin) => {
      dispatch(groupActions.deleteGroup(id, selectedGroup, nextGroup, isAdmin));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideArea)


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './board.scss';
import MainArea from './containers/mainArea';
import SideArea from './containers/sideArea';
import Login from './containers/login';
import Logout from './containers/logout';
import { boardActions } from './actions/boardActions';

class App extends React.Component {
  constructor(props) {
    super(props);

    // reduxの初期値を取得
    this.props.getInitialData();
  }

  /**
   * render
   */
  render() {
    return (
      <Router>
        <div className = "wrap">
          <Switch>
            <Route exact path="/" component={() => (
              <React.Fragment>
                <SideArea />
                <MainArea />
              </React.Fragment>
            )} />
            <Route path="/login" component={() => (
              <Login />
            )}/>
           <Route path="/logout" component={() => (
              <Logout />
            )}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: () => dispatch(boardActions.getInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
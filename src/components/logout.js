import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {

  render() {
    return (
      <Container className="center">
        <Row className="justify-content-md-center">
          <div>
            <h2>ログアウトしました</h2>
            <div className="text-center">
              <Link to="/">トップ画面へ</Link>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Logout)
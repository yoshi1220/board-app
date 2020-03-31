import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Logout extends React.Component {
  async componentDidMount() {
    // ログアウト処理
  }

  render() {
    return (
      <Container className="center">
        <Row className="justify-content-md-center">
          <div>
            <h2>ログアウトしました</h2>
            <div className="text-center">
              <Link to="/">Top画面へ</Link>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

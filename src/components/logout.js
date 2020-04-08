import React from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Logout extends React.Component {

  click = async () => {
    try {
      // 投稿一覧を再取得（管理者権限なし固定)
      this.props.onSelect(this.props.groupId, false);

      // トップ画面に戻る
      this.props.history.push('/');
      
    } catch (e) {
      console.log(e);
    }
  };


  render() {
    return (
      <Container className="center">
        <Row className="justify-content-md-center">
          <div>
            <h2>ログアウトしました</h2>
      
            <Button variant="primary" type="button" onClick={this.click}>
              トップ画面へ
            </Button>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Logout)
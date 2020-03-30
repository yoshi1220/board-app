import React from 'react';
import { Form, Button, Container, Row, Alert } from 'react-bootstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }

  click = async () => {
    try {
      this.props.history.push({ pathname: '/' }); //ひとまずルートに戻す
    } catch (e) {
      this.setState({ errMessage: 'メールアドレスかパスワードが違います' });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Container className="center">
        <Row className="justify-content-md-center">
          <Form>
            {this.state.errMessage && (
              <Alert variant="danger">{this.props.message}</Alert>
            )}
            <p>
              <b>ログイン</b>
            </p>
            <Form.Group controlId="email">
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control
                type="email"
                placeholder="メールアドレスを入力してください"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                type="password"
                placeholder="パスワードを入力してください"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={this.click}>
              ログイン
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

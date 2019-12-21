import { Button, Form, Icon, Input, message, Row, Col } from 'antd';
import React from 'react';

import { CtxApi } from '../../contexts/CtxApi';
import { useHistory } from 'react-router-dom';

const FrLoginWrapped = ({ form }) => {
  // START ~~> context

  // api
  const { svsApiPmonIdentity, svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // form field validator
  const { getFieldDecorator } = form;

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> handler

  // submit (log in)
  const handleSubmit = event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // log in to identity server -> set jwt to local storage
          await svsApiPmonIdentity.login({ username: values.username, password: values.password });

          // get logged user data
          const res = await svsApiPmon.sendRequest('user/information', 'get');

          message.success(`login success, hello ${res.name}`);

          // redirect to home
          history.replace('/');
        } catch (err) {
          isSubmittingSet(false);

          message.error(err);
        }
      }
    });
  };

  // END <~~ handler

  // START ~~> state

  // submitting flag
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // END <~~ effect

  return (
    <Form onSubmit={handleSubmit}>
      {/* username */}
      <Form.Item>
        {getFieldDecorator('username', { rules: [{ required: true, message: 'username is required' }] })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your username"></Input>
        )}
      </Form.Item>
      {/* password */}
      <Form.Item>
        {getFieldDecorator('password', { rules: [{ required: true, message: 'password is required' }] })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your password"
          ></Input.Password>
        )}
      </Form.Item>
      {/* submit button */}
      <Button block type="primary" htmlType="submit" icon="login" loading={isSubmitting}>
        Log In
      </Button>
      {/* additional */}
      <Row style={{ marginTop: 10 }}>
        {/* register */}
        <Col span={12}>
          <Button block type="link" disabled={isSubmitting} onClick={() => history.push('register')}>
            Register
          </Button>
        </Col>
        {/* forgot password */}
        <Col span={12}>
          <Button block type="link" disabled={isSubmitting} onClick={() => history.push('forgotpassword')}>
            Forgot password
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const FrLogin = Form.create()(FrLoginWrapped);

export default FrLogin;

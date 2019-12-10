import { Button, Form, Icon, Input, message } from 'antd';
import React from 'react';

import { CtxApi } from '../../contexts/CtxApi';

const FrLoginWrapped = ({ form, history }) => {
  // state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // context
  const { svsApiPmonIdentity, svsApiPmon } = React.useContext(CtxApi);

  // others
  // form field validator
  const { getFieldDecorator } = form;

  // effect

  // handlers
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
          const res = await svsApiPmon.sendRequest('muser', 'get');

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

  return (
    <Form onSubmit={handleSubmit}>
      {/* username */}
      <Form.Item>{getFieldDecorator('username', { rules: [{ required: true, message: 'username is required' }] })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your username'></Input>)}</Form.Item>
      {/* password */}
      <Form.Item>
        {getFieldDecorator('password', { rules: [{ required: true, message: 'password is required' }] })(<Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your password'></Input.Password>)}
      </Form.Item>
      {/* submit button */}
      <Button block type='primary' htmlType='submit' loading={isSubmitting}>
        Log In
      </Button>
    </Form>
  );
};

const FrLogin = Form.create()(FrLoginWrapped);

export default FrLogin;

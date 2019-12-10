import React from 'react';
import { Form, message, Input, Icon, Button, Row, Col, InputNumber } from 'antd';
import { CtxLayouting } from '../../contexts/CtxLayouting';
import { CtxApi } from '../../contexts/CtxApi';

const FrRegisterWrapped = ({ form, history }) => {
  // state
  const [isPasswordDirty, isPasswordDirtySet] = React.useState(false);
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // context
  const { svsApiPmonIdentity, svsApiPmon } = React.useContext(CtxApi);
  const { formItemLayout } = React.useContext(CtxLayouting);

  // effect

  // others
  const { getFieldDecorator } = form;

  // handler
  // submit (register)
  const handleSubmit = event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // register user to identity server
          await svsApiPmonIdentity.sendRequest('register', 'post', { ...values });

          message.success('register success');

          // log in to identity server -> set jwt to local storage
          await svsApiPmonIdentity.login({ username: values.username, password: values.password });

          // get logged user data
          const res = await svsApiPmon.sendRequest('muser', 'get');

          message.success(`welcome, ${res.name}`);

          // redirect to home
          history.replace('/');
        } catch (err) {
          isSubmittingSet(false);

          message.error(err);
        }
      }
    });
  };
  // confirm password dirty handler
  // whether to validate passwordConfirm based
  const handlePasswordConfirmBlur = event => isPasswordDirtySet(isPasswordDirty || !!event.target.value);

  // validators
  // password matching
  const matchToConfirmPassword = (rule, value, callback) => {
    if (value && isPasswordDirty) form.validateFields(['passwordConfirm'], { force: true });
    callback();
  };
  const matchToPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) callback('password does not match');
    else callback();
  };

  return (
    <Form {...formItemLayout.body} onSubmit={handleSubmit}>
      {/* Username */}
      <Form.Item hasFeedback label='Username'>
        {getFieldDecorator('username', { rules: [{ required: true, message: 'username is required' }] })(<Input autoComplete='off' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your username'></Input>)}
      </Form.Item>
      {/* Password */}
      <Form.Item hasFeedback label='Password'>
        {getFieldDecorator('password', { rules: [{ required: true, message: 'password is required' }, { validator: matchToConfirmPassword }] })(
          <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your password'></Input.Password>
        )}
      </Form.Item>
      {/* Confirm password */}
      <Form.Item hasFeedback label='Confirm password'>
        {getFieldDecorator('passwordConfirm', { rules: [{ required: true, message: 'password does not match' }, { validator: matchToPassword }] })(
          <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Confirm your password' onBlur={handlePasswordConfirmBlur}></Input.Password>
        )}
      </Form.Item>
      {/* Name */}
      <Form.Item hasFeedback label='Name'>
        {getFieldDecorator('name', { rules: [{ required: true, message: 'name is required' }] })(<Input autoComplete='off' prefix={<Icon type='idcard' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your name'></Input>)}
      </Form.Item>
      {/* Worker identity number */}
      <Form.Item hasFeedback label='Worker identity number'>
        {getFieldDecorator('nik', {
          rules: [
            { required: true, message: 'worker identity number is required' },
            { type: 'number', min: 1000000000, max: 9999999999, message: 'must be 10 digits length' }
          ]
        })(<InputNumber placeholder='Your worker identity number' min={0} maxLength={10} style={{ width: '100%' }}></InputNumber>)}
      </Form.Item>
      {/* Email */}
      <Form.Item hasFeedback label='Email'>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'email is required' },
            { type: 'email', message: 'email format is incorrect' }
          ]
        })(<Input autoComplete='off' prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Your email'></Input>)}
      </Form.Item>
      {/* Extension number */}
      <Form.Item hasFeedback label='Extension number'>
        {getFieldDecorator('ext', {
          rules: [
            { required: true, message: 'extension number is required' },
            { type: 'number', min: 100, max: 9999, message: 'must be between 3 - 4 digits' }
          ]
        })(<InputNumber placeholder='Your extension number' min={100} maxLength={4} style={{ width: '100%' }}></InputNumber>)}
      </Form.Item>
      {/* submit button */}
      <Form.Item {...formItemLayout.action}>
        <Row>
          {/* back button */}
          <Col span={12}>
            <Button block type='link' loading={isSubmitting} onClick={() => history.push('/login')}>
              Back
            </Button>
          </Col>
          {/* register button */}
          <Col span={12}>
            <Button block type='primary' htmlType='submit' loading={isSubmitting}>
              Register
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

const FrRegister = Form.create()(FrRegisterWrapped);

export default FrRegister;

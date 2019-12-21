import React from 'react';
import { Form, Input, Icon, message, Button } from 'antd';
import { CtxLayouting } from '../../../contexts/CtxLayouting';
import { CtxApi } from '../../../contexts/CtxApi';
import { useHistory } from 'react-router-dom';

const AccountPasswordEdWrapped = ({ form }) => {
  // START ~~> context

  // api
  const { svsApiPmonIdentity } = React.useContext(CtxApi);

  // form layouting
  const { formItemLayout } = React.useContext(CtxLayouting);

  // END <~~ context

  // START ~~> other

  // form field validator
  const { getFieldDecorator } = form;

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> state

  // main data
  const [data, dataSet] = React.useState({ passwordOld: '', passwordNew: '', passwordNewConfirm: '' });

  // password dirty
  const [isPasswordDirty, isPasswordDirtySet] = React.useState(false);

  // form submitting
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // END <~~ effect

  // START ~~> handler

  // submit (edit password)
  const handleSubmit = async event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // change user password from identity server
          await svsApiPmonIdentity.sendRequest('user/changepassword', 'post', { ...values });

          message.success('password changed successfully');

          // redirect to home
          history.replace('/');
        } catch (err) {
          isSubmittingSet(false);

          message.error(err);
        }
      }
    });
  };

  // password confirmation handler
  // whether to validate 'passwordConfirm' based on password is dirty or not
  const handlePasswordConfirmBlur = event => isPasswordDirtySet(isPasswordDirty || !!event.target.value);
  // match 'password' with 'passwordConfirm'
  const matchToConfirmPassword = (rule, value, callback) => {
    if (value && isPasswordDirty) form.validateFields(['passwordConfirm'], { force: true });
    callback();
  };
  // match 'passwordConfirm' with 'password'
  const matchToPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) callback('password does not match');
    else callback();
  };

  // END <~~ handler

  return (
    <Form {...formItemLayout.body} onSubmit={handleSubmit} className="account-password">
      {/* Old password */}
      <Form.Item hasFeedback label="Old password">
        {getFieldDecorator('passwordOld', {
          rules: [{ required: true, message: 'old password is required' }, { validator: matchToConfirmPassword }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your old password"
          ></Input.Password>
        )}
      </Form.Item>
      {/* New password */}
      <Form.Item hasFeedback label="New password">
        {getFieldDecorator('passwordNew', {
          rules: [{ required: true, message: 'new password is required' }, { validator: matchToConfirmPassword }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your new password"
          ></Input.Password>
        )}
      </Form.Item>
      {/* Confirm new password */}
      <Form.Item hasFeedback label="Confirm new password">
        {getFieldDecorator('passwordNewConfirm', {
          rules: [{ required: true, message: 'new password does not match' }, { validator: matchToPassword }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm your new password"
            onBlur={handlePasswordConfirmBlur}
          ></Input.Password>
        )}
      </Form.Item>
      {/* submit button */}
      <Button block type="primary" htmlType="submit" icon="save" loading={isSubmitting}>
        Change password
      </Button>
    </Form>
  );
};

const AccountPasswordEd = Form.create()(AccountPasswordEdWrapped);

export default AccountPasswordEd;

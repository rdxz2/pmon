import { Button, Form, Icon, Input, InputNumber, message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { CtxApi } from '../../../contexts/CtxApi';
import { CtxLayouting } from '../../../contexts/CtxLayouting';

const AccountInformationEdWrapped = ({ dataAccountInformation, form }) => {
  // START --- state

  // loading
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END --- state

  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // form layouting
  const { formItemLayout } = React.useContext(CtxLayouting);

  // END --- context

  // START --- other variables

  // form field validator
  const { getFieldDecorator, resetFields } = form;

  // END --- other variables

  // START --- handler

  // submit form (edit)
  const handleSubmit = event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // send request to server
          await svsApiPmon.sendRequest('user/editinformation', 'post', { ...values });

          // reset the form
          resetFields();
        } catch (err) {
          message.error(err);
        } finally {
          isSubmittingSet(false);
        }
      }
    });
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <Form {...formItemLayout.body} onSubmit={handleSubmit}>
      {/* Name */}
      <Form.Item hasFeedback label="Name">
        {getFieldDecorator('name', {
          initialValue: dataAccountInformation.name,
          rules: [{ required: true, message: 'name is required' }]
        })(
          <Input
            autoComplete="off"
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your name"
          ></Input>
        )}
      </Form.Item>
      {/* Worker identity number */}
      <Form.Item hasFeedback label="Worker identity number">
        {getFieldDecorator('nik', {
          initialValue: dataAccountInformation.nik,
          rules: [
            { required: true, message: 'worker identity number is required' },
            { type: 'number', min: 1000000000, max: 9999999999, message: 'must be 10 digits length' }
          ]
        })(
          <InputNumber
            placeholder="Your worker identity number"
            min={0}
            maxLength={10}
            style={{ width: '100%' }}
          ></InputNumber>
        )}
      </Form.Item>
      {/* Email */}
      <Form.Item hasFeedback label="Email">
        {getFieldDecorator('email', {
          initialValue: dataAccountInformation.email,
          rules: [
            { required: true, message: 'email is required' },
            { type: 'email', message: 'email format is incorrect' }
          ]
        })(
          <Input
            autoComplete="off"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your email"
          ></Input>
        )}
      </Form.Item>
      {/* Extension number */}
      <Form.Item hasFeedback label="Extension number">
        {getFieldDecorator('ext', {
          initialValue: dataAccountInformation.ext,
          rules: [
            { required: true, message: 'extension number is required' },
            { type: 'number', min: 100, max: 9999, message: 'must be between 3 - 4 digits' }
          ]
        })(
          <InputNumber
            placeholder="Your extension number"
            min={100}
            maxLength={4}
            style={{ width: '100%' }}
          ></InputNumber>
        )}
      </Form.Item>
      {/* submit button */}
      <Form.Item>
        <Button block type="primary" htmlType="submit" icon="save" loading={isSubmitting}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const AccountInformationEd = Form.create()(AccountInformationEdWrapped);

export default AccountInformationEd;

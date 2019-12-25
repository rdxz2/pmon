import React from 'react';
import { Row, Col, Button, Form, message, InputNumber, Typography } from 'antd';
import ColorPicker from 'rc-color-picker/lib/ColorPicker';

const ColumnSettingEdWrapped = ({
  uuid,
  name,
  dataSetting,
  handleToggleIsEditingSetting,
  handleEditColumnSetting,
  form
}) => {
  // START --- context

  // END --- context

  // START --- state

  // color picker
  const [color, colorSet] = React.useState({ color: dataSetting.color, alpha: dataSetting.alpha });

  // submitting flag
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END --- state

  // START --- other variables

  // form field validator
  const { getFieldDecorator } = form;

  // END --- other variables

  // START --- handler

  // handle color change
  const handleChangeColor = value => colorSet({ ...value });

  // submit (edit column setting)
  const handleSubmit = async event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // send request to server (all form values + color values)
          await handleEditColumnSetting(uuid, { ...values, ...color });

          message.success(`Success saving column setting!`);
        } catch (err) {
          isSubmittingSet(false);

          message.error(err);
        }
      }
    });

    // close this component
    handleToggleIsEditingSetting();
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* header */}
      <Typography.Title level={4}>Edit {name}'s setting</Typography.Title>
      {/* form */}
      <Form onSubmit={handleSubmit}>
        {/* Maximum displayed card */}
        <Form.Item hasFeedback label="Maximum displayed card">
          {getFieldDecorator('maxCardDisplayed', {
            initialValue: dataSetting.maxCardDisplayed,
            rules: [
              { required: true, message: 'maximum displayed card is required' },
              {
                type: 'number',
                min: 0,
                max: 99,
                message: 'for performance reasons we limit displaying card to 99 per column'
              }
            ]
          })(<InputNumber placeholder="Maximum displayd card on this column" min={0} maxLength={2}></InputNumber>)}
        </Form.Item>
        {/* color picker */}
        <Form.Item label="Column color">
          <ColorPicker
            animation="slide-up"
            color={color.color}
            alpha={color.alpha}
            onChange={handleChangeColor}
          ></ColorPicker>
        </Form.Item>
        {/* action buttons */}
        <Row className="card-create-actions" gutter={4}>
          {/* back */}
          <Col span={12}>
            <Button size="small" type="dashed" icon="close" onClick={handleToggleIsEditingSetting}></Button>
          </Col>
          {/* submit */}
          <Col span={12}>
            <Button size="small" type="primary" htmlType="submit" icon="check"></Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const ColumnSettingEd = Form.create()(ColumnSettingEdWrapped);

export default ColumnSettingEd;

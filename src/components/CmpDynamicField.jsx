import React from 'react';
import { Form, Button, Icon, Row, Col } from 'antd';
import './CmpDynamicField.css';
import { isEmptyArray } from '../utilities/UtlDataManipulator';
let id = 1;

const CmpDynamicField = ({ initialValues, name, fields, form }) => {
  // START ~~> state

  // END <~~ state

  // START ~~> context

  // END <~~ context

  // START ~~> other

  // form field validation
  const { getFieldDecorator, getFieldValue, setFieldsValue, setFieldsInitialValue } = form;

  // END <~~ other

  // START ~~> handler

  // add a field
  const handleAddField = () => {
    // get list of field's key
    const keys = getFieldValue(`${name}List`);

    // append one key
    const nextKeys = keys.concat(id++);

    // set added field
    setFieldsValue({
      [`${name}List`]: nextKeys
    });
  };

  // remove a field
  const handleRemoveField = k => {
    // get list of field's key
    const keys = getFieldValue(`${name}List`);

    // cannot delete if there are noly one field
    if (keys.length === 1) return;

    // remove deleted field
    setFieldsValue({
      [`${name}List`]: keys.filter(key => key !== k)
    });
  };

  // set default validation
  const handleSetDefaultValidation = _name => ({
    validateTrigger: ['onBlur'],
    rules: [
      {
        required: true,
        whitespace: true,
        message: `${_name} is required`
      }
    ]
  });

  // render multiple fields
  const handleRenderMultipleFields = () => {
    // getFieldDecorator(`${name}List`, {
    //   initialValue: !isEmptyArray(initialValues) ? initialValues.map((v, k) => k) : [0]
    // });
    // getFieldDecorator(name, { initialValue: !isEmptyArray(initialValues) ? [...initialValues] : [{}] });

    getFieldDecorator(`${name}List`);
    getFieldDecorator(name);

    const fieldCounter = getFieldValue(`${name}List`);

    console.log('getFieldValue1', getFieldValue(`${name}List`));
    console.log('getFieldValue2', getFieldValue(name));

    return fieldCounter.map((v, k) => (
      // render rows
      <Row key={k} gutter={8}>
        {/* render columns */}
        {fields.map((_v, _k) => (
          <Col span={_v.colSpan} key={`${k}${_v.name}`}>
            <Form.Item hasFeedback>
              {getFieldDecorator(`${name}[${k}][${_v.name}]`, {
                validateTrigger: ['onBlur'],
                rule: []
              })(_v.field())}
            </Form.Item>
          </Col>
        ))}
        {/* remove button */}
        <Col className="dynamic-field-button-remove" span={3}>
          <Button type="danger" icon="minus-circle-o" onClick={() => handleRemoveField(k)} />
        </Col>
      </Row>
    ));

    return fieldCounter.reduce((v, k) => {
      const row = fields.map((_v, _k) => (
        <Form.Item key={`${k}${_v.name}`}>
          {getFieldDecorator(
            `${name}[${k}][${_v.name}]`,
            _v.validation || handleSetDefaultValidation(name)
          )(_v.field())}
          {fieldCounter.length > 1 && fields.length - 1 === _k ? (
            <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => handleRemoveField(k)} />
          ) : null}
        </Form.Item>
      ));

      return [...v, ...row];
    }, []);
  };

  // render single fields
  const handleRenderSingleFields = () => {
    getFieldDecorator(`${name}List`, { initialValue: [0] });

    const fieldCounter = getFieldValue(`${name}List`);

    return fieldCounter.map(k => (
      <Row key={k} gutter={8}>
        <Col span={21}>
          {/* input field */}
          <Form.Item hasFeedback>
            {getFieldDecorator(`${name}[${k}]`, {
              validateTrigger: ['onBlur'],
              rule: []
            })(fields.field())}
          </Form.Item>
        </Col>
        {/* remove button */}
        <Col className="dynamic-field-button-remove" span={3}>
          <Button type="danger" icon="minus-circle-o" onClick={() => handleRemoveField(k)} />
        </Col>
      </Row>
    ));
  };

  // END <~~ handler

  // START ~~> effect

  // load initial data
  React.useState(() => {
    if (!isEmptyArray(initialValues)) {
      const keys = [];

      initialValues.forEach((v, k) => keys.push(k));

      getFieldDecorator(`${name}List`, { initialValue: [...keys] });
      getFieldDecorator(name, { initialValue: [...initialValues] });
    }
  }, [initialValues]);

  // END <~~ effect

  return (
    <div className="dynamic-field">
      {/* render input fields */}
      {Array.isArray(fields) ? handleRenderMultipleFields() : handleRenderSingleFields()}
      {/* add button */}
      <Form.Item className="dynamic-field-button-add">
        <Button block type="dashed" onClick={handleAddField}>
          <Icon type="plus-circle-o"></Icon>
          Add {name}
        </Button>
      </Form.Item>
    </div>
  );
};

export default CmpDynamicField;

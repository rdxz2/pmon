import React from 'react';
import { Form, Button, Icon, Row, Col } from 'antd';
import './CmpDynamicField.css';
import { isEmptyArray } from '../utilities/UtlDataManipulator';
let id = 1;

const CmpDynamicField = ({ initialValue, name, fields, form }) => {
  // START ~~> state

  // END <~~ state

  // START ~~> context

  // END <~~ context

  // START ~~> other

  // form field validation
  const { getFieldDecorator, getFieldValue, setFieldsValue, setFieldsInitialValue } = form;

  console.log(setFieldsInitialValue);

  // END <~~ other

  // START ~~> handler

  // add a field
  const handleAddField = () => {
    // get list of field's key
    const keys = getFieldValue(`${name}List`);

    console.log('ekys', keys);

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
  // const handleSetDefaultValidation = _name => ({
  //   validateTrigger: ['onBlur'],
  //   rules: [
  //     {
  //       required: true,
  //       whitespace: true,
  //       message: `${_name} is required`
  //     }
  //   ]
  // });

  // render multiple fields
  const handleRenderMultipleFields = () => {
    console.log('is not empty array', !isEmptyArray(initialValue));

    getFieldDecorator(`${name}List`, {
      initialValue: !isEmptyArray(initialValue) ? initialValue.map((v, k) => k) : [0]
    });
    // getFieldDecorator(name, { initialValue: !isEmptyArray(initialValue) ? [...initialValue] : [] });

    const fieldsCounter = getFieldValue(`${name}List`);

    console.log('xxx', getFieldValue(`${name}List`));
    console.log('xxx', getFieldValue(name));

    return fieldsCounter.map((v, k) => {
      // render rows
      return (
        <Row key={k} gutter={8}>
          {/* render columns */}
          {fields.map((_v, _k) => {
            console.log('mapping', name, k, _v.name);
            return (
              <Col span={_v.colSpan} key={`${_k}${_v.name}`}>
                <Form.Item hasFeedback>
                  {getFieldDecorator(`${name}[${k}][${_v.name}]`, {
                    validateTrigger: ['onBlur'],
                    rule: []
                  })(_v.field())}
                </Form.Item>
              </Col>
            );
          })}
          {/* remove button */}
          <Col className="dynamic-field-button-remove" span={3}>
            <Button type="danger" icon="minus-circle-o" onClick={() => handleRemoveField(k)} />
          </Col>
        </Row>
      );
    });
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
  // React.useState(() => {
  //   if (!isEmptyArray(initialValue)) {
  //     const keys = [];

  //     initialValue.forEach((v, k) => keys.push(k));

  //     getFieldDecorator(`${name}List`, { initialValue: [0] });
  //     getFieldDecorator(name, { initialValue: [{}] });

  //     setFieldsValue({
  //       // set data count
  //       [`${name}List`]: keys,
  //       // set initial data
  //       [name]: initialValue
  //     });
  //   }
  // }, [initialValue]);

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

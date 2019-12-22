import React from 'react';
import { Form, Button, Icon, Row, Col } from 'antd';
import './CmpDynamicField.css';
import { isEmptyArray } from '../utilities/UtlDataManipulator';

const CmpDynamicField = ({ initialValues, name, fields, form }) => {
  // START --- state

  // initial values count
  const [initialValuesCount] = React.useState(!isEmptyArray(initialValues) ? initialValues.length : 0);

  // END --- state

  // START --- context

  // END --- context

  // START --- other variables

  // form field validation
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

  // current data (array) to be submitted length (includes empty array index)
  const [currentDataLength, currentDataLengthSet] = React.useState(0);

  // END --- other variables

  // START --- handler

  // add a field
  const handleAddField = () => {
    let _count = currentDataLength;

    // get list of field's key
    const keys = getFieldValue(`${name}List`);

    // append one key
    const nextKeys = keys.concat(_count++);

    // set added field
    setFieldsValue({
      [`${name}List`]: nextKeys
    });

    // set state
    currentDataLengthSet(_count);
  };

  // remove a field
  const handleRemoveField = k => {
    // get list of field's key
    const keys = getFieldValue(`${name}List`);

    // cannot delete if there are only one field
    // if (keys.length === 1) return;

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

  // render single fields
  const handleRenderSingleFields = () => {
    const hasInitialValues = !isEmptyArray(initialValues);

    getFieldDecorator(`${name}List`, {
      initialValue: hasInitialValues ? initialValues.map((v, k) => k) : []
    });

    const fieldCounter = getFieldValue(`${name}List`);

    return fieldCounter.map(k => (
      <Row key={k} gutter={8}>
        <Col span={21}>
          {/* input field */}
          <Form.Item hasFeedback>
            {getFieldDecorator(`${name}[${k}]`, {
              initialValue: initialValues ? initialValues[k] : '',
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

  // render multiple fields
  const handleRenderMultipleFields = () => {
    const hasInitialValues = !isEmptyArray(initialValues);

    getFieldDecorator(`${name}List`, {
      initialValue: hasInitialValues ? initialValues.map((v, k) => k) : []
    });

    const fieldCounter = getFieldValue(`${name}List`);

    return fieldCounter.map(k => (
      // render rows
      <Row key={k} gutter={8}>
        {/* render columns */}
        {fields.map((_v, _k) => (
          <Col span={_v.colSpan} key={`${k}${_v.name}`}>
            <Form.Item hasFeedback>
              {getFieldDecorator(`${name}[${k}][${_v.name}]`, {
                initialValue: hasInitialValues ? (initialValues[k] ? initialValues[k][_v.name] : '') : '',
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
  };

  // END --- handler

  // START --- effect

  // load initial data
  React.useEffect(() => {
    // set state
    currentDataLengthSet(_currentDataLength => {
      // iterate data length based on initial values count
      for (let a = 0; a < initialValuesCount; a++) _currentDataLength++;
      return _currentDataLength;
    });
  }, [initialValuesCount]);

  // END --- effect

  return (
    <div className="dynamic-field">
      {/* render input fields */}
      {Array.isArray(fields) ? handleRenderMultipleFields() : handleRenderSingleFields()}
      {/* add button */}
      <Form.Item className="dynamic-field-button-add">
        <Row>
          <Col span={21}>
            <Button block type="dashed" onClick={handleAddField}>
              <Icon type="plus-circle-o"></Icon>
              Add {name}
            </Button>
          </Col>
          <Col span={3}></Col>
        </Row>
      </Form.Item>
    </div>
  );
};

export default CmpDynamicField;

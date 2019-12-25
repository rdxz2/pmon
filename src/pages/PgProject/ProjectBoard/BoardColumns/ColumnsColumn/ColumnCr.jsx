import React from 'react';
import { Input, Row, Col, Button } from 'antd';

const ColumnCr = ({ handleToggleAddColumn, handleAddColumn }) => {
  // START --- context

  // END --- context

  // START --- state

  // column name
  const [name, nameSet] = React.useState('');

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // handle input changes
  const handleChange = event => nameSet(event.target.value);

  // submit (create column)
  const handleSubmit = async () => {
    // send to server
    await handleAddColumn(name);

    // close this component
    handleToggleAddColumn();
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* Column name */}
      <Input autoFocus name="column" placeholder="New column name.." onChange={handleChange}></Input>
      {/* action buttons */}
      <Row className="card-create-actions" gutter={4}>
        {/* back */}
        <Col span={12}>
          <Button size="small" type="dashed" icon="close" onClick={() => handleToggleAddColumn()}></Button>
        </Col>
        {/* submit */}
        <Col span={12}>
          <Button size="small" type="primary" icon="check" onClick={handleSubmit}></Button>
        </Col>
      </Row>
    </>
  );
};

export default ColumnCr;

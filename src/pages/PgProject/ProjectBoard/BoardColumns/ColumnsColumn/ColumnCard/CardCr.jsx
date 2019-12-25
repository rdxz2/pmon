import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Row, Col, Button, message } from 'antd';

const CardCr = ({ uuid, handleToggleAddCard, handleAddCard }) => {
  // START --- context

  // END --- context

  // START --- state

  // data (title)
  const [title, titleSet] = React.useState('');

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // input change
  const handleChange = event => titleSet(event.target.value);

  // submit (create card)
  const handleSubmit = async () => {
    // send to server
    await handleAddCard(uuid, title);

    // close this component
    handleToggleAddCard(uuid);
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* Title */}
      <TextArea value={title} name="title" placeholder="Something to do.." onChange={handleChange}></TextArea>
      {/* action buttons */}
      <Row className="card-create-actions" gutter={4}>
        {/* back */}
        <Col span={12}>
          <Button size="small" type="dashed" icon="close" onClick={() => handleToggleAddCard(uuid)}></Button>
        </Col>
        {/* submit */}
        <Col span={12}>
          <Button size="small" type="primary" icon="check" onClick={handleSubmit}></Button>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(CardCr);

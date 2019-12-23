import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Row, Col, Button, message } from 'antd';

const CardCr = ({ handleToggleAddCard, handleAddCard }) => {
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
    await handleAddCard(title);

    // close this component
    handleToggleAddCard();
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* Title */}
      <div>
        <TextArea value={title} name="title" placeholder="Something to do.." onChange={handleChange}></TextArea>
      </div>
      {/* action buttons */}
      <Row className="card-create-actions" gutter={4}>
        {/* back */}
        <Col span={12}>
          <Button block type="dashed" icon="close" onClick={handleToggleAddCard}></Button>
        </Col>
        {/* submit */}
        <Col span={12}>
          <Button block type="primary" icon="check" onClick={handleSubmit}></Button>
        </Col>
      </Row>
    </>
  );
};

export default CardCr;

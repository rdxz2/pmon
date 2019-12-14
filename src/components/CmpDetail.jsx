import React from "react";
import { Row, Col } from "antd";
import "./CmpDetail.css";

const CmpDetail = ({ label, children }) => {
  return (
    <Row>
      <Col className="detail-label" span={8}>
        {label}
      </Col>
      <Col className="detail-colon" span={1}>
        :
      </Col>
      <Col className="detail-content" span={15}>
        {children}
      </Col>
    </Row>
  );
};

export default CmpDetail;

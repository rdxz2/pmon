import { Button, Card, Col, Divider, Row } from "antd";
import React from "react";
import "./PgLogin.css";
import FrLogin from "./FrLogin";

const PgLogin = () => {
  return (
    <Card
      className="card-login"
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
    >
      {/* divider */}
      <Divider type="horizontal">Pmon</Divider>
      {/* login form */}
      <FrLogin></FrLogin>
    </Card>
  );
};

export default PgLogin;

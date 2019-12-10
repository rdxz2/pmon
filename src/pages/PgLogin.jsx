import { Button, Card, Col, Divider, Row } from 'antd';
import React from 'react';
import './PgLogin.css';
import FrLogin from './Login/FrLogin';

const PgLogin = ({ history }) => {
  return (
    <Card className='card-login' cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}>
      {/* divider */}
      <Divider type='horizontal'>Pmon</Divider>
      {/* login form */}
      <FrLogin history={history}></FrLogin>
      {/* additional */}
      <Row style={{ marginTop: 10 }}>
        {/* register */}
        <Col span={12}>
          <Button block type='link' onClick={() => history.push('register')}>
            Register
          </Button>
        </Col>
        {/* forgot password */}
        <Col span={12}>
          <Button block type='link' onClick={() => history.push('forgotpassword')}>
            Forgot password
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default PgLogin;

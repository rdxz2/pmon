import './PgLogin.css';

import { Card, Divider } from 'antd';
import React from 'react';

import { CtxPageTitle } from '../contexts/CtxPageTitle';
import FrLogin from './PgLogin/FrLogin';

const PgLogin = () => {
  // START --- state

  // END --- state

  // START --- context

  // page title
  const { handlePageTitleChange } = React.useContext(CtxPageTitle);

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // END --- handler

  // START --- effect

  // change page title
  React.useEffect(() => {
    handlePageTitleChange('Login');
  }, [handlePageTitleChange]);

  // END --- effect

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

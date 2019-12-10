import { Divider, Icon } from 'antd';
import React from 'react';
import './PgRegister.css';
import FrRegister from './Register/FrRegister';

const PgRegister = ({ history }) => {
  return (
    <div className='page-register'>
      {/* title */}
      <Divider type='horizontal'>
        <Icon type='user'></Icon>
        Pmon - Registration
      </Divider>
      {/* register form */}
      <FrRegister history={history}></FrRegister>
    </div>
  );
};

export default PgRegister;

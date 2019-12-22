import { Divider, Icon } from 'antd';
import React from 'react';
import './PgRegister.css';
import FrRegister from './FrRegister';
import { CtxPageTitle } from '../../contexts/CtxPageTitle';

const PgRegister = () => {
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
    handlePageTitleChange('Register');
  }, [handlePageTitleChange]);

  // END --- effect

  return (
    <div className="page-register">
      {/* title */}
      <Divider type="horizontal">
        <Icon type="user"></Icon>
        Pmon - Registration
      </Divider>
      {/* register form */}
      <FrRegister></FrRegister>
    </div>
  );
};

export default PgRegister;

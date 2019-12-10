import React from 'react';
import { message } from 'antd';
import { CtxApi } from '../contexts/CtxApi';

const PgHome = ({ history }) => {
  // state

  // effect

  // context
  const { svsApiPmon } = React.useContext(CtxApi);

  // handlers
  const handleLogout = async () => {
    try {
      svsApiPmon.logout();

      message.info('your are logged out');

      history.replace('/login');
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <div>
      page home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PgHome;

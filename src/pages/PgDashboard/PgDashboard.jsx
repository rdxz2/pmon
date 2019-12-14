import React from 'react';
import { message } from 'antd';
import { CtxApi } from '../../contexts/CtxApi';
import useDocumentTitle from '../../hooks/UseDocumentTitle';

const PgDashboard = ({ history }) => {
  // state

  // effect
  useDocumentTitle('Dashboard');

  // context
  const { svsApiPmon } = React.useContext(CtxApi);

  return <div>page dashbaord</div>;
};

export default PgDashboard;

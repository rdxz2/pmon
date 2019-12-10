import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { CtxApi } from '../contexts/CtxApi';

const CmpPrivateRoute = ({ component: Component, ...rest }) => {
  // context
  const { svsApiPmon } = React.useContext(CtxApi);

  return <Route {...rest} render={props => (svsApiPmon.isAuthenticated() ? <Component handleUpdateTitle={rest.handleUpdateTitle} {...props} /> : <Redirect to='/login' />)} />;
};

export default CmpPrivateRoute;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { CtxApi } from '../contexts/CtxApi';

const CmpPrivateRoute = ({ component: Component, ...rest }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  return (
    <Route
      {...rest}
      render={props => (svsApiPmon.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default CmpPrivateRoute;

import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CtxPvdApi from './contexts/CtxApi';
import CtxPvdLayouting from './contexts/CtxLayouting';
import Lay from './layouts/Lay';
import PgLogin from './pages/PgLogin/PgLogin';
import PgNotFound from './pages/PgNotFound/PgNotFound';
import PgRegister from './pages/PgRegister/PgRegister';
import CmpPrivateRoute from './components/CmpPrivateRoute';
import CtxPvdPageTitle from './contexts/CtxPageTitle';

const App = () => {
  return (
    // api context provider
    <CtxPvdApi>
      {/* layout context provider */}
      <CtxPvdLayouting>
        {/* page title context provider */}
        <CtxPvdPageTitle>
          {/* routes */}
          <Router>
            <Switch>
              {/* public route */}
              <Route path="/login" component={PgLogin}></Route>
              <Route path="/register" component={PgRegister}></Route>
              {/* private (protected) route */}
              <CmpPrivateRoute path="/" component={Lay}></CmpPrivateRoute>
              {/* not found route */}
              {/* <Route component={PgNotFound}></Route> */}
            </Switch>
          </Router>
        </CtxPvdPageTitle>
      </CtxPvdLayouting>
    </CtxPvdApi>
  );
};

export default App;

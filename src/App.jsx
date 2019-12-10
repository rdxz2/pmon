import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CtxPvdApi from './contexts/CtxApi';
import CtxPvdLayouting from './contexts/CtxLayouting';
import LayMain from './layouts/LayMain';
import PgLogin from './pages/PgLogin';
import PgNotFound from './pages/PgNotFound';
import PgRegister from './pages/PgRegister';

const App = () => {
  return (
    // api context provider
    <CtxPvdApi>
      {/* layout context provider */}
      <CtxPvdLayouting>
        {/* routes */}
        <Router>
          <Switch>
            {/* public route */}
            <Route exact path='/login' component={PgLogin}></Route>
            <Route exact path='/register' component={PgRegister}></Route>
            {/* private (protected) route */}
            <Route path='/' component={LayMain}></Route>
            {/* not found */}
            <Route component={PgNotFound}></Route>
          </Switch>
        </Router>
      </CtxPvdLayouting>
    </CtxPvdApi>
  );
};

export default App;

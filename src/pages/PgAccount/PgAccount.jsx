import './PgAccount.css';

import { Icon, Tabs, Menu, Row, Col } from 'antd';
import React from 'react';

import AccountInformation from './AccountInformation/AccountInformation';
import AccountPassword from './AccountPassword/AccountPassword';
import { Link, Route, useHistory } from 'react-router-dom';
import AccountSettings from './AccountSettings/AccountSettings';
import Grid from 'antd/lib/card/Grid';

const PgAccount = ({ match }) => {
  console.log(match);
  // START ~~> context

  // END <~~ context

  // START ~~> other

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> state

  // END <~~ state

  // START ~~> effect

  // routing
  // React.useEffect(() => {
  //   history.replace('account');
  // }, [history]);

  // END <~~ effect

  // START ~~> handler

  // END <~~ handler

  return (
    <div className="page-account">
      {/* menu list */}
      <Menu mode="horizontal" defaultSelectedKeys="information">
        {/* user's detailed information */}
        <Menu.Item key="information">
          <Link to={`${match.path}/information`}>
            <Icon type="user" />
            Information
          </Link>
        </Menu.Item>
        {/* change user's password */}
        <Menu.Item key="changepassword">
          <Link to={`${match.path}/changepassword`}>
            <Icon type="lock" />
            Change password
          </Link>
        </Menu.Item>
        {/* user's settings */}
        <Menu.Item key="settings">
          <Link to={`${match.path}/settings`}>
            <Icon type="setting" />
            Settings
          </Link>
        </Menu.Item>
      </Menu>
      {/* contents */}
      <div>
        <Route path={`${match.path}/information`} component={AccountInformation}></Route>
        <Route path={`${match.path}/changepassword`} component={AccountPassword}></Route>
        <Route path={`${match.path}/settings`} component={AccountSettings}></Route>
      </div>
    </div>
  );
};

export default PgAccount;

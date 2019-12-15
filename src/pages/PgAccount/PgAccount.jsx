import './PgAccount.css';

import { Icon, Menu } from 'antd';
import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';

import AccountInformation from './AccountInformation/AccountInformation';
import AccountPassword from './AccountPassword/AccountPassword';
import AccountSettings from './AccountSettings/AccountSettings';

const PgAccount = ({ match }) => {
  // START ~~> context

  // END <~~ context

  // START ~~> other

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> state

  // currently active menu
  const [activeMenu, activeMenuSet] = React.useState('');

  // END <~~ state

  // START ~~> effect

  // END <~~ effect

  // START ~~> handler

  // change currently active menu
  const handleChangeActiveMenu = _activeMenu => activeMenuSet(_activeMenu);

  // END <~~ handler

  return (
    <div className="page-account">
      {/* menu list */}
      <Menu mode="horizontal" selectedKeys={activeMenu}>
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
        <Route
          path={`${match.path}/information`}
          render={() => <AccountInformation handleChangeActiveMenu={handleChangeActiveMenu}></AccountInformation>}
        ></Route>
        <Route
          path={`${match.path}/changepassword`}
          render={() => <AccountPassword handleChangeActiveMenu={handleChangeActiveMenu}></AccountPassword>}
        ></Route>
        <Route
          path={`${match.path}/settings`}
          render={() => <AccountSettings handleChangeActiveMenu={handleChangeActiveMenu}></AccountSettings>}
        ></Route>
      </div>
    </div>
  );
};

export default PgAccount;

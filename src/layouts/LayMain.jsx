import './LayMain.css';

import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';

import CmpPrivateRoute from '../components/CmpPrivateRoute';
import PgHome from '../pages/PgHome';

const LayMain = () => {
  // state

  // context

  // effect

  // handlers

  return (
    <Layout>
      {/* top nav */}
      <Layout.Header className='topnav'>
        {/* logo */}
        <div className='logo' />
        {/* menu list */}
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} className='topnav-menu'>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
      {/* content */}
      <Layout.Content className='content'>
        {/* main content */}
        <div className='main-content'>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          {/* routing */}
          <CmpPrivateRoute exact path='/' component={PgHome}></CmpPrivateRoute>
          <CmpPrivateRoute exact path='/home' component={PgHome}></CmpPrivateRoute>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LayMain;

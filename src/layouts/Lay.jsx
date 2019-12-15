import './Lay.css';

import { Menu, Button, Drawer, Layout, PageHeader, Descriptions, Icon, Badge, Avatar, Input, message } from 'antd';
import React from 'react';

import CmpPrivateRoute from '../components/CmpPrivateRoute';
import PgDashboard from '../pages/PgDashboard/PgDashboard';
import PgAccount from '../pages/PgAccount/PgAccount';
import CmpRunningTime from '../components/CmpRunningTime';
import moment from 'moment';
import LayDrawerContentNotification from './LayDrawerContentNotifications/LayDrawerContentNotifications';
import LayDrawerContentProject from './LayDrawerContentProject/LayDrawerContentProject';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import PgNotFound from '../pages/PgNotFound/PgNotFound';
import { CtxApi } from '../contexts/CtxApi';

const Lay = () => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> handler

  // load user's project from server
  const handleLoadUserProject = async () => {
    try {
      const res = await svsApiPmon.sendRequest('project', 'get');
      dataUserProjectSet([...res]);
    } catch (err) {
      message.error(err);
    }
  };

  // pagename handler
  const handleChangeCurrentPage = _currentPage => currentPageSet(_currentPage);

  // menu drawer open/close handler
  const handleDrawerMenuOpen = () => isDrawerMenuOpenSet(true);
  const handleDrawerMenuClose = () => isDrawerMenuOpenSet(false);
  const handleDrawerMenuLeave = () => handleDrawerMenuClose();
  const handleDrawerMenuVisibleChange = () => {
    // get drawer content wrapper
    const drawer = document.getElementsByClassName('ant-drawer-content-wrapper')[0];

    // add/remove listener on whether drawer is open/closed
    if (isDrawerMenuOpen) drawer.addEventListener('mouseleave', handleDrawerMenuLeave);
    else drawer.removeEventListener('mouseleave', handleDrawerMenuLeave);
  };

  // notification drawer open/close handler
  const handleDrawerNotificationOpen = () => isDrawerNotificationOpenSet(true);
  const handleDrawerNotificationClose = () => isDrawerNotificationOpenSet(false);

  // END <~~ handler

  // START ~~> state

  // user's project
  const [dataUserProject, dataUserProjectSet] = React.useState([]);

  // current active page
  const [currentPage, currentPageSet] = React.useState('');

  // drawer
  const [isDrawerMenuOpen, isDrawerMenuOpenSet] = React.useState(false);
  const [isDrawerNotificationOpen, isDrawerNotificationOpenSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // load user's project
  React.useEffect(() => {}, []);

  // END <~~ effect

  return (
    <Layout>
      {/* dummy div to trigger drawer */}
      <div className="drawer-dummy" onMouseEnter={handleDrawerMenuOpen}></div>
      {/* dummy button to trigger drawer */}
      <Button
        className="drawer-button-trigger"
        type="primary"
        shape="circle"
        icon="right"
        onClick={handleDrawerMenuOpen}
      ></Button>
      {/* menu drawer */}
      <Drawer
        title="Your projects"
        placement="left"
        closable={false}
        visible={isDrawerMenuOpen}
        onClose={handleDrawerMenuClose}
        afterVisibleChange={handleDrawerMenuVisibleChange}
      >
        <LayDrawerContentProject dataUserProject={dataUserProject}></LayDrawerContentProject>
      </Drawer>
      {/* notification drawer */}
      <Drawer
        title="Notifications"
        placement="right"
        visible={isDrawerNotificationOpen}
        onClose={handleDrawerNotificationClose}
      >
        <LayDrawerContentNotification></LayDrawerContentNotification>
      </Drawer>
      {/* page header */}
      <PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title={currentPage}
        subTitle="... page subtitle"
        className="page-header"
        extra={[
          // running time
          <CmpRunningTime key="page-header-running-time" initial={moment()}></CmpRunningTime>,
          // avatar
          <Button key="page-header-avatar-user" shape="circle" onClick={() => history.push('/account/information')}>
            RD
          </Button>,
          // notification
          <Badge key="page-header-button-notification" count={48}>
            <Button type="primary" shape="circle" icon="notification" onClick={handleDrawerNotificationOpen}></Button>
          </Badge>
        ]}
      >
        {/* <Descriptions size='small' column={3}>
          <Descriptions.Item label='Created'>Lili Qu</Descriptions.Item>
          <Descriptions.Item label='Association'>
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label='Creation Time'>2017-01-10</Descriptions.Item>
          <Descriptions.Item label='Effective Time'>2017-10-10</Descriptions.Item>
          <Descriptions.Item label='Remarks'>Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
        </Descriptions> */}
      </PageHeader>
      {/* main content */}
      <Layout.Content className="content-main">
        {/* routing */}
        <CmpPrivateRoute exact path="/" component={PgDashboard}></CmpPrivateRoute>
        {/* <CmpPrivateRoute path="/dashboard" component={PgDashboard}></CmpPrivateRoute> */}
        <CmpPrivateRoute path="/account" component={PgAccount}></CmpPrivateRoute>
        {/* not found page */}
        {/* <Route component={PgNotFound}></Route> */}
      </Layout.Content>
    </Layout>
  );
};

export default Lay;

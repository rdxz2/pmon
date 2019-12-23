import './Lay.css';

import { Badge, Button, Drawer, Layout, message, PageHeader, Divider } from 'antd';
import moment from 'moment';
import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import CmpPrivateRoute from '../components/CmpPrivateRoute';
import CmpRunningTime from '../components/CmpRunningTime';
import { CtxApi } from '../contexts/CtxApi';
import PgAccount from '../pages/PgAccount/PgAccount';
import PgDashboard from '../pages/PgDashboard/PgDashboard';
import PgProject from '../pages/PgProject/PgProject';
import LayDrawerContentNotification from './LayDrawerContentNotifications/LayDrawerContentNotifications';
import LayDrawerContentProject from './LayDrawerContentProject/LayDrawerContentProject';
import { CtxPageTitle } from '../contexts/CtxPageTitle';
import { isEmptyObject } from '../utilities/UtlDataManipulator';

const Lay = () => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // page title
  const { pageTitle } = React.useContext(CtxPageTitle);

  // END --- context

  // START --- state

  // user's project
  const [dataUserProjects, dataUserProjectsSet] = React.useState([]);

  // user's notification
  const [dataUserNotifications, dataUserNotificationsSet] = React.useState({});

  // drawer
  const [isDrawerMenuOpen, isDrawerMenuOpenSet] = React.useState(false);
  const [isDrawerNotificationOpen, isDrawerNotificationOpenSet] = React.useState(false);

  // END --- state

  // START --- other variables

  // history
  const history = useHistory();

  // END --- other variables

  // START --- handler

  // load user's project
  const handleLoadUserProjects = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest('project/drawer', 'get');
      dataUserProjectsSet([...res]);
    } catch (err) {
      message.error(err);
    }
  }, [svsApiPmon]);

  // load user's notification
  const handleLoadUserNotifications = React.useCallback(
    async (page, show) => {
      try {
        const res = await svsApiPmon.sendRequest('notification/drawer', 'post', { page, show: show || 100 });
        dataUserNotificationsSet(_dataUserNotifications =>
          isEmptyObject(_dataUserNotifications)
            ? { ...res }
            : {
                ...res,
                notifications: [..._dataUserNotifications.notifications, ...res.notifications]
              }
        );
      } catch (err) {
        message.error(err);
      }
    },
    [svsApiPmon]
  );

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

  // END --- handler

  // START --- effect

  // load user's projects
  React.useEffect(() => {
    handleLoadUserProjects();
  }, [handleLoadUserProjects]);

  // load user's notifications (1st page)
  React.useEffect(() => {
    handleLoadUserNotifications(1);
  }, [handleLoadUserNotifications]);

  // END --- effect

  // count unread notifications
  const dataUserNotificationsUnreadCount = !isEmptyObject(dataUserNotifications)
    ? dataUserNotifications.notifications.filter(v => !v.isRead).length
    : 0;

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
        <LayDrawerContentProject
          dataUserProject={dataUserProjects}
          handleLoadUserProject={handleLoadUserProjects}
          handleDrawerMenuClose={handleDrawerMenuClose}
        ></LayDrawerContentProject>
      </Drawer>
      {/* notification drawer */}
      <Drawer
        className="drawer-notification"
        title="Notifications"
        placement="right"
        visible={isDrawerNotificationOpen}
        onClose={handleDrawerNotificationClose}
      >
        <LayDrawerContentNotification
          dataUserNotifications={dataUserNotifications}
          handleLoadUserNotifications={handleLoadUserNotifications}
        ></LayDrawerContentNotification>
      </Drawer>
      {/* page header */}
      <PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title={
          <>
            <Link to="/">pmon</Link>
            <Divider type="vertical"></Divider>
            {pageTitle}
          </>
        }
        // subTitle="... page subtitle"
        className="page-header"
        extra={[
          // running time
          <CmpRunningTime key="page-header-running-time" initial={moment()}></CmpRunningTime>,
          // avatar
          <Button key="page-header-avatar-user" shape="circle" onClick={() => history.push('/account/information')}>
            RD
          </Button>,
          // notification
          <Badge key="page-header-button-notification" count={dataUserNotificationsUnreadCount}>
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
        <CmpPrivateRoute path="/project/:name" component={PgProject}></CmpPrivateRoute>
        {/* not found page */}
        {/* <Route component={PgNotFound}></Route> */}
      </Layout.Content>
    </Layout>
  );
};

export default Lay;

import './PgProject.css';

import { Icon, Menu } from 'antd';
import React from 'react';
import { Link, Route } from 'react-router-dom';

import { CtxPageTitle } from '../contexts/CtxPageTitle';
import ProjectBoard from './PgProject/ProjectBoard';
import ProjectCalendar from './PgProject/ProjectCalendar';
import ProjectSetting from './PgProject/ProjectSetting';
import ProjectTimeline from './PgProject/ProjectTimeline';

const PgProject = ({ match }) => {
  // START --- state

  // currently active menu
  const [activeMenu, activeMenuSet] = React.useState('');

  // END --- state

  // START --- context

  // page title
  const { handlePageTitleChange } = React.useContext(CtxPageTitle);

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // change currently active menu
  const handleChangeActiveMenu = _activeMenu => activeMenuSet(_activeMenu);

  // END --- handler

  // START --- effect

  // change page title
  React.useEffect(() => {
    handlePageTitleChange(`${match.params.name || ''}  ${activeMenu}`);
  }, [activeMenu, handlePageTitleChange, match.params.name]);

  // END --- effect

  const _match = match;

  return (
    <>
      {/* menu list */}
      <Menu mode="horizontal" selectedKeys={activeMenu}>
        {/* project board */}
        <Menu.Item key="Board">
          <Link to={`${match.url}/board`}>
            <Icon type="dashboard" />
            Board
          </Link>
        </Menu.Item>
        {/* project calendar */}
        <Menu.Item key="Calendar">
          <Link to={`${match.url}/calendar`}>
            <Icon type="calendar" />
            Calendar
          </Link>
        </Menu.Item>
        {/* project timeline */}
        <Menu.Item key="Timeline">
          <Link to={`${match.url}/timeline`}>
            <Icon type="history" />
            Timeline
          </Link>
        </Menu.Item>
        {/* project setting */}
        <Menu.Item key="Setting">
          <Link to={`${match.url}/setting`}>
            <Icon type="setting" />
            Setting
          </Link>
        </Menu.Item>
      </Menu>
      {/* contents */}
      <div>
        <Route
          path={`${match.url}/board`}
          render={({ match }) => (
            <ProjectBoard
              handleChangeActiveMenu={handleChangeActiveMenu}
              projectName={_match.params.name}
              match={match}
            ></ProjectBoard>
          )}
        ></Route>
        <Route
          path={`${match.url}/calendar`}
          render={({ match }) => (
            <ProjectCalendar
              handleChangeActiveMenu={handleChangeActiveMenu}
              projectName={_match.params.name}
              match={match}
            ></ProjectCalendar>
          )}
        ></Route>
        <Route
          path={`${match.url}/timeline`}
          render={({ match }) => (
            <ProjectTimeline
              handleChangeActiveMenu={handleChangeActiveMenu}
              projectName={_match.params.name}
              match={match}
            ></ProjectTimeline>
          )}
        ></Route>
        <Route
          path={`${match.url}/setting`}
          render={({ match }) => (
            <ProjectSetting
              handleChangeActiveMenu={handleChangeActiveMenu}
              projectName={_match.params.name}
              match={match}
            ></ProjectSetting>
          )}
        ></Route>
      </div>
    </>
  );
};

export default PgProject;

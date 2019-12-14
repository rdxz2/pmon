import { Button, Drawer, Empty, List, message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { CtxApi } from '../../contexts/CtxApi';
import { isEmptyArray } from '../../utilities/UtlDataManipulator';
import ProjectCr from './ProjectCr';

const LayDrawerContentProject = () => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // END <~~ other

  // START ~~> handler

  // load user's project
  const handleLoadUserProjects = React.useCallback(async () => {
    try {
      // get user's projects from api
      const res = await svsApiPmon.sendRequest('project', 'get');

      // set state
      dataUserProjectsSet([...res]);
      dataUserProjectsLoadingSet(false);
    } catch (err) {
      message.error(err);
    }
  }, [svsApiPmon]);

  // create project drawer open/close handler
  const handleDrawerCreateProjectOpen = () => isDrawerCreactProjectOpenSet(true);
  const handleDrawerCreateProjectClose = () => isDrawerCreactProjectOpenSet(false);

  // END <~~ handler

  // START ~~> state

  // user's projects
  const [dataUserProjects, dataUserProjectsSet] = React.useState([]);
  const [dataUserProjectsLoading, dataUserProjectsLoadingSet] = React.useState(true);

  // create project drawer
  const [isDrawerCreactProjectOpen, isDrawerCreactProjectOpenSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // load user's projects
  React.useEffect(() => {
    handleLoadUserProjects();
  }, [handleLoadUserProjects]);

  // END <~~ effect

  return (
    <React.Fragment>
      {/* create project button */}
      <Button block type="primary" icon="plus" onClick={handleDrawerCreateProjectOpen}>
        Create new project
      </Button>
      {/* create project drawer */}
      <Drawer
        width={500}
        title="Create new project"
        placement="left"
        visible={isDrawerCreactProjectOpen}
        onClose={handleDrawerCreateProjectClose}
      >
        {/* create project form */}
        <ProjectCr></ProjectCr>
      </Drawer>
      {/* project list */}
      {!isEmptyArray(dataUserProjects) ? (
        <List
          itemLayout="horizontal"
          dataSource={dataUserProjects}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta avatar={item.avatar} title={item.title} description={item.description}></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      ) : (
        <Empty className="drawer-content-empty" description="You have no projects.. Create one!!"></Empty>
      )}
      {/* footer */}
      <div className="drawer-content-bottom">
        <div>Powered by:</div>
        <img
          className="drawer-content-logo"
          src={require('../../assets/logo/logo_indomaret.png')}
          title="PT Indomarco Prismatama"
          alt="logoIndomaret"
        ></img>
      </div>
    </React.Fragment>
  );
};

export default LayDrawerContentProject;

import { Button, Drawer, Empty, List, message, Avatar } from 'antd';
import React from 'react';

import { CtxApi } from '../../contexts/CtxApi';
import { isEmptyArray } from '../../utilities/UtlDataManipulator';
import ProjectCr from './ProjectCr';
import { Link } from 'react-router-dom';

const LayDrawerContentProject = ({ dataUserProject, handleLoadUserProject }) => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // END <~~ other

  // START ~~> handler

  // create project drawer open/close handler
  const handleDrawerCreateProjectOpen = () => isDrawerCreactProjectOpenSet(true);
  const handleDrawerCreateProjectClose = () => isDrawerCreactProjectOpenSet(false);

  // END <~~ handler

  // START ~~> state

  // create project drawer
  const [isDrawerCreactProjectOpen, isDrawerCreactProjectOpenSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // END <~~ effect

  return (
    <>
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
        <ProjectCr
          handleLoadUserProject={handleLoadUserProject}
          handleDrawerCreateProjectClose={handleDrawerCreateProjectClose}
        ></ProjectCr>
      </Drawer>
      {/* project list */}
      {!isEmptyArray(dataUserProject) ? (
        // render user's project
        <List
          itemLayout="horizontal"
          dataSource={dataUserProject}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image}></Avatar>}
                title={<Link to={`/project/${item.nameNormalized}`}>{item.name}</Link>}
                description={item.description}
              ></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      ) : (
        // render empty picture
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
    </>
  );
};

export default LayDrawerContentProject;

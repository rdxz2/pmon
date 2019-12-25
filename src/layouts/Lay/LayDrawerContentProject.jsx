import { Avatar, Button, Drawer, Empty, List } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { isEmptyArray } from '../../utilities/UtlDataManipulator';
import ProjectCr from './LayDrawerContentProject/ProjectCr';

const LayDrawerContentProject = ({ dataUserProject, handleLoadUserProject, handleDrawerMenuClose }) => {
  // START --- context

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // create project drawer open/close handler
  const handleDrawerCreateProjectOpen = () => isDrawerCreactProjectOpenSet(true);
  const handleDrawerCreateProjectClose = () => isDrawerCreactProjectOpenSet(false);

  // END --- handler

  // START --- state

  // create project drawer
  const [isDrawerCreactProjectOpen, isDrawerCreactProjectOpenSet] = React.useState(false);

  // END --- state

  // START --- effect

  // END --- effect

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
                title={
                  <Link
                    to={
                      item.isInvitationAccepted
                        ? // if user already accepted the invitation then go to project's page: board
                          `/project/${item.nameNormalized}/board`
                        : // if not then go to project's invitation page
                          `/projectinvitation/${item.nameNormalized}`
                    }
                    onClick={handleDrawerMenuClose}
                  >
                    {item.name}
                  </Link>
                }
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

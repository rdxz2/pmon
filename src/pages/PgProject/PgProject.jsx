import './PgProject.css';

import { message } from 'antd';
import React from 'react';

import { CtxPageTitle } from '../../contexts/CtxPageTitle';
import { CtxApi } from '../../contexts/CtxApi';
import { isEmptyObject } from '../../utilities/UtlDataManipulator';
import ProjectBoard from './Project/ProjectBoard';
import ProjectInvitation from './Project/ProjectInvitation';

const PgProject = ({ match }) => {
  // START --- state

  // project data
  const [dataProject, dataProjectSet] = React.useState({});

  // END --- state

  // START --- context

  // page title
  const { handlePageTitleChange } = React.useContext(CtxPageTitle);

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // load project's data
  const handleLoadProjectData = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest(`project/main/${match.params.name}`, 'get');
      dataProjectSet({ ...res });
    } catch (err) {
      message.error(err);
    }
  }, [match.params.name, svsApiPmon]);

  // END --- handler

  // START --- effect

  // change page title
  React.useEffect(() => {
    handlePageTitleChange(dataProject.name || '');
  }, [dataProject.name, handlePageTitleChange]);

  // load project's data
  React.useEffect(() => {
    handleLoadProjectData();
  }, [handleLoadProjectData]);

  // END --- effect

  return !isEmptyObject(dataProject) ? (
    dataProject.isInvitationAccepted ? (
      <ProjectBoard dataProject={dataProject}></ProjectBoard>
    ) : (
      <ProjectInvitation></ProjectInvitation>
    )
  ) : (
    'loading..'
  );
};

export default PgProject;

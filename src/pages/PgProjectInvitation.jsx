import React from 'react';
import { CtxApi } from '../contexts/CtxApi';
import { message } from 'antd';
import { CtxPageTitle } from '../contexts/CtxPageTitle';

const PgProjectInvitation = ({ match }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // page title
  const { handlePageTitleChange } = React.useContext(CtxPageTitle);

  // project data
  const [dataProject, dataProjectSet] = React.useState({});

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  const handleLoadProjectData = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest(`project/invitation/${match.params.name}`, 'get');

      // set state
      dataProjectSet({ ...res });
    } catch (err) {
      message.error(err);
    }
  }, [match.params.name, svsApiPmon]);

  // END --- handler

  // START --- effect

  // change page title
  React.useEffect(() => {
    handlePageTitleChange(`${match.params.name || ''} Invitation`);
  }, [handlePageTitleChange, match.params.name]);

  // load project's data
  React.useEffect(() => {
    handleLoadProjectData();
  }, [handleLoadProjectData]);

  // END --- effect

  return 'You have been invited to this project';
};

export default PgProjectInvitation;

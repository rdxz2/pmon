import React from 'react';
import { CtxApi } from '../../contexts/CtxApi';
import { message } from 'antd';

const PgProject = ({ match }) => {
  // START --- state

  // project data
  const [dataProject, dataProjectSet] = React.useState({});

  // END --- state

  // START --- context

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

  // load project's data
  React.useEffect(() => {
    handleLoadProjectData();
  }, [handleLoadProjectData]);

  // END --- effect

  return (
    <>
      <div>Pg Project</div>
      <div>{dataProject.name}</div>
    </>
  );
};

export default PgProject;

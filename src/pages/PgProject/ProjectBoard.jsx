import { message } from 'antd';
import React from 'react';
import uuid from 'uuid/v1';

import { CtxApi } from '../../contexts/CtxApi';
import BoardHeader from './ProjectBoard/BoardHeader';
import BoardColumns from './ProjectBoard/BoardColumns';

const ProjectBoard = ({ handleChangeActiveMenu, projectName, match }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // project data
  const [dataProject, dataProjectSet] = React.useState({});

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // load project's data
  const handleLoadProjectData = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest(`project/main/${projectName}`, 'get');

      // add uuid to columns
      res.columns.forEach(v => {
        v.uuid = uuid();
        // add uuid to cards
        v.cards.forEach(_v => {
          _v.uuid = uuid();
        });
      });

      // set state
      dataProjectSet({ ...res });
    } catch (err) {
      message.error(err);
    }
  }, [projectName, svsApiPmon]);

  // change project's column value
  const handleChangeProjectColumnValue = React.useCallback(
    columns => dataProjectSet(_dataProject => ({ ..._dataProject, columns: [...columns] })),
    []
  );

  // END --- handler

  // START --- effect

  // change active menu
  React.useEffect(() => {
    handleChangeActiveMenu('Board');
  }, [handleChangeActiveMenu]);

  // load project's data
  React.useEffect(() => {
    handleLoadProjectData();
  }, [handleLoadProjectData]);

  // END --- effect

  return (
    <>
      {/* header */}
      <BoardHeader></BoardHeader>
      {/* columns */}
      <BoardColumns
        dataProject={dataProject}
        handleChangeProjectColumnValue={handleChangeProjectColumnValue}
        match={match}
      ></BoardColumns>
    </>
  );
};

export default ProjectBoard;

import React from 'react';

const ProjectSetting = ({ handleChangeActiveMenu, projectName }) => {
  // START --- context

  // END --- context

  // START --- state

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // END --- handler

  // START --- effect

  // change active menu
  React.useEffect(() => {
    handleChangeActiveMenu('Setting');
  }, [handleChangeActiveMenu]);

  // END --- effect

  return 'Project setting';
};

export default ProjectSetting;

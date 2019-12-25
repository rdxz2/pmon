import React from 'react';

const ProjectTimeline = ({ handleChangeActiveMenu, projectName }) => {
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
    handleChangeActiveMenu('Timeline');
  }, [handleChangeActiveMenu]);

  // END --- effect

  return 'project timeline';
};

export default ProjectTimeline;

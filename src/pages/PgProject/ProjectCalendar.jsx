import React from 'react';

const ProjectCalendar = ({ handleChangeActiveMenu, projectName, match }) => {
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
    handleChangeActiveMenu('Calendar');
  }, [handleChangeActiveMenu]);

  // END --- effect

  return 'Project calendar';
};

export default ProjectCalendar;

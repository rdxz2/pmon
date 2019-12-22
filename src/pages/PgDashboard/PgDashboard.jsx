import React from 'react';

import { CtxPageTitle } from '../../contexts/CtxPageTitle';

const PgDashboard = () => {
  // START --- state

  // END --- state

  // START --- context

  // page title
  const { handlePageTitleChange } = React.useContext(CtxPageTitle);

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // END --- handler

  // START --- effect

  // change page title
  React.useEffect(() => {
    handlePageTitleChange('Dashboard');
  }, [handlePageTitleChange]);

  // END --- effect

  return <div>page dashbaord</div>;
};

export default PgDashboard;

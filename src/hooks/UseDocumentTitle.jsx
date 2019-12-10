import React from 'react';

const baseTitle = 'pmon';

const useDocumentTitle = title => {
  // effect
  React.useEffect(() => {
    document.title = `${title} - ${baseTitle}`;
  }, [title]);
};

export default useDocumentTitle;

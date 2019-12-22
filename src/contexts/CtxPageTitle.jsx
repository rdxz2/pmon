import React from 'react';

export const CtxPageTitle = React.createContext({
  pageTitle: '',
  handlePageTitleChange: title => {}
});

const CtxPvdPageTitle = ({ children }) => {
  // START --- state

  // page title
  const [pageTitle, pageTitleSet] = React.useState('');

  // END --- state

  // START --- context

  // END --- context

  // START --- other variables

  // END --- other variables

  // START --- handler

  // handle page title change
  const handlePageTitleChange = _pageTitle => {
    document.title = `${_pageTitle} - pmon`;
    pageTitleSet(_pageTitle);
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return <CtxPageTitle.Provider value={{ pageTitle, handlePageTitleChange }}>{children}</CtxPageTitle.Provider>;
};

export default CtxPvdPageTitle;

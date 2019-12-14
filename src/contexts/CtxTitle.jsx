import React from 'react';

// context consumer
export const CtxTitle = React.createContext({
  title: '',
  titleReplace: () => ({}),
  titlePush: () => ({})
});

// title update reducers
const titleReducer = (state, action) => {
  switch (action.type) {
    // replace title
    case 'replace':
      return [action.title];
    // add more to existing displayed title
    case 'push':
      return [...state, action.title];
    default:
      throw new Error('action type not recognized');
  }
};

const CtxTitleProvider = ({ children }) => {
  // STATE ~~> start

  // title
  const [title, titleDispatch] = React.useReducer(titleReducer, []);

  // STATE <~~ end

  return <CtxTitle.Provider value={{ title, titleDispatch }}>{children}</CtxTitle.Provider>;
};

export default CtxTitleProvider;

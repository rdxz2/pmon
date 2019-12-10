import React from 'react';

import SvsApiPmon from '../services/SvsApiPmon';
import { SERVER_ADDRESSES } from '../utils/UtlServerAddresses';

export const CtxApi = React.createContext({
  svsApiPmonIdentity: {
    login: async dataLogin => ({}),
    logout: () => ({}),
    // only used to register user
    sendRequest: async (endPointName, method, data) => ({})
  },
  svsApiPmon: {
    getTable: async (endPointName, show, page, search, sort) => ({}),
    getDropdown: async (endPointName, search, requiredIds, alreadyIds, show) => ({}),
    sendRequest: async (endPointName, method, data) => ({}),
    isAuthenticated: () => ({}),
    getProfile: () => ({})
  }
});

const CtxPvdApi = ({ children }) => {
  // state
  // pmonidentity
  const [svsApiPmonIdentity] = React.useState(
    new SvsApiPmon({
      baseUrl: SERVER_ADDRESSES.pmonidentity,
      name: 'pmonidentity'
    })
  );
  // pmonapi
  const [svsApiPmon] = React.useState(
    new SvsApiPmon({
      baseUrl: SERVER_ADDRESSES.pmonapi,
      name: 'pmonapi'
    })
  );

  return <CtxApi.Provider value={{ svsApiPmonIdentity, svsApiPmon }}>{children}</CtxApi.Provider>;
};

export default CtxPvdApi;

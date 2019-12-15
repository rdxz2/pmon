import React from 'react';
import { CtxApi } from '../../../contexts/CtxApi';
import { message } from 'antd';

const AccountSettings = ({ handleChangeActiveMenu }) => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // END <~~ other

  // START ~~> handler

  // get user's settings
  const handleLoadUserSettings = React.useCallback(async () => {
    try {
      // request data from server
      const res = await svsApiPmon.sendRequest('muser/settings', 'get');
      // store to state
      dataAccountSettingsSet(res.userSettings);
    } catch (err) {
      message.error(err);
    }
  }, [svsApiPmon]);

  // END <~~ handler

  // START ~~> state
  // user settings
  const [dataAccountSettings, dataAccountSettingsSet] = React.useState({});

  // END <~~ state

  // START ~~> effect

  // change active menu
  React.useEffect(() => {
    handleChangeActiveMenu('settings');
  }, [handleChangeActiveMenu]);

  // load user's settings
  React.useEffect(() => {
    handleLoadUserSettings();
  }, [handleLoadUserSettings]);

  // END <~~ effect

  // state

  // context

  // handler

  // effect

  return 'AccountSettings';
};

export default AccountSettings;

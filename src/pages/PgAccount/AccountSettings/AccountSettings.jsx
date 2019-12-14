import React from "react";
import { CtxApi } from "../../../contexts/CtxApi";
import { message } from "antd";

const AccountSettings = () => {
  // state
  // user settings
  const [dataAccountSettings, dataAccountSettingsSet] = React.useState({});

  // context
  const { svsApiPmon } = React.useContext(CtxApi);

  // handler
  // get user's settings
  const handleLoadUserSettings = React.useCallback(async () => {
    try {
      // request data from server
      const res = await svsApiPmon.sendRequest("muser/settings", "get");
      // store to state
      dataAccountSettingsSet(res.userSettings);
    } catch (err) {
      message.error(err);
    }
  }, [svsApiPmon]);

  // effect
  React.useEffect(() => {
    handleLoadUserSettings();
  }, [handleLoadUserSettings]);

  return "AccountSettings";
};

export default AccountSettings;

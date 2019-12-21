import React from 'react';
import AccountPasswordEd from './AccountPasswordEd';
import { Typography, Divider, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { CtxApi } from '../../../contexts/CtxApi';
import moment from 'moment';
import { formatDateTime } from '../../../constants/ConstDateFormats';

const AccountPassword = ({ handleChangeActiveMenu }) => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // END <~~ other

  // START ~~> handler

  const handleLoadPasswordMd = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest('user/passwordmd', 'get');
      passwordMdSet(res.md);
    } catch (err) {
      message.error(err);
    }
  }, [svsApiPmon]);

  // END <~~ handler

  // START ~~> state

  // password last modified date
  const [passwordMd, passwordMdSet] = React.useState(null);

  // END <~~ state

  // START ~~> effect

  // load user's password last modified date
  React.useEffect(() => {
    handleLoadPasswordMd();
  }, [handleLoadPasswordMd]);

  // change active menu
  React.useEffect(() => {
    handleChangeActiveMenu('changepassword');
  }, [handleChangeActiveMenu]);

  // END <~~ effect
  return (
    <>
      {/* title */}
      <Typography.Title level={3}>Change password</Typography.Title>
      <Typography.Text type="secondary">
        Password last modified on: {passwordMd ? moment(passwordMd).format(formatDateTime.standard) : 'Never'}
      </Typography.Text>
      {/* change password form */}
      <AccountPasswordEd></AccountPasswordEd>
    </>
  );
};

export default AccountPassword;

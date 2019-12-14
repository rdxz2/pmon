import React from 'react';
import AccountPasswordEd from './AccountPasswordEd';
import { Typography, Divider } from 'antd';
import { useHistory } from 'react-router-dom';

const AccountPassword = () => {
  // START ~~> context

  // END <~~ context

  // START ~~> other

  // END <~~ other

  // START ~~> handler

  // END <~~ handler

  // START ~~> state

  // END <~~ state

  // START ~~> effect

  // history
  // React.useEffect(() => {
  //   history.replace('account/changepassword');
  // }, [history]);

  // END <~~ effect
  return (
    <React.Fragment>
      {/* title */}
      <Typography.Title level={3}>Change password</Typography.Title>
      {/* change password form */}
      <AccountPasswordEd></AccountPasswordEd>
    </React.Fragment>
  );
};

export default AccountPassword;

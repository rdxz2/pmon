import { Avatar, Button, message, Skeleton, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { CtxApi } from '../../../contexts/CtxApi';
import AccountInformationDt from './AccountInformationDt';
import AccountInformationEd from './AccountInformationEd';

const AccountInformation = ({ handleChangeActiveMenu }) => {
  // START --- context

  // api
  const { svsApiPmonIdentity, svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- other variables

  // history
  const history = useHistory();

  // END --- other variables

  // START --- state

  // user detail
  const [dataAccountInformation, dataAccountInformationSet] = React.useState({});
  const [dataAccountInformationLoading, dataAccountInformationLoadingSet] = React.useState(true);

  // information/edit mode
  const [isInformation, isInformationSet] = React.useState(true);

  // END --- state

  // START --- handler

  // get user's details
  const handleLoadUserInformation = React.useCallback(async () => {
    try {
      dataAccountInformationLoadingSet(true);
      const res = await svsApiPmon.sendRequest('user/information', 'get');
      dataAccountInformationSet({ ...res });
    } catch (err) {
      message.error(err);
    } finally {
      dataAccountInformationLoadingSet(false);
    }
  }, [svsApiPmon]);

  // toggle between detail/edit mode
  const handleToggleDetailEditMode = () => isInformationSet(_isDetail => !_isDetail);

  // log out
  const handleLogout = () => {
    try {
      svsApiPmonIdentity.logout();

      message.info('Your are logged out');

      history.replace('/login');
    } catch (err) {}
  };

  // END --- handler

  // START --- effect

  // change active menu
  React.useEffect(() => {
    handleChangeActiveMenu('information');
  }, [handleChangeActiveMenu]);

  // load user detail
  React.useEffect(() => {
    handleLoadUserInformation();
  }, [handleLoadUserInformation]);

  // END --- effect

  return (
    <>
      {/* title */}
      <Typography.Title level={3}>Your account's information</Typography.Title>
      {/* content */}
      {!dataAccountInformationLoading ? (
        <>
          {/* action buttons */}
          <div className="action-buttons">
            {/* user's avatar */}
            <Avatar size="large">RD</Avatar>
            {/* toggle information/edit mode button */}
            <Button onClick={handleToggleDetailEditMode} icon={isInformation ? 'edit' : 'bars'} size="small">
              {isInformation ? 'Edit' : 'Detail'}
            </Button>
            {/* logout button */}
            <Button type="danger" onClick={handleLogout} icon="logout" size="small">
              Log out
            </Button>
          </div>
          {/* show whether information/edit mode */}
          {isInformation ? (
            <AccountInformationDt dataAccountInformation={dataAccountInformation}></AccountInformationDt>
          ) : (
            <AccountInformationEd dataAccountInformation={dataAccountInformation}></AccountInformationEd>
          )}
        </>
      ) : (
        // render skeleton if user data is empty
        <Skeleton avatar paragraph={{ rows: 10 }}></Skeleton>
      )}
    </>
  );
};

export default AccountInformation;

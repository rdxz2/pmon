import moment from 'moment';
import React from 'react';

import CmpDetail from '../../../components/CmpDetail';

const AccountInformationDt = ({ dataAccountInformation, dataAccountInformationLoading }) => {
  return (
    <React.Fragment>
      <CmpDetail label="Username">{dataAccountInformation.username}</CmpDetail>
      <CmpDetail label="Full name">{dataAccountInformation.name}</CmpDetail>
      <CmpDetail label="Email">{dataAccountInformation.email}</CmpDetail>
      <CmpDetail label="Extension number">{dataAccountInformation.ext}</CmpDetail>
      <CmpDetail label="Joined since">{moment(dataAccountInformation.cd).format('DD MMMM YYYY')}</CmpDetail>
    </React.Fragment>
  );
};

export default AccountInformationDt;

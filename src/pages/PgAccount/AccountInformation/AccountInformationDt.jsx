import moment from 'moment';
import React from 'react';

import CmpDetail from '../../../components/CmpDetail';
import { formatDateTime } from '../../../constants/ConstDateFormats';

const AccountInformationDt = ({ dataAccountInformation, dataAccountInformationLoading }) => {
  return (
    <>
      <CmpDetail label="Username">{dataAccountInformation.username}</CmpDetail>
      <CmpDetail label="Full name">{dataAccountInformation.name}</CmpDetail>
      <CmpDetail label="Email">{dataAccountInformation.email}</CmpDetail>
      <CmpDetail label="Extension number">{dataAccountInformation.ext}</CmpDetail>
      <CmpDetail label="Joined since">{moment(dataAccountInformation.cd).format(formatDateTime.standard)}</CmpDetail>
    </>
  );
};

export default AccountInformationDt;

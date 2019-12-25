import { Button, Divider, Input, message } from 'antd';
import React from 'react';

import CmpDetail from '../../../../../../components/CmpDetail';
import { formatDateTime } from '../../../../../../constants/ConstDateFormats';
import { CtxApi } from '../../../../../../contexts/CtxApi';
import { toReadableDateTime } from '../../../../../../utilities/UtlDataManipulator';

const CardDt = ({ id, handleResetUrl, match }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // card's detail
  const [dataCard, dataCardSet] = React.useState({});

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // load card's detail
  const handleLoadCardDetail = React.useCallback(async () => {
    try {
      const res = await svsApiPmon.sendRequest(`card?id=${id}`, 'get');

      dataCardSet({ ...res });
    } catch (err) {
      message.error(err);
    }
  }, [id, svsApiPmon]);

  // END --- handler

  // START --- effect

  // load card's detail
  React.useEffect(() => {
    if (id !== 0) handleLoadCardDetail();
    else handleResetUrl();
  }, [handleLoadCardDetail, handleResetUrl, id]);

  // END --- effect

  return (
    <>
      <Input name="abc"></Input>
      <Input name="def"></Input>
      <Button block type="primary">
        asd
      </Button>
      <Divider type="horizontal"></Divider>
      <div>
        Created by {dataCard.createdBy || '-'} on {toReadableDateTime(dataCard.createdDate, formatDateTime.standard)}
      </div>
      <div>
        Last modified by {dataCard.updatedBy || '-'} on{' '}
        {toReadableDateTime(dataCard.updatedDate, formatDateTime.standard)}
      </div>
    </>
  );
};

export default React.memo(CardDt);

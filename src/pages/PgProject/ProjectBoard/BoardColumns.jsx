import { Button, List, message, Modal } from 'antd';
import React from 'react';
import uuid from 'uuid/v1';

import { CtxApi } from '../../../contexts/CtxApi';
import { isEmptyArray, isEmptyObject } from '../../../utilities/UtlDataManipulator';
import ColumnsColumn from './BoardColumns/ColumnsColumn';
import ColumnCardDt from './BoardColumns/ColumnsColumn/ColumnCardDt';

const BoardColumns = ({ dataProject, dataProjectSet }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // local modify-able columns array
  const [columns, columnsSet] = React.useState([]);

  // card detail's modal
  const [selectedCardTitle, selectedCardTitleSet] = React.useState('');
  const [isCardDetailModalOpen, isCardDetailModalOpenSet] = React.useState(false);

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // card detail modal open/close handler
  const handleCardDetailModalOpen = React.useCallback(title => {
    selectedCardTitleSet(title);
    isCardDetailModalOpenSet(true);
  }, []);
  const handleCardDetailModalClose = () => {
    selectedCardTitleSet('');
    isCardDetailModalOpenSet(false);
  };

  // toggle mode for adding a card in a column
  const handleToggleAddCard = React.useCallback(
    uuid => {
      columnsSet(_columns => {
        let column = _columns.find(v => v.uuid === uuid);
        column.is_adding_card = !column.is_adding_card;
        return [...columns];
      });
    },
    [columns]
  );

  // add a card to a column
  const handleAddCard = React.useCallback(
    async (_uuid, title) => {
      try {
        let dataColumnsTemp = [...dataProject.columns];
        let targetColumn = dataColumnsTemp.find(v => v.uuid === _uuid);

        // send request to server
        // res: {code, title}
        const res = await svsApiPmon.sendRequest('card/add', 'post', {
          columnId: targetColumn.id,
          title
        });

        // store created card server response to local variable
        targetColumn.cards.push({
          uuid: uuid(),
          code: res.code,
          title: res.title
        });

        dataProjectSet(_dataProject => ({ ..._dataProject, columns: [...dataColumnsTemp] }));
      } catch (err) {
        message.error(err);
      }
    },
    [dataProject.columns, dataProjectSet, svsApiPmon]
  );

  // END --- handler

  // START --- effect

  React.useEffect(() => {
    if (!isEmptyArray(dataProject.columns)) columnsSet([...dataProject.columns]);
  }, [dataProject.columns]);

  // END --- effect

  return (
    <>
      {/* project columns */}
      <div className="project-columns">
        {/* wrapper */}
        <List itemLayout="horizontal">
          {/* wrapper */}
          <List.Item>
            {/* render columns if not empty */}
            {!isEmptyArray(columns)
              ? columns.map(column => (
                  <ColumnsColumn
                    key={column.uuid}
                    {...column}
                    handleToggleAddCard={handleToggleAddCard}
                    handleAddCard={handleAddCard}
                    handleCardDetailModalOpen={handleCardDetailModalOpen}
                  ></ColumnsColumn>
                ))
              : null}
            {/* additional column: add column */}
            <List className="project-column" itemLayout="vertical">
              <Button block type="primary" icon="plus"></Button>
            </List>
            {/* dummy column to prevent last column collided with scrollbar */}
            <div className="project-column-last">x</div>
          </List.Item>
        </List>
      </div>
      {/* card detail (inside modal) */}
      <Modal
        centered
        destroyOnClose
        title={selectedCardTitle}
        visible={isCardDetailModalOpen}
        onCancel={handleCardDetailModalClose}
        footer={null}
      >
        <ColumnCardDt></ColumnCardDt>
      </Modal>
    </>
  );
};

export default BoardColumns;

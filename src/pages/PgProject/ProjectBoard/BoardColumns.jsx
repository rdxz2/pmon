import { Button, List, message, Modal } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import uuid from 'uuid/v1';

import { CtxApi } from '../../../contexts/CtxApi';
import { isEmptyArray, isEmptyObject } from '../../../utilities/UtlDataManipulator';
import ColumnsColumn from './BoardColumns/ColumnsColumn';
import CardDt from './BoardColumns/ColumnsColumn/ColumnCard/CardDt';
import ColumnCr from './BoardColumns/ColumnsColumn/ColumnCr';

const defaultSelectedCard = { id: 0, code: '' };

const BoardColumns = ({ dataProject, handleChangeProjectColumnValue, match }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // column adding
  const [isAddingColumn, isAddingColumnSet] = React.useState(false);

  // card detail's modal
  const [selectedCard, selectedCardSet] = React.useState({ ...defaultSelectedCard });
  const [isCardDetailModalOpen, isCardDetailModalOpenSet] = React.useState(true);

  // END --- state

  // START --- other variables

  // history
  const history = useHistory();

  // END --- other variables

  // START --- handler

  // card detail modal open/close handler
  const handleCardDetailModalOpen = React.useCallback(
    (id, code) => {
      // add card code to url
      history.push(`${match.url}/${code}`);

      // select card based on targetted card
      selectedCardSet({ id, code });

      // open modal
      isCardDetailModalOpenSet(true);
    },
    [history, match.url]
  );
  const handleCardDetailModalClose = () => {
    // reset url
    handleResetUrl();

    // reset selected card
    handleResetSelectedCard();

    // close modal
    isCardDetailModalOpenSet(false);
  };

  // reset selected card's value
  const handleResetSelectedCard = React.useCallback(() => selectedCardSet({ ...defaultSelectedCard }), []);

  // reset url (remove card code from url)
  const handleResetUrl = React.useCallback(() => history.push(match.url), [history, match.url]);

  // add a card to a column
  const handleAddCard = React.useCallback(
    async (_uuid, title) => {
      try {
        // get columns from current state
        let columns = [...dataProject.columns];
        let column = columns.find(v => v.uuid === _uuid);

        // send request to server
        // res: {id, code, title}
        const res = await svsApiPmon.sendRequest('card/add', 'post', {
          columnId: column.id,
          title
        });

        // store created card server response to local variable
        column.cards.push({
          ...res,
          uuid: uuid()
        });

        handleChangeProjectColumnValue(columns);
      } catch (err) {
        message.error(err);
      }
    },
    [dataProject.columns, handleChangeProjectColumnValue, svsApiPmon]
  );

  // toggle mode for adding a column
  const handleToggleAddColumn = React.useCallback(() => {
    isAddingColumnSet(_isAddingColumn => !_isAddingColumn);
  }, []);

  // add a column
  const handleAddColumn = React.useCallback(
    async name => {
      try {
        // get columns from current state
        let { id, columns } = dataProject;

        // send request to server
        // res: {id, name, nameNormalized, maxCard, cardsTotalCount}
        const res = await svsApiPmon.sendRequest('column/add', 'post', {
          projectId: id,
          name
        });

        // add 1 column to the state
        columns.push({
          ...res,
          uuid: uuid()
        });

        handleChangeProjectColumnValue(columns);
      } catch (err) {
        message.error(err);
      }
    },
    [dataProject, handleChangeProjectColumnValue, svsApiPmon]
  );

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* project columns */}
      <div className="project-columns">
        {/* wrapper */}
        <List className="project-column-item" itemLayout="horizontal">
          {/* wrapper */}
          <List.Item style={{ paddingTop: 0 }}>
            {/* render columns if not empty */}
            {!isEmptyObject(dataProject)
              ? !isEmptyArray(dataProject.columns)
                ? dataProject.columns.map(column => (
                    <ColumnsColumn
                      key={column.uuid}
                      {...column}
                      // handleToggleAddCard={handleToggleAddCard}
                      handleAddCard={handleAddCard}
                      handleCardDetailModalOpen={handleCardDetailModalOpen}
                    ></ColumnsColumn>
                  ))
                : null
              : null}
            {/* additional column: add column */}
            <List className="project-column" itemLayout="vertical">
              {isAddingColumn ? (
                <ColumnCr handleToggleAddColumn={handleToggleAddColumn} handleAddColumn={handleAddColumn}></ColumnCr>
              ) : (
                <Button block type="primary" icon="plus" onClick={handleToggleAddColumn}></Button>
              )}
            </List>
            {/* dummy column to prevent last column collided with scrollbar */}
            <div className="project-column-last">x</div>
          </List.Item>
        </List>
      </div>
      {/* card detail (inside modal) with routing */}
      <Route
        path={`${match.url}/:code`}
        render={() => (
          <Modal
            width={800}
            centered
            destroyOnClose
            title={selectedCard.code}
            visible={isCardDetailModalOpen}
            onCancel={handleCardDetailModalClose}
            footer={null}
          >
            <CardDt id={selectedCard.id} handleResetUrl={handleResetUrl}></CardDt>
          </Modal>
        )}
      ></Route>
    </>
  );
};

export default React.memo(BoardColumns);

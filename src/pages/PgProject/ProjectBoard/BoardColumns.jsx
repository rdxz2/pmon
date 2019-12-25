import { Button, List, message, Modal } from 'antd';
import React from 'react';
import uuid from 'uuid/v1';

import { CtxApi } from '../../../contexts/CtxApi';
import { isEmptyArray, isEmptyObject } from '../../../utilities/UtlDataManipulator';
import ColumnsColumn from './BoardColumns/ColumnsColumn';
import CardDt from './BoardColumns/ColumnsColumn/ColumnCard/CardDt';
import { useHistory, Route } from 'react-router-dom';

const defaultSelectedCard = { id: 0, code: '' };

const BoardColumns = ({ dataProject, handleChangeProjectColumnValue, match }) => {
  // START --- context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END --- context

  // START --- state

  // local modify-able columns array
  // const [columns, columnsSet] = React.useState([]);

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

  // toggle mode for adding a card in a column
  const handleToggleAddCard = React.useCallback(
    uuid => {
      // get columns from current state
      let tempDataProjectColumns = [...dataProject.columns];
      let targetColumn = tempDataProjectColumns.find(v => v.uuid === uuid);

      // modify column property: is_adding_card
      targetColumn.is_adding_card = !targetColumn.is_adding_card;

      handleChangeProjectColumnValue(tempDataProjectColumns);

      // columnsSet(_columns => {
      //   let column = _columns.find(v => v.uuid === uuid);
      //   column.is_adding_card = !column.is_adding_card;
      //   return [...columns];
      // });
    },
    [dataProject.columns, handleChangeProjectColumnValue]
  );

  // add a card to a column
  const handleAddCard = React.useCallback(
    async (_uuid, title) => {
      try {
        // get columns from current state
        let tempDataProjectColumns = [...dataProject.columns];
        let targetColumn = tempDataProjectColumns.find(v => v.uuid === _uuid);

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

        handleChangeProjectColumnValue(tempDataProjectColumns);

        // dataProjectSet(_dataProject => ({ ..._dataProject, columns: [...tempDataProjectColumns] }));
      } catch (err) {
        message.error(err);
      }
    },
    [dataProject.columns, handleChangeProjectColumnValue, svsApiPmon]
  );

  // END --- handler

  // START --- effect

  // set state
  // React.useEffect(() => {
  //   if (!isEmptyArray(dataProject.columns)) columnsSet([...dataProject.columns]);
  // }, [dataProject.columns]);

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
            {!isEmptyObject(dataProject)
              ? !isEmptyArray(dataProject.columns)
                ? dataProject.columns.map(column => (
                    <ColumnsColumn
                      key={column.uuid}
                      {...column}
                      handleToggleAddCard={handleToggleAddCard}
                      handleAddCard={handleAddCard}
                      handleCardDetailModalOpen={handleCardDetailModalOpen}
                    ></ColumnsColumn>
                  ))
                : null
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
      {/* card detail (inside modal) with routing */}
      <Route
        path={`${match.url}/:code`}
        render={() => (
          <Modal
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

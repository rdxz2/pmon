import React from 'react';
import { List, Typography, Button, Card, Modal, Badge, Divider, message } from 'antd';
import { isEmptyObject, isEmptyArray } from '../../../utilities/UtlDataManipulator';
import CardDt from './Card/CardDt';
import CardCr from './Card/CardCr';
import { CtxApi } from '../../../contexts/CtxApi';

const ProjectColumns = ({ dataProject }) => {
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
  const handleCardDetailModalOpen = title => {
    selectedCardTitleSet(title);
    isCardDetailModalOpenSet(true);
  };
  const handleCardDetailModalClose = () => {
    selectedCardTitleSet('');
    isCardDetailModalOpenSet(false);
  };

  // toggle mode for adding a card in a column
  const handleToggleAddCard = index => {
    columnsSet(_columns => {
      let column = _columns[index];
      column.is_adding_card = !column.is_adding_card;
      return [...columns];
    });
  };

  // add a card to a column
  const handleAddCard = async (index, title) => {
    try {
      await svsApiPmon.sendRequest('card/add', 'post', {
        projectName: dataProject.name_normalized,
        columnName: dataProject.columns[index].name_normalized,
        title
      });
    } catch (err) {
      message.error(err);
    }
  };

  // END --- handler

  // START --- effect

  React.useEffect(() => {
    columnsSet([...dataProject.columns]);
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
              ? columns.map((column, columnIndex) => (
                  <List key={columnIndex} className="project-column" itemLayout="vertical">
                    {/* header */}
                    <Typography.Title level={4} type="secondary">
                      {/* column name */}
                      {column.name.toUpperCase()}
                    </Typography.Title>
                    {/* additional row action */}
                    <div className="project-column-additional">
                      {/* cards count badge */}
                      <Badge count={321}></Badge>
                      {/* divider */}
                      <Divider type="vertical"></Divider>
                      {/* more button */}
                      <Button size="small" shape="circle" type="ghost" icon="more"></Button>
                    </div>
                    {/* cards */}
                    {column.cards.map((card, cardIndex) => (
                      <Card
                        key={cardIndex}
                        className="project-card"
                        onClick={() => handleCardDetailModalOpen(card.code)}
                      >
                        {/* card's content */}
                        {card.title}
                      </Card>
                    ))}
                    {/* footer - add a card */}
                    {column.is_adding_card ? (
                      <Card className="project-card-add">
                        <CardCr
                          handleToggleAddCard={() => handleToggleAddCard(columnIndex)}
                          handleAddCard={async title => await handleAddCard(columnIndex, title)}
                        ></CardCr>
                      </Card>
                    ) : (
                      <Button block type="dashed" icon="plus" onClick={() => handleToggleAddCard(columnIndex)}></Button>
                    )}
                  </List>
                ))
              : null}
            {/* additional column: add column */}
            <List className="project-column" itemLayout="vertical">
              <Button block type="primary" icon="plus"></Button>
            </List>
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
        <CardDt></CardDt>
      </Modal>
    </>
  );
};

export default ProjectColumns;

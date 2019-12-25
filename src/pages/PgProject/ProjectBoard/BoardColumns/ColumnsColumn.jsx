import React from 'react';
import { List, Typography, Badge, Divider, Button, Card } from 'antd';
import ColumnCard from './ColumnsColumn/ColumnCard';
import ColumnCardCr from './ColumnsColumn/ColumnCardCr';

const ColumnsColumn = ({
  uuid,
  name,
  cards,
  is_adding_card,
  handleToggleAddCard,
  handleAddCard,
  handleCardDetailModalOpen
}) => {
  // START --- context

  // END --- context

  // START --- state

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <List key={uuid} className="project-column" itemLayout="vertical">
      {/* header */}
      <Typography.Title className="project-column-title" level={4} type="secondary">
        {/* column name */}
        {name.toUpperCase()}
      </Typography.Title>
      {/* additional row action */}
      <div className="project-column-additional">
        {/* cards count badge */}
        <Badge count={cards.length}></Badge>
        {/* divider */}
        <Divider type="vertical"></Divider>
        {/* more button */}
        <Button size="small" shape="circle" type="ghost" icon="more"></Button>
      </div>
      {/* cards */}
      {cards.map(card => (
        <ColumnCard key={card.uuid} {...card} handleCardDetailModalOpen={handleCardDetailModalOpen}></ColumnCard>
      ))}
      {/* footer - add a card */}
      {is_adding_card ? (
        <Card className="project-card-add">
          <ColumnCardCr
            uuid={uuid}
            handleToggleAddCard={handleToggleAddCard}
            handleAddCard={handleAddCard}
          ></ColumnCardCr>
        </Card>
      ) : (
        <Button block type="dashed" icon="plus" onClick={() => handleToggleAddCard(uuid)}></Button>
      )}
    </List>
  );
};

export default React.memo(ColumnsColumn);

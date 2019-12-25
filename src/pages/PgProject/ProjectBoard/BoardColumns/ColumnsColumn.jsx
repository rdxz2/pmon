import 'rc-color-picker/assets/index.css';

import { Badge, Button, Card, Divider, List, Typography } from 'antd';
import React from 'react';

import { LightenDarkenColor } from '../../../../utilities/UtlColor';
import ColumnCard from './ColumnsColumn/ColumnCard';
import CardCr from './ColumnsColumn/ColumnCard/CardCr';
import ColumnSettingEd from './ColumnsColumn/ColumnSettingEd';

const ColumnsColumn = ({
  uuid,
  name,
  cards,
  setting,
  handleAddCard,
  handleEditColumnSetting,
  handleCardDetailModalOpen
}) => {
  // START --- context

  // END --- context

  // START --- state

  // add card mode
  const [isAddingCard, isAddingCardSet] = React.useState(false);

  // edit column setting mode
  const [isEditingSetting, isEditingSettingSet] = React.useState(false);

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // toggle mode for adding a card in a column
  const handleToggleIsAddingCard = () => isAddingCardSet(_isAddingCard => !_isAddingCard);

  // toggle mode for editing column setting
  const handleChangeIsEditingSetting = _isEditingSetting => isEditingSettingSet(_isEditingSetting);
  const handleToggleIsEditingSetting = () => isEditingSettingSet(_isEditingSetting => !_isEditingSetting);

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <>
      {/* card list */}
      <List key={uuid} className="project-column" itemLayout="vertical" style={{ backgroundColor: setting.color }}>
        {/* edit setting form */}
        {isEditingSetting ? (
          <Card className="project-card-setting-edit">
            <ColumnSettingEd
              uuid={uuid}
              name={name}
              dataSetting={setting}
              handleToggleIsEditingSetting={handleToggleIsEditingSetting}
              handleEditColumnSetting={handleEditColumnSetting}
            ></ColumnSettingEd>
          </Card>
        ) : null}
        {/* header */}
        <Typography.Title
          className="project-column-title"
          level={4}
          type="secondary"
          style={{ backgroundColor: LightenDarkenColor(setting.color, -20) }}
        >
          {/* column name */}
          {name}
        </Typography.Title>
        {/* additional row action */}
        <div className="project-column-additional">
          {/* cards count badge */}
          <Badge className="project-column-badge-count" count={cards.length}></Badge>
          {/* divider */}
          <Divider type="vertical"></Divider>
          {/* edit setting button */}
          <Button
            size="small"
            shape="circle"
            type="primary"
            icon="more"
            onClick={handleToggleIsEditingSetting}
          ></Button>
          {/* divider */}
          <Divider type="vertical"></Divider>
        </div>
        {/* cards */}
        {cards.map(card => (
          <ColumnCard key={card.uuid} {...card} handleCardDetailModalOpen={handleCardDetailModalOpen}></ColumnCard>
        ))}
        {/* footer - add a card */}
        {isAddingCard ? (
          <Card className="project-card-add">
            <CardCr
              uuid={uuid}
              handleToggleIsAddingCard={handleToggleIsAddingCard}
              handleAddCard={handleAddCard}
            ></CardCr>
          </Card>
        ) : (
          <Button block type="dashed" icon="plus" onClick={handleToggleIsAddingCard}></Button>
        )}
      </List>
    </>
  );
};

export default React.memo(ColumnsColumn);

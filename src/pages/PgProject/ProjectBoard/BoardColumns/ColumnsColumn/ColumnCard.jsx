import React from 'react';
import { Card, Typography } from 'antd';

const ColumnCard = ({ uuid, code, title, handleCardDetailModalOpen }) => {
  return (
    <Card key={uuid} className="project-card" onClick={() => handleCardDetailModalOpen(code)}>
      {/* card code */}
      <Typography.Text type="secondary">{code}</Typography.Text>
      {/* card title */}
      <Typography.Paragraph>{title}</Typography.Paragraph>
    </Card>
  );
};

export default React.memo(ColumnCard);

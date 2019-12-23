import React from 'react';
import times from 'lodash/times';
import { Row, Col, Card, List, Button, Typography, Icon } from 'antd';
import { isEmptyArray, isEmptyObject } from '../../../utilities/UtlDataManipulator';
import ProjectColumns from './ProjectColumns';

const ProjectBoard = ({ dataProject }) => {
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
    <>
      {/* header */}
      <Typography.Title level={2}>Lalala</Typography.Title>
      {/* columns */}
      <ProjectColumns dataProject={dataProject}></ProjectColumns>
    </>
  );
};

export default ProjectBoard;

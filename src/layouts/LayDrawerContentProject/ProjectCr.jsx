import { Button, Form, Icon, Input, message, Cascader, Select, Spin } from 'antd';
import React from 'react';

import { CtxApi } from '../../contexts/CtxApi';
// import FormItem from 'antd/lib/form/FormItem';
// import CmpDynamicField from '../../components/CmpDynamicField';
import debounce from 'lodash/debounce';
import { isEmptyObject } from '../../utilities/UtlDataManipulator';
import { useHistory } from 'react-router-dom';

// const dummy = [
//   { value: '1', label: 'sd1', isLeaf: false },
//   { value: '2', label: 'sd2', isLeaf: false },
//   { value: '3', label: 'sd3', isLeaf: false },
//   { value: '4', label: 'sd4', isLeaf: false }
// ];

const ProjectCrWrapped = ({ handleLoadUserProject, handleDrawerCreateProjectClose, form }) => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // form validation
  const { getFieldDecorator, resetFields } = form;

  // history
  const history = useHistory();

  // END <~~ other

  // START ~~> handler

  // submit (create project)
  const handleSubmit = event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      if (!error) {
        try {
          isSubmittingSet(true);

          // cleanse empty array elements
          // values.collaborators = values.collaborators.filter(v => v !== null);
          // values.tes = values.tes.filter(v => v !== null);

          // send request to server
          await svsApiPmon.sendRequest('project/create', 'post', { ...values });

          // display success message
          message.success(`project '${values.name}' created successfully`);

          // close the drawer
          handleDrawerCreateProjectClose();

          // reset the form
          resetFields();

          // reload all user's projects
          handleLoadUserProject();

          // redirect to the newly created project page
          history.push(`/project/${values.name}`);
        } catch (err) {
          message.error(err);
        } finally {
          isSubmittingSet(false);
        }
      }
    });
  };

  // populate select items: user
  const handleSearchSelectUser = debounce(async searchValue => {
    selectUserLoadingSet(true);

    const res = await svsApiPmon.getDropdown('user', searchValue);

    selectUserDataSet([...res]);
    selectUserLoadingSet(false);
  }, 500);

  // END <~~ handler

  // START ~~> state

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // select user
  const [selectUserData, selectUserDataSet] = React.useState([]);
  const [selectUserLoading, selectUserLoadingSet] = React.useState(false);

  // END <~~ state

  // START ~~> effect

  // END <~~ effect

  return (
    <Form onSubmit={handleSubmit}>
      {/* Project name */}
      <Form.Item hasFeedback label="Project name">
        {getFieldDecorator('name', { rules: [{ required: true, message: 'project name is required' }] })(
          <Input autoComplete="off" prefix={<Icon type="idcard" />} placeholder="Project name"></Input>
        )}
      </Form.Item>
      {/* Collaborators */}
      <Form.Item hasFeedback label="Collaborators">
        {getFieldDecorator('collaborators', { rules: [{ type: 'array' }] })(
          <Select
            // labelInValue
            filterOption={false}
            mode="multiple"
            placeholder="Collaborators"
            onSearch={handleSearchSelectUser}
            notFoundContent={
              selectUserLoading ? (
                <Spin size="small"></Spin>
              ) : isEmptyObject(selectUserData) ? (
                'Try to type a username'
              ) : (
                'User not found'
              )
            }
            style={{ width: '100%' }}
          >
            {selectUserData.map(v => (
              <Select.Option key={v.value} value={v.value}>
                {v.text}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      {/* <Form.Item label="Collaborators">
        <CmpDynamicField
          name="collaborators"
          // initialValues={['1xx', '2xx', '3xx']}
          fields={{
            name: 'collaborator',
            validation: {},
            field: () => <Input placeholder="Collaborator"></Input>
          }}
          form={form}
        ></CmpDynamicField>
      </Form.Item> */}
      {/* Image */}
      {/* Template */}
      {/* Tes */}
      {/* <Form.Item label="tes">
        <CmpDynamicField
          name="tes"
          // initialValues={[
          //   { tes1: 'a', tes2: 'b', tes3: 'c' },
          //   { tes1: 'd', tes2: 'e', tes3: 'f' },
          //   { tes1: 'adsv', tes2: 'dwd', tes3: 'asd' },
          //   { tes1: 'asdv', tes2: 'bsds', tes3: 'csadsd' }
          // ]}
          fields={[
            { name: 'tes1', colSpan: 5, field: () => <Input placeholder="placeholder tes1"></Input> },
            { name: 'tes2', colSpan: 6, field: () => <Input placeholder="placeholder tes2"></Input> },
            { name: 'tes3', colSpan: 10, field: () => <Input placeholder="placeholder tes3"></Input> }
          ]}
          form={form}
        ></CmpDynamicField>
      </Form.Item> */}
      {/* submit button */}
      <Form.Item>
        <Button block type="primary" htmlType="submit" icon="save" loading={isSubmitting}>
          Create project
        </Button>
      </Form.Item>
    </Form>
  );
};

const ProjectCr = Form.create()(ProjectCrWrapped);

export default ProjectCr;

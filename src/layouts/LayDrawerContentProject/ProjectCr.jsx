import { Button, Form, Icon, Input, message, Cascader } from 'antd';
import React from 'react';

import { CtxApi } from '../../contexts/CtxApi';
import FormItem from 'antd/lib/form/FormItem';
import CmpDynamicField from '../../components/CmpDynamicField';

const dummy = [
  { value: '1', label: 'sd1', isLeaf: false },
  { value: '2', label: 'sd2', isLeaf: false },
  { value: '3', label: 'sd3', isLeaf: false },
  { value: '4', label: 'sd4', isLeaf: false }
];

const ProjectCrWrapped = ({ form }) => {
  // START ~~> context

  // api
  const { svsApiPmon } = React.useContext(CtxApi);

  // END <~~ context

  // START ~~> other

  // form validation
  const { getFieldDecorator } = form;

  // END <~~ other

  // START ~~> handler

  // submit (create project)
  const handleSubmit = event => {
    event.preventDefault();

    form.validateFields(async (error, values) => {
      console.log('values', values);
      // if (!error) {
      //   try {
      //     isSubmittingSet(true);

      //     // log in to identity server -> set jwt to local storage
      //     await svsApiPmon.sendRequest('project/create', 'post', { ...values });

      //     message.success(`project '${values.name}' created successfully`);
      //   } catch (err) {
      //     isSubmittingSet(false);

      //     message.error(err);
      //   }
      // }
    });
  };

  // END <~~ handler

  // START ~~> state

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

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
      <Form.List name="collaborators">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Passengers' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field."
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                  </Form.Item>
                  {fields.length > 1 ? <Icon name="minus-circle-o"></Icon> : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <Icon name="plus-circle-o"></Icon>
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      {/* <Form.Item label="Collaborators">
        <CmpDynamicField
          name="collaborators"
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
      <Form.Item label="tes">
        {/* <CmpDynamicField
          name="tes"
          initialValues={[
            { tes1: 'a', tes2: 'b', tes3: 'c' },
            { tes1: 'd', tes2: 'e', tes3: 'f' },
            { tes1: 'adsv', tes2: 'dwd', tes3: 'asd' },
            { tes1: 'asdv', tes2: 'bsds', tes3: 'csadsd' }
          ]}
          fields={[
            { name: 'tes1', colSpan: 5, field: () => <Input placeholder="placeholder tes1"></Input> },
            { name: 'tes2', colSpan: 6, field: () => <Input placeholder="placeholder tes2"></Input> },
            { name: 'tes3', colSpan: 10, field: () => <Input placeholder="placeholder tes3"></Input> }
          ]}
          form={form}
        ></CmpDynamicField> */}
      </Form.Item>
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

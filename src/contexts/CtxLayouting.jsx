import React from 'react';

export const CtxLayouting = React.createContext({
  formItemLayout: {
    body: {},
    action: {}
  }
});

const CtxPvdLayouting = ({ children }) => {
  // START ~~> state

  // label & input field in form
  const [formItemLayout] = React.useState({
    // form body
    body: {
      labelCol: 24,
      wrapperCol: 24
      // labelCol: {
      // xs: { span: 24 },
      // sm: { span: 8 }
      // md: { span: 24 },
      // lg: { span: 24 }
      // },
      // wrapperCol: {
      // xs: { span: 24 },
      // sm: { span: 16 }
      // md: { span: 24 },
      // lg: { span: 24 }
      // }
    },
    // form footer/actions
    action: {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 }
      }
    }
  });

  // END <~~ state

  return <CtxLayouting.Provider value={{ formItemLayout }}>{children}</CtxLayouting.Provider>;
};

export default CtxPvdLayouting;

import React from 'react';

export const CtxLayouting = React.createContext({
  formItemLayout: {
    body: {},
    action: {}
  }
});

const CtxPvdLayouting = ({ children }) => {
  // state
  // label & input field in form
  const [formItemLayout] = React.useState({
    body: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    },
    action: {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 }
      }
    }
  });

  return <CtxLayouting.Provider value={{ formItemLayout }}>{children}</CtxLayouting.Provider>;
};

export default CtxPvdLayouting;

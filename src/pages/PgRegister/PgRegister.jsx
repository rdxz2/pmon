import { Divider, Icon } from "antd";
import React from "react";
import "./PgRegister.css";
import FrRegister from "./FrRegister";

const PgRegister = () => {
  return (
    <div className="page-register">
      {/* title */}
      <Divider type="horizontal">
        <Icon type="user"></Icon>
        Pmon - Registration
      </Divider>
      {/* register form */}
      <FrRegister></FrRegister>
    </div>
  );
};

export default PgRegister;

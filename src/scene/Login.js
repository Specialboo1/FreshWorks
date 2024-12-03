import React, { useState } from "react";
import LoginLayout from "../scenecomponents/LoginLayout";

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    data: {
      email_id: "",
      password: "",
    },
    error: {},
  });

  const onClick = () => {};

  const onChange = (value, key) => {
    let loginData = { ...loginDetails };
    loginData.data[key] = value.trim();
    loginData.error = loginData.error || {};
    loginData.error[key] = value ? false : `This field is required`;
    setLoginDetails(loginData);
  };

  return (
    <LoginLayout
      onClick={onClick}
      onChange={onChange}
      loginDetails={loginDetails}
      {...props}
    />
  );
};
export default Login;

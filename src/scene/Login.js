import React, { useState, useContext } from "react";
import LoginLayout from "../scenecomponents/LoginLayout";
import { AuthContext } from "../Authentication";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    data: {
      email_id: "",
      password: "",
    },
    error: {},
  });
  const navigate = useNavigate();

  const onClick = () => {
    login();
    navigate("/card");
  };

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
    />
  );
};
export default Login;

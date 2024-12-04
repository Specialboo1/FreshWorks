import React, { useState, useRef, useEffect } from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button";
import PropTypes from "prop-types";
import "./LoginLayout.scss";
import { handleKeyPress } from "../common/Functions";

const LoginLayout = ({ loginDetails, onChange, onClick }) => {
  const [showpwd, setshowpwd] = useState(false);
  const [dataRefs, setDataRefs] = useState([]);

  const buttonFieldRef = useRef(null);

  useEffect(() => {
    if (dataRefs && dataRefs[0] && dataRefs[0].current) {
      handleKeyPress({ key: "Enter" }, dataRefs[0]);
    }
  }, [dataRefs]);
  useEffect(() => {
    setDataRefs((elRefs) =>
      Array(2)
        .fill()
        .map((_, i) => elRefs[i] || React.createRef())
    );
  }, []);

  const LOGIN_INPUTS = [
    {
      type: "text",
      title: "Email Address",
      placeholder: "Email Address",
      key: "email_id",
    },
    {
      type: "password",
      title: "Password",
      placeholder: "Password",
      key: "password",
      isPassword: true,
    },
  ];

  return (
    <div className="auth-container">
      <div className="main-section">
        <div className="text-lg">Welcome!</div>
        <div className="inputgroup">
          {LOGIN_INPUTS.map((element, i) => (
            <div style={{ marginBottom: 10 }} key={element.key}>
              <Input
                title={""}
                inputType={
                  element.isPassword
                    ? showpwd
                      ? "text"
                      : "password"
                    : element.type
                }
                placeholder={element.placeholder}
                content={loginDetails.data[element.key]}
                name={element.key}
                onChange={onChange}
                index={i}
                isPassword={element.isPassword}
                showPassword={() => setshowpwd(!showpwd)}
                error={loginDetails.error && loginDetails.error[element.key]}
                onKeyPress={(e) => {
                  if (dataRefs[i + 1]) {
                    handleKeyPress(e, dataRefs[i + 1], true);
                    handleKeyPress(e, dataRefs[i + 1]);
                  } else {
                    handleKeyPress(e, buttonFieldRef, true);
                  }
                }}
                // onForgotPasswordClick={() =>
                //   props.history.push("/forgot-password/")
                // }
                ref={dataRefs[i]}
              />
            </div>
          ))}
        </div>
        <Button
          buttontxt="Login"
          type="primary"
          isSmall={false}
          style={{
            width: "100%",
          }}
          refer={buttonFieldRef}
          onClick={onClick}
        />
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            marginTop: 16,
            color: "#464646",
          }}
        >
          CLICK LOGIN TO PROCEED WITHOUT CREDENTIALS
        </div>
      </div>
    </div>
  );
};
LoginLayout.propTypes = {
  loginDetails: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
export default LoginLayout;

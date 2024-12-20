import React from "react";
import ProTypes from "prop-types";
import "./Button.scss";
import IconComponent from "../Icon/Icon";

const BtnConfig = {
  primary: "primary",
  secondary: "secondary",
  hyperlink: "hyperlink",
  tertiary: "tertiary",
  white: "white",
  error: "errorType",
};

const Button = ({
  buttontxt,
  color,
  buttonIcon,
  backgroundColor,
  type,
  disabled,
  onClick,
  active,
  borderColor,
  borderRadius,
  className,
  isSmall,
  refer,
  style = {},
  buttonCustomIcon,
  marginLeft,
  marginRight,
}) => (
  <div
    className={`${BtnConfig[type]} ${active ? "active" : ""} ${
      disabled ? "disabled" : ""
    } ${className || ""}`}
    style={{
      minWidth: isSmall ? "80px" : type === "hyperlink" ? "auto" : "100px",
      width: "fit-content",
      height: isSmall ? "30px" : type === "hyperlink" ? "auto" : "46px",
      color,
      backgroundColor,
      borderRadius,
      marginLeft,
      marginRight,
      ...style,
    }}
  >
    <button
      type="submit"
      ref={refer}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      style={{
        color,
        backgroundColor,
        borderColor,
        borderRadius,
        paddingLeft: isSmall ? "10px" : type === "hyperlink" ? "0px" : "20px",
        paddingRight: isSmall ? "10px" : type === "hyperlink" ? "0px" : "20px",
      }}
    >
      <div className="textWrapper">
        {buttonIcon && <span className="icon">+</span>}
        {buttonCustomIcon && (
          <div style={{ margin: "7px 10px 0px 0px" }}>
            <IconComponent icon={buttonCustomIcon} color="green" size="18px" />
          </div>
        )}
        <span
          style={
            active
              ? {
                  textDecoration: active ? "underline" : "none",
                  fontWeight: active ? 600 : "initial",
                }
              : {}
          }
        >
          {buttontxt}
        </span>
      </div>
    </button>
  </div>
);

Button.propTypes = {
  buttontxt: ProTypes.string,
  height: ProTypes.oneOfType([ProTypes.string, ProTypes.number]),
  width: ProTypes.string,
  buttonIcon: ProTypes.string,
  type: ProTypes.string,
  disabled: ProTypes.bool,
  active: ProTypes.bool,
  color: ProTypes.string,
  backgroundColor: ProTypes.string,
  borderColor: ProTypes.string,
  borderRadius: ProTypes.string,
  onClick: ProTypes.func,
  className: ProTypes.string,
  style: ProTypes.object,
  isSmall: ProTypes.bool,
  refer: ProTypes.any,
  buttonCustomIcon: ProTypes.any,
  marginLeft: ProTypes.any,
  marginRight: ProTypes.string || ProTypes.number,
};
export default Button;

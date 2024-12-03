import React from "react";
import PropTypes from "prop-types";
import "../styles/stylesheet.scss";

const IconComponent = ({
  icon,
  color,
  size,
  onClick,
  transform,
  disabled,
  dataFlip,
  propstyle,
}) => (
  <a
    onClick={onClick}
    disabled={disabled}
    style={
      propstyle
        ? propstyle
        : {
            height: size ? size : "18px",
            width: size ? size : "18px",
            cursor: "inherit",
          }
    }
  >
    <span
      className="iconify"
      data-icon={icon}
      data-inline="false"
      data-flip={dataFlip}
      style={{
        color: color ? color : "#000000",
        height: size ? size : "18px",
        width: size ? size : "18px",
        transform: `${transform} !important`,
      }}
    />
  </a>
);
IconComponent.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.any,
  color: PropTypes.string,
  onClick: PropTypes.func,
  transform: PropTypes.string,
  dataFlip: PropTypes.string,
  disabled: PropTypes.bool,
};

export const HalfStarIconComponent = ({ color, size, subcolor }) => (
  <span
    style={{
      width: "max-content",
      position: "absolute",
    }}
  >
    <span
      style={{
        position: "absolute",
        width: size ? size : "18px",
        height: size ? size : "18px",
        clipPath: "inset(0 50% 0 0)",
        top: 0,
        left: 0,
      }}
    >
      <IconComponent icon="ant-design:star-filled" color={color} size={size} />
    </span>
    <span
      style={{
        position: "absolute",
        width: size ? size : "18px",
        height: size ? size : "18px",
        clipPath: "inset(0 0 0 50%)",
        top: 0,
        left: 0,
      }}
    >
      <IconComponent
        icon="ant-design:star-filled"
        color={subcolor ? subcolor : "#fff"}
        size={size}
      />
    </span>
  </span>
);

HalfStarIconComponent.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any,
  subcolor: PropTypes.string,
};

export default IconComponent;

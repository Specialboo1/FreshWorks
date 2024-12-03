/* eslint-disable react/display-name */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";
import searchIcon from "../../../public/search.png";
import eyeIcon from "public/eye.png";
import closeIcon from "public/modal-close.png";
import IconComponent from "../Icon/Icon";

const FormInput = React.forwardRef((props, ref) => {
  const [isSearchEnable, setisSearchEnable] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const {
    title,
    name,
    inputType,
    content,
    placeholder,
    error,
    disabled,
    onChange,
    showForgotPswd = true,
    isSearchInput,
    verify,
    onverifyClick,
    belowText,
    rightText,
    isPassword,
    showPassword,
    searchInput,
    refer,
    isMulti,
    isMultiContent,
    onFocus,
    height,
    deleteMulti,
    onKeyPress,
    inputLength,
    clear = false,
    removeContent,
    onBlur,
    formGroupProps,
    onForgotPasswordClick,
    index,
    fontWeight,
    varWidth,
    varHeight,
    titleStyle,
    onRightTextCLick,
    maxLength,
    defaultValue,
    ...restProps
  } = props;

  return (
    <div className={`formGroup ${error ? "error" : ""}`} style={formGroupProps}>
      <label>
        {title && (
          <div className="titleWrapper">
            <div
              className="title"
              style={{
                ...titleStyle,
                color: isFocused ? "#000" : "rgba(0, 0, 0, 0.7)",
              }}
            >
              {title}
            </div>
          </div>
        )}
        <div
          className={isMulti ? "input-wrapper multiple" : "input-wrapper"}
          style={{ width: varWidth, height: varHeight ? varHeight : 61 }}
        >
          {isMulti && isMultiContent && isMultiContent.length >= 1 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                padding: 5,
              }}
            >
              {isMultiContent.map((item, key) => {
                return (
                  <span key={key}>
                    {item}{" "}
                    <em
                      onClick={() => {
                        !disabled && deleteMulti(item);
                      }}
                    >
                      X
                    </em>
                  </span>
                );
              })}
            </div>
          )}
          <div
            style={{
              display: "flex",
              border: `${
                name === "consecutive_booking_discount_percent"
                  ? "1px solid #8f9098"
                  : "none"
              }`,
              borderRadius: "4px",
              width: "100%",
            }}
          >
            <input
              onClick={() => setisSearchEnable(!isSearchEnable)}
              onFocus={() => {
                setIsFocused(true); // Set focus state to true
                if (onFocus) {
                  onFocus();
                }
              }}
              onBlur={() => {
                setIsFocused(false); // Set focus state to false
                if (onBlur) {
                  onBlur();
                }
              }}
              className="form-input"
              defaultValue={defaultValue ? defaultValue : ""}
              name={name}
              type={inputType}
              value={content ? content : ""}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => {
                if (inputLength && e.target.value.length <= inputLength) {
                  onChange(e.target.value, e.target.name);
                } else if (!inputLength)
                  onChange(e.target.value, e.target.name);
                if (searchInput) {
                  setisSearchEnable(true);
                }
              }}
              onKeyPress={(e) =>
                onKeyPress ? onKeyPress(e, index, true) : null
              }
              onKeyDown={(e) => {
                if (
                  inputType === "number" &&
                  !/[\d.]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "Tab",
                    "Enter",
                    "ArrowLeft",
                    "ArrowRight",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }

                if (
                  inputType === "number" &&
                  e.key === "." &&
                  e.target.value.includes(".")
                ) {
                  e.preventDefault();
                }
              }}
              {...restProps}
              ref={refer || ref}
              maxLength={maxLength ? maxLength : false}
              style={{
                paddingLeft: isSearchInput ? 45 : 15,
                paddingRight: isPassword || error ? 45 : 15,
                height: inputType === "textarea" && (height || 100),
                paddingTop: 12,
                paddingBottom: 12,
                borderColor: error && "#e93024",
                border:
                  name === "consecutive_booking_discount_percent" && "none",
                borderRadius:
                  name === "consecutive_booking_discount_percent"
                    ? "12px 0px 0px 12px"
                    : "12px",
              }}
            />
            {name === "consecutive_booking_discount_percent" && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "10px",
                  width: "30px",
                  backgroundColor: "#ffffff",
                  borderRadius: "0px 12px 12px 0px",
                  cursor: disabled ? "no-drop" : "initial",
                }}
              >
                %
              </span>
            )}
          </div>
          {content && clear ? (
            <div
              className="search-icon clear-icon"
              onClick={() => removeContent()}
            >
              <img src={closeIcon} alt="search-icon"></img>
            </div>
          ) : null}

          {verify && (
            <div className="verify-text" onClick={onverifyClick}>
              <span>Verify</span>
            </div>
          )}
          {isSearchInput && (
            <div className="search-icon">
              <img src={searchIcon} alt="search-icon"></img>
            </div>
          )}
          {isPassword && (
            <div className="error-icon" onClick={showPassword}>
              {inputType === "text" ? (
                <IconComponent
                  icon="mdi:eye-off"
                  color="#686c7c"
                  size={20}
                  dataFlip="horizontal"
                />
              ) : (
                <img src={eyeIcon} alt="eye-icon"></img>
              )}
            </div>
          )}

          {rightText && (
            <div className="right-text" onClick={onRightTextCLick}>
              {rightText}
            </div>
          )}
        </div>
      </label>
      <div className="inputInfo" style={{ minHeight: 21 }}>
        {belowText}
        <div className="error-field-input">{error}</div>
      </div>
      {isPassword && showForgotPswd && (
        <div className="inputInfo" style={{ paddingBottom: 10, paddingTop: 5 }}>
          <div className="forgotPassword link" onClick={onForgotPasswordClick}>
            forgot password?
          </div>
        </div>
      )}
    </div>
  );
});

FormInput.propTypes = {
  inputType: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  belowText: PropTypes.string,
  rightText: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  isSearchInput: PropTypes.bool,
  verify: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  showPassword: PropTypes.func,
  isPassword: PropTypes.bool,
  searchInput: PropTypes.any,
  isMulti: PropTypes.bool,
  isMultiContent: PropTypes.any,
  deleteMulti: PropTypes.func,
  onverifyClick: PropTypes.func,
  clear: PropTypes.bool,
  removeContent: PropTypes.func,
  onBlur: PropTypes.func,
  formGroupProps: PropTypes.object,
  onForgotPasswordClick: PropTypes.func,
  inputLength: PropTypes.number,
  index: PropTypes.number,
  varWidth: PropTypes.any,
  varHeight: PropTypes.any,
  titleStyle: PropTypes.object,
  onRightTextCLick: PropTypes.func,
  maxLength: PropTypes.any,
  defaultValue: PropTypes.any,
};

export default FormInput;

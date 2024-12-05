import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Icon as IconComponent } from "@iconify/react/dist/iconify.js";

const PageHeader = ({
  heading,
  subheading,
  subheading1,
  children,
  headingClass = "",
  goBack1,
  subheadingClass = "",
  subheadingStyle = {},
  newstyle = false,
  verticalLine = false,
}) => {
  return (
    <>
      {newstyle ? (
        <div className="newWrap">
          {verticalLine && <div className="verticalLine"></div>}
          <div className="newstyle">{subheading}</div>
        </div>
      ) : (
        <div className="sub-header">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            {goBack1 ? (
              <span style={{ marginRight: 10 }}>
                <IconComponent
                  icon="akar-icons:chevron-left"
                  onClick={goBack1}
                  style={{ width: "21px", height: "21px", color: "#000" }}
                />
              </span>
            ) : null}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className={`heading ${headingClass}`}
                onClick={() => (goBack1 ? goBack1() : null)}
                style={{ cursor: goBack1 ? "pointer" : "initial" }}
              >
                {`${heading}`}
              </div>

              {subheading && (
                <div
                  className={`sub-heading ${subheadingClass}`}
                  style={subheadingStyle}
                >
                  &nbsp;
                  {`/ ${subheading}`}
                  {subheading1 ? (
                    <span style={{ marginLeft: 30 }}>{subheading1}</span>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>{children}</div>
        </div>
      )}
    </>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  subheading1: PropTypes.string,
  subheadingClass: PropTypes.string,
  headingClass: PropTypes.string,
  children: PropTypes.any,
  subheadingStyle: PropTypes.object,
  goBack1: PropTypes.func,
};
export default PageHeader;

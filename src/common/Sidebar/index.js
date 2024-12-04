/* eslint-disable import/no-unresolved */
import React, { useContext, useRef } from "react";
import { Menu } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication";
import "./styles.scss";

const SideBar = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="nav-container" ref={menuRef}>
      <Menu
        theme="dark"
        selectedKeys={[window.location.pathname]}
        mode="inline"
      >
        <Menu.Item key="/card">
          <div className="flexCenter">
            <div className="menuIcon icons">
              <Icon
                icon="fa-solid:id-card"
                style={{ color: "#000000", height: "18px", width: "18px" }}
              />
            </div>

            <div
              style={{
                color: "black",
                fontWeight: "600",
              }}
            >
              {"Card"}
            </div>
          </div>
        </Menu.Item>
        <Menu.Item key="/logout" onClick={() => logout()}>
          <div className="flexCenter">
            <div className="menuIcon icons">
              <Icon
                icon="fa-solid:sign-out-alt"
                style={{ color: "#000000", height: "18px", width: "18px" }}
              />
            </div>

            <div
              style={{
                color: "black",
                fontWeight: "600",
              }}
            >
              {"Log out"}
            </div>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;

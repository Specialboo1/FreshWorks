/* eslint-disable import/no-unresolved */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import "./Table.scss";
import { ConfigProvider, Table } from "antd";
import { Icon as IconComponent } from "@iconify/react";
import PropTypes from "prop-types";
import Loader from "../CenteredSpinner";

const TableComponent = ({
  headings,
  data,
  limit,
  total,
  onChange,
  current,
  loading = false,
  hideClass = false,
  selectionType,
  onClick,
  onFirstLastChange,
  rowKeyId,
  onCheckBoxChange,
  scrollX,
  className,
  borderRadius,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  let PageDetails = {
    pageSize: limit,
    showSizeChanger: false,
    total: total,
    hideOnSinglePage: true,
    current: current,
    showTotal: (total) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedRows.length ? (
          <div
            style={{
              display: "flex",
              backgroundColor: "#e5f1ed",
              padding: "5px 20px 0px",
              marginRight: 20,
            }}
          >
            <div style={{ marginRight: 10, paddingTop: 5 }}>
              <IconComponent
                icon="ci:close-big"
                style={{ color: "#00704a", height: "20px", width: "20px" }}
                onClick={() => {
                  onCheckBoxChange([], []);
                  setSelectedRows([]);
                }}
              />
            </div>
            <div style={{ color: "#00704a" }}>
              {selectedRows.length} SELECTED
            </div>
          </div>
        ) : null}
        <div>
          Showing Page {current} of {total / limit}
        </div>
      </div>
    ),
    itemRender: (current, type, originalElement) => {
      if (type === "prev") {
        return (
          <>
            <div
              className="prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                onFirstLastChange("first");
              }}
              title="First page"
              style={{ marginRight: 12 }}
            >
              <div className="arrow prev">
                <span
                  className="iconify"
                  data-icon="ant-design:double-left-outlined"
                ></span>
              </div>
            </div>
            <div className="prev-btn">
              <div className="arrow prev">
                <span
                  className="iconify"
                  data-icon="akar-icons:chevron-left"
                ></span>
              </div>
            </div>
          </>
        );
      }
      if (type === "next") {
        return (
          <>
            <div className="next-btn" style={{ marginRight: 12 }}>
              <div className="arrow next">
                <span
                  className="iconify"
                  data-icon="akar-icons:chevron-right"
                ></span>
              </div>
            </div>
            <div
              className="next-btn"
              onClick={(e) => {
                e.stopPropagation();
                onFirstLastChange("last");
              }}
              title="Last page"
            >
              <div className="arrow next">
                <span
                  className="iconify"
                  data-icon="ant-design:double-right-outlined"
                ></span>
              </div>
            </div>
          </>
        );
      }
      return originalElement;
    },
    showQuickJumper: { goButton: <button>GO</button> },
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys, selectedRows) => {
      onCheckBoxChange(selectedRowKeys, selectedRows);
      setSelectedRows(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <ConfigProvider renderEmpty={() => <div style={{ minHeight: "400px" }} />}>
      <Table
        columns={headings}
        dataSource={data}
        scroll={{ x: scrollX || 1100 }}
        pagination={limit && current && total ? PageDetails : false}
        onChange={onChange}
        loading={loading}
        className={`${
          hideClass && `hideAction ${data && data.length > 0 && "hideData"}`
        } ${className || ""}`}
        style={{
          cursor: onClick && "pointer",
          borderRadius: borderRadius,
          overflow: "hidden",
          minHeight: loading.spinning ? "300px" : "",
        }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        rowKey={(data) => data[rowKeyId] || data.id}
        onRow={(record, rowIndex) => ({
          onClick: () => onClick && onClick(record, rowIndex),
        })}
        rowSelection={
          selectionType
            ? {
                type: selectionType,
                ...rowSelection,
              }
            : false
        }
      />
    </ConfigProvider>
  );
};

TableComponent.propTypes = {
  headings: PropTypes.array,
  data: PropTypes.array,
  pagination: PropTypes.bool,
  limit: PropTypes.any,
  total: PropTypes.any,
  onChange: PropTypes.func,
  current: PropTypes.any,
  loading: PropTypes.bool,
  hideClass: PropTypes.bool,
  selectionType: PropTypes.string,
  onClick: PropTypes.func,
  onFirstLastChange: PropTypes.func,
  rowKeyId: PropTypes.any,
  onCheckBoxChange: PropTypes.func,
  scrollX: PropTypes.number,
  className: PropTypes.string,
};

export default TableComponent;

import React, { useState } from "react";
import SideBar from "../common/Sidebar";
import TableComponent from "../common/Table";
import PropTypes from "prop-types";

const CardLayout = ({ data = [], isLoading = false, onClickRow }) => {
  const [page, setPage] = useState(1);
  const headings = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <SideBar />
      <div
        style={{
          margin: "30px 0px 0px calc(18% + 50px)",
          color: "black",
          fontWeight: 600,
          fontSize: "20px",
        }}
      >
        List of Posts
      </div>
      <div
        style={{
          width: "75%",
          marginLeft: "calc(18% + 50px)",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <TableComponent
          data={data}
          headings={headings}
          scrollX={800}
          pagination
          loading={{
            spinning: isLoading,
          }}
          limit={10}
          total={data.length}
          current={page}
          onClick={onClickRow}
          onChange={(val) => {
            if (val.current > 0) {
              setPage(val.current);
            }
          }}
        />
      </div>
    </div>
  );
};

CardLayout.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onClickRow: PropTypes.func,
};
export default CardLayout;

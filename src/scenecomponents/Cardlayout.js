import React, { useState } from "react";
import CardDetailLayout from "./CardDetailLayout";
import SideBar from "../common/Sidebar";
import TableComponent from "../common/Table";
import PropTypes from "prop-types";
import Spinner from "../common/CenteredSpinner";

const CardLayout = ({
  data = [],
  isLoading = false,
  onClickRow,
  selectedData,
  detailpage,
  comments,
  onGoBack,
  cmtLoading,
}) => {
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <SideBar />
      {detailpage ? (
        <div style={{ margin: "30px 0px 0px calc(18% + 50px)", width: "73%" }}>
          {cmtLoading ? (
            <Spinner size={"100px"} />
          ) : (
            <CardDetailLayout
              onGoBack={onGoBack}
              comments={comments}
              selectedData={selectedData}
            />
          )}
        </div>
      ) : (
        <>
          <div
            style={{
              margin: "30px 0px 0px calc(18% + 50px)",
              color: "black",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            List of Posts (Click a row to see comments)
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
        </>
      )}
    </div>
  );
};

CardLayout.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onClickRow: PropTypes.func,
  detailpage: PropTypes.bool,
  selectedData: PropTypes.object,
  comments: PropTypes.object,
  onGoBack: PropTypes.func,
  cmtLoading: PropTypes.bool,
};
export default CardLayout;

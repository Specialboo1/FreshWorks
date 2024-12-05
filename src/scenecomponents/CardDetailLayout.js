import React from "react";
import PageHeader from "../common/PageHeader";
import PropTypes from "prop-types";
import chaticon from "../assets/chaticon.svg";

const CardDetailLayout = ({ onGoBack, comments, selectedData }) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <PageHeader heading="Posts" subheading="Post Detail" goBack1={onGoBack} />
      <div
        style={{
          marginTop: "30px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          padding: "30px",
          width: "100%",
          minHeight: "70vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            paddingBottom: "20px",
            borderBottom: "2px dotted grey",
          }}
        >
          <div
            style={{
              borderRadius: "50px",
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "0.5px solid grey",
              overflow: "hidden",
            }}
          >
            <img
              src={selectedData.url}
              alt="img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{selectedData.author}</div>
            <div style={{ marginTop: "10px" }}>{selectedData.title}</div>
          </div>
        </div>
        <div style={{ padding: "20px 0px", borderBottom: "2px dotted grey" }}>
          {selectedData.body}
        </div>
        <div
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <img src={chaticon} alt="img" style={{ marginTop: "5px" }} />
          <span
            style={{ marginLeft: "10px" }}
          >{`${comments.data.length} comments`}</span>
        </div>
        {comments.data &&
          comments.data.length &&
          comments.data.map((e, i) => (
            <div
              key={i}
              style={{
                padding: "20px",
                backgroundColor: "#f0f1f2",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>{e.name}</span>
                {" -- "}
                <span>{e.email}</span>
              </div>
              <div style={{ marginTop: "10px" }}>{e.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
CardDetailLayout.propTypes = {
  comments: PropTypes.object,
  selectedData: PropTypes.object,
  onGoBack: PropTypes.func,
};
export default CardDetailLayout;

import React from "react";
import Comment from "./Comment/Comment";
import CommentImg from "../../../assets/comment.svg";

const CommentList = (props) => {
  const commentList = {
    marginTop: "30px",
    width: "100%",
    backgroundColor: "#F9f9f9",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };
  const commentList_header = {
    width: "100%",
    padding: "15px",
    backgroundColor: "#ecebeb",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };
  const commentList_header_text = {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "16px",
    color: "black",
    display: "inline-block",
    paddingLeft: "10px",
  };

  const commentList_header_image = {
    width: "24px",
    height: "auto",
  };
  const commentList_wrapper = {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "10px",
    paddingBottom: "10px"
  }

  return (
    <div style={commentList}>
      <div style={commentList_header}>
        <img style={commentList_header_image} src={CommentImg} />
        <h5 style={commentList_header_text}>
          {" "}
          {props.comments.length} Comment{props.comments.length > 1 ? "s" : ""}
        </h5>
      </div>

      <div style={commentList_wrapper}>
        {props.comments.length === 0 ? (
          <div className="alert text-center alert-info">
            Be the first to comment
          </div>
        ) : null}
        {props.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default CommentList;

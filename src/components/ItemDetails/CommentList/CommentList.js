import React from "react";
import Comment from "./Comment/Comment";
import CommentImg from "../../../assets/comment.svg";

const CommentList = (props) => {
    const {comments} = props.comments;
    return (
        <div className="commentList">
          <h5 className="commentList__header">
          <img className="commentList__header__image" src={CommentImg}/>
          {" "}{comments.length}{" "}
            Comment{comments.length > 0 ? "s" : ""}
          </h5>
    
          {comments.length === 0 ? (
            <div className="alert text-center alert-info">
              Be the first to comment
            </div>
          ) : null}
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
    
        </div>
      );

}
export default CommentList;
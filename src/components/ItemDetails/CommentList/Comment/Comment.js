import React from "react";
import TimeAgo from "react-timeago";
import UserImg from "../../../../assets/user2.png";

const Comment = (props) =>{
    const { userName, comment, date } = props.comment;

    const comment_container = {
      borderBottom: "1px solid #ececec",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      display: "flex",
      alignItems: "flex-start"
    }

    const comment_image = {
      marginTop: "12px",
      width: "auto",
      height: "auto",
      maxWidth: "42px",
      maxHeight: "42px"
    }

    return (
        <div style={comment_container}>
          <img
            className="mr-3"
            width="48"
            height="48"
            style={comment_image}
            src={UserImg}
            alt={userName}
          />
    
          <div className="media-body p-2">
            <small className="float-right text-muted text-color-light"><TimeAgo date={date} /></small>
            <h6 className="mt-0 mb-1 text-color-light">{userName}</h6>
            {comment}
          </div>
        </div>
      );
}

export default Comment;

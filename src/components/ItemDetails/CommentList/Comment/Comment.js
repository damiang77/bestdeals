import React from "react";
import TimeAgo from "react-timeago";
import UserImg from "../../../../assets/user2.png";

const Comment = (props) =>{
    const { author, body, date } = props.comment;
    return (
        <div className="media comment-container">
          <img
            className="mr-3 comment-image"
            width="48"
            height="48"
            src={UserImg}
            alt={author}
          />
    
          <div className="media-body p-2">
            <small className="float-right text-muted text-color-light"><TimeAgo date={date} /></small>
            <h6 className="mt-0 mb-1 text-color-light">{author}</h6>
            {body}
          </div>
        </div>
      );
}

export default Comment;

// `https://api.adorable.io/avatars/48/${author.toLowerCase()}@adorable.io.png`
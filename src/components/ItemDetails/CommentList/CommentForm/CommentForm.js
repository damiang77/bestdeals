import React, { Component, useContext, useState } from "react";
import { url } from "../../../../helpers/constants";
import { getJwt } from "../../../../helpers/jwt";
import Axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../containers/AppContext/UserContext";

const CommentForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useContext(UserContext);

  const handleFieldChange = (event) => {
    setComment(event.target.value);
  };

  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const jwt = getJwt();
    if (!jwt) {
      history.push("/");
    }
    const config = {
      headers: {
        "x-auth": jwt,
      },
    };
    var commentJson = {
      comment: comment,
    };
    Axios.post(
      `${url.API_URL}/deals/${props.itemId}/comment`,
      commentJson,
      config
    )
      .then((res) => {
        if (res.status == 200) {
          NotificationManager.success("Success", "New comment added");
        } else {
          NotificationManager.warning(
            "Warning",
            "Failed to add new comment",
            3000
          );
        }
      })
      .catch((err) => {
        NotificationManager.warning(
          "Warning",
          "Failed to add new comment",
          3000
        );
        console.log(err);
      });
  };

  const renderError = () => {
    return error? (
      <div className="alert alert-danger">{error}</div>
    ) : null;
  }

  return (
    user ? 
    <React.Fragment>
      <form method="post" className="comment-form" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            onChange={handleFieldChange}
            value={comment}
            className="form-control"
            placeholder="🤬 Your Comment"
            name="comment"
            rows="5"
            required
          />
        </div>
   
        {renderError()}

        <div className="form-group">
          <button disabled={loading} className="add-deal-button">
            Comment
          </button>
        </div>
      </form>
      <NotificationContainer />
    </React.Fragment>
  : null
  );

};
export default CommentForm;

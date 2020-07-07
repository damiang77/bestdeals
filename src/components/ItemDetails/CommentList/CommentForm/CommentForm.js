import React, { Component, useContext, useState } from "react";
import { url } from "../../../../helpers/constants";
import { getJwt } from "../../../../helpers/jwt";
import Axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory, Link } from "react-router-dom";
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
    setLoading(true);
    setComment("");
    setError("");
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
          handleReload();
        } else {
          NotificationManager.warning(
            "Warning",
            "Failed to add new comment",
            3000
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        NotificationManager.warning(
          "Warning",
          "Failed to add new comment",
          3000
        );
        console.log(err);
        setLoading(false);
      });
  };

  const renderError = () => {
    return error ? <div className="alert alert-danger">{error}</div> : null;
  };

  function handleReload() {
    // Here, we invoke the callback with the new value
    props.reload(true);
  }

  return (
    <div className="comment-wrapper">
      {user ? (
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
        <NotificationContainer />
      </form>

  ) : (
    <div className="alert alert-danger" >
      Please <Link to="/login">Sign in</Link> to comment.
    </div>
    )}
    </div>
  )
};
export default CommentForm;

import React, { Component } from "react";
import {url} from "../../../../helpers/constants";
import {getJwt} from "../../../../helpers/jwt";
import Axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        message: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

 

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    // loading status and clear error
    this.setState({ error: "", loading: true });

    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push("/login");
    }

    const config = {
      headers: {
        "x-auth": jwt
      }
    };

    var commentjson = {
      "comment": this.state.comment.message
    }

    Axios.post(`${url.API_URL}/deals/${this.props.itemId}/comment`, commentjson, config)
      .then(res => {
        if (res.status == 200) {
          NotificationManager.success(
            "Success",
            "New comment added"
          );
       
        } else {
          NotificationManager.warning(
            "Warning",
            "Failed to add new comment",
            3000
          );
        }
      })
      .catch(err => {
        NotificationManager.warning("Warning", "Failed to add new comment", 3000);
        console.log(err);
      });
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    var formStyle = {
      width: "500px",
      marginLeft: "15px"
    }


    return (
      <React.Fragment>
        <form style={formStyle} method="post" onSubmit={this.onSubmit}>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="message"
              rows="5"
              required
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="add-deal-button">
              Comment
            </button>
          </div>
        </form>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}
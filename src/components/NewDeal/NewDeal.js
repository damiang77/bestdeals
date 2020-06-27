import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Axios from "axios";
import { getJwt } from "../../helpers/jwt";
import { withRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";
import img from "../../assets/img.png";
import {url} from "../../helpers/constants";

const NewDeal = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Upload image")
  const [fileError, setFileError] = useState(false);
  const [fileErrorMssg, setFileErrorMssg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateTitle = e => {
    setTitle(e.target.value);
  };
  const updateDescription = e => {
    setDescription(e.target.value);
  };
  const updatePrice = e => {
    setPrice(e.target.value);
  };
  const updateOldPrice = e => {
    setOldPrice(e.target.value);
  };
  const updateLink = e => {
    setLink(e.target.value);
  };

  const updateImage = e => {
    if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  const checkFileSize = event => {
    let files = event.target.files;
    let size = 1500000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err +=
          files[x].type + "is too large, please pick a smaller file <1,5MB";
      }
    }
    if (err !== "") {
      event.target.value = null;
      setFileError(true);
      setFileErrorMssg(err);
      console.log(err);
      return false;
    }
    setFileError(false);
    return true;
  };

  const checkMimeType = event => {
    let files = event.target.files;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += files[x].type + " is not a supported format.";
      }
    }
    if (err !== "") {
      event.target.value = null;
      setFileError(true);
      setFileErrorMssg(`${err} Only supported formats: .jpg, .png, .gif`);
      return false;
    }
    setFileError(false);
    return true;
  };

  const maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 1) {
      event.target.value = null;
      setFileError(true);
      setFileErrorMssg("Too many files. Please upload only one image.");
      return false;
    }
    setFileError(false);
    return true;
  };
  const override = css`
    display: block;
    margin-left:15px;
    margin-top:50px;
    border-color: red;
  `;
  const submit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push("/login");
    }
    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("oldPrice", oldPrice);
    formdata.append("url", link)
    formdata.append("image", image);

    const config = {
      headers: {
        "x-auth": jwt
      }
    };

    Axios.post(`${url.API_URL}/deals`, formdata, config)
      .then(res => {
        if (res.status == 200) {
          NotificationManager.success(
            "Success",
            "New deal has been added successfully"
          );
          setTitle("");
          setDescription("");
          setPrice("");
          setOldPrice("");
          setLink("");
          setImage(null);
          setIsLoading(false);
          setTimeout(function() {
            props.history.push("/");
          }, 500);
        } else {
          NotificationManager.warning(
            "Warning",
            "Failed to add new deal",
            3000
          );
        }
      })
      .catch(err => {
        NotificationManager.warning("Warning", "Failed to add new deal", 3000);
        console.log(err);
      });
  };

  return (
    <Aux>
      <div className="container page padding-t-60">
        <div className="row">
          <div className="col-md-6 add-deal-form">
            <form
              onSubmit={e => {
                submit(e);
              }}
            >
              <h3>Add new deal</h3>
              <div className="form-input-wrapper">
                <h4>Link</h4>
                <input
                  required
                  minLength="12"
                  type="text"
                  name="link"
                  disabled={isLoading}
                  placeholder="Paste your link here..."
                  onChange={e => {
                    updateLink(e);
                  }}
                  value={link}
                ></input>
                <div className="form-input-details">
                  <h4>Details</h4>
                  <h5>Title</h5>
                  <input
                    required
                    minLength="5"
                    type="text"
                    name="title"
                    placeholder="Write your title"
                    disabled={isLoading}
                    onChange={e => {
                      updateTitle(e);
                    }}
                    value={title}
                  ></input>
                  <h5>Description</h5>
                  <textarea
                    rows="4"
                    required
                    type="text"
                    name="description"
                    disabled={isLoading}
                    placeholder="Write short description about deal..."
                    onChange={e => {
                      updateDescription(e);
                    }}
                    value={description}
                  ></textarea>

                  <div className="row">
                    <div className="col-sm-6">
                      <h5>Deal price</h5>
                      <input
                        className="form-input-price"
                        required
                        minLength="1"
                        type="number"
                        name="title"
                        disabled={isLoading}
                        placeholder="Current price"
                        onChange={e => {
                          updatePrice(e);
                        }}
                        value={price}
                      ></input>
                    </div>
                    <div className="col-sm-6">
                      <h5>Regular price</h5>
                      <input
                        className="form-input-price"
                        required
                        minLength="1"
                        type="number"
                        name="title"
                        disabled={isLoading}
                        placeholder="Previous price"
                        onChange={e => {
                          updateOldPrice(e);
                        }}
                        value={oldPrice}
                      ></input>
                    </div>
                    <div className="input-file-wrapper">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="input-file"
                        disabled={isLoading}
                        placeholder="Select image"
                        onChange={e => {
                          updateImage(e);
                        }}
                      />
                      <label for="file">
                      <img src={img}/>
                      <span>{imageName}</span>
                      </label>
                      {fileError ? (
                        <p className="file-error-mssg">{fileErrorMssg}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    { isLoading? <BarLoader
                      css={override}
                      sizeUnit={"px"}
                      height={6}
                      width={100}
                      color={"#ff441b"}
                      loading={isLoading}
                    />:
                     <button submit="form" className="form-button">
                      Add deal
                    </button>}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
      <NotificationContainer />
    </Aux>
  );
};

export default withRouter(NewDeal);

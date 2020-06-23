import React, { useContext, useState } from "react";
import Axios from "axios";
import { AppContext } from "../../containers/AppContext/AppContext";
import { UserContext } from "../../containers/AppContext/UserContext";
import formImg from "../../assets/login-form.png";
import mailImg from "../../assets/envelope.png";
import padlockImg from "../../assets/padlock.png";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [deals, setDeals] = useContext(AppContext);

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
      Axios.post("https://gar.ovh/bd/api/v1/users/login", {
      email: email,
      password: password
    }).then(function(res) {
      var resdata = res.headers;
      localStorage.setItem("x-auth", resdata["x-auth"]);
      setUser(res.data.email);
      props.history.push("/");
      }).catch((err)=> console.log(err));
  };

  return (
    <div className="login-form login-page main-gradient">
      <div className="form-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 center-center form-box">
              <img src={formImg} />
            </div>
            <div className="col-xl-6 center-center form-box">
              <form
                onSubmit={e => {
                  submit(e);
                }}
              >
                <h2>Sign in</h2>
                <div className="input-container">
                  <img className="input-img" src={mailImg} />
                  <input
                    required
                    minLength="6"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => {
                      updateEmail(e);
                    }}
                    value={email}
                  />
                </div>
                <div className="input-container">
                  <img className="input-img" src={padlockImg} />
                  <input
                    required
                    minLength="6"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => {
                      updatePassword(e);
                    }}
                    value={password}
                  />
                </div>
                <button type="submit">Sign in</button>
                <p>
                  Don't have account? <Link to="/signup">Sing up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

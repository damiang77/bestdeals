import React, { useContext, useState } from "react";
import Axios from "axios";
import { AppContext } from "../../containers/AppContext/AppContext";
import { UserContext } from "../../containers/AppContext/UserContext";
import formImg from "../../assets/login-form.png";
import mailImg from "../../assets/envelope.png";
import padlockImg from "../../assets/padlock.png";
import userImg from "../../assets/user.png"

const Register = props => {

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updateLogin = e => {
    setLogin(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };
  const submit = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/v1/users/register", {
      login: login,
      email: email,
      password: password
    }).then(function(res) {
      var resdata = res.headers;
      localStorage.setItem("x-auth", resdata["x-auth"]);
      setUser(res.data.email);
    }).catch(e => {
      console.log(e);
    }).then( ()=>{
      props.history.push("/");
    })
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
                <h2>Sign up</h2>
                <div className="input-container">
                <img className="input-img" src={userImg}/>
                <input
                required
                minlength="6"
                  type="text"
                  name="login"
                  placeholder="Login"
                  onChange={e => {
                    updateLogin(e);
                  }}
                  value={login}
                />
                </div>
                <div className="input-container">
                <img className="input-img" src={mailImg}/>
                <input
                required
                minlength="6"
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
                <img className="input-img" src={padlockImg}/>
                <input
                required
                minlength="6"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={e => {
                    updatePassword(e);
                  }}
                  value={password}
                />
                </div>
                <button type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

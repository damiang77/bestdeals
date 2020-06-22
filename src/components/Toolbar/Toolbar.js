import React, { useContext, useEffect } from "react";
import Aux from "../../hoc/Aux";
import { NavLink, withRouter, Link } from "react-router-dom";
import { UserContext } from "../../containers/AppContext/UserContext";
import { getJwt } from "../../helpers/jwt";
import axios from "axios";
import Logo from "../../assets/Logo.png";

const Toolbar = props => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    getLogin();
  });
  const getLogin = () => {
    const jwt = getJwt();
    if (jwt) {
      axios.get("http://localhost:3001/api/v1/users/me", {
          headers: { "x-auth": `${jwt}` }
        })
        .then(res => {
           setUser(res.data.email);
        })
        .catch(err => {
          // this.props.history.push('/login');
          console.log(err);
        });
    }
  };
  const logout = () => {
    const jwt = getJwt();
    if (jwt) {
      axios
        .delete("http://localhost:3001/api/v1/users/logout", {
          headers: { "x-auth": `${jwt}` }
        })
        .then(res => {
          localStorage.removeItem("x-auth");
          setUser(null);
          props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Aux>
      <div className="toolbar">
        <div className="container menu-wrapper">
            <img className="logo" src={Logo}></img>

          <div className="nav-items">
            <NavLink exact={true} className="nav-item" to="/">
              Deals
            </NavLink>
            <NavLink className="nav-item" to="/Link">
              Link
            </NavLink>
          </div>

          <div className="nav-items-right">

            <Link to="/newdeal">
              <button className="add-deal-button">+ Add new</button>
            </Link>
            <div className="nav-item-login">
            {!user ? (
                <Link className="" to="/login">
                  Sign in
                </Link>
              ) : (
                <a className="button-logout">
                  {user} 
                  <span className="sing-out" onClick={logout}>[sign out]</span>
                </a>
              )}
            
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default withRouter(Toolbar);

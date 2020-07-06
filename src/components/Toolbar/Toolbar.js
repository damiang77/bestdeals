import React, { useContext, useEffect } from "react";
import Aux from "../../hoc/Aux";
import { NavLink, withRouter, Link, useHistory } from "react-router-dom";
import { UserContext } from "../../containers/AppContext/UserContext";
import { getJwt } from "../../helpers/jwt";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import { url } from "../../helpers/constants";


const Toolbar = (props) => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    getLogin();
 
  });
  let history = useHistory();
  
  const getLogin = () => {
    const jwt = getJwt();
 
    if (jwt) {
      axios
        .get(`${url.API_URL}/users/me`, {
          headers: { "x-auth": `${jwt}` },
        })
        .then((res) => {
          setUser(res.data.email);
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/");
        });
    }
  };
  const logout = () => {
    const jwt = getJwt();
    if (jwt) {
      axios
        .delete(`${url.API_URL}/users/logout`, {
          headers: { "x-auth": `${jwt}` },
        })
        .then((res) => {
          localStorage.removeItem("x-auth");
          setUser(null);
          props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleBurgerClick = () => {
    var x = document.getElementById("menu-items-wrapper");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  return (
    <Aux>
      <div className="toolbar">
        <div className="container menu-wrapper">
          <img className="logo" src={Logo}></img>
          <div id="menuToggle" onClick={handleBurgerClick}>
          <span></span>
          <span></span>
          <span></span>
          </div>
      
          <div id="menu-items-wrapper">
            <div className="nav-items">
              <NavLink exact={true} onClick={handleBurgerClick} className="nav-item" to="/">
                Deals
              </NavLink>
              <NavLink className="nav-item" to="/Link" onClick={handleBurgerClick}>
                Link
              </NavLink>
            </div>
            <div className="nav-items-right">
              <Link to="/newdeal" onClick={handleBurgerClick}>
                <button className="add-deal-button">+ Add new</button>
              </Link>
              <div className="nav-item-login">
                {!user ? (
                  <Link className="" to="/login" onClick={handleBurgerClick}>
                    Sign in
                  </Link>
                ) : (
                  <a className="button-logout">
                    {user}
                    <span className="sing-out" onClick={logout}>
                      [sign out]
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default withRouter(Toolbar);

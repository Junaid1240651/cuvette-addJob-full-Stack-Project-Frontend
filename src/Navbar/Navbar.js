import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, onLogout2 }) => {
  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();
  const [userName, setUserName] = useState();
  function logoutHandler() {
    localStorage.removeItem("LoginJwtToken");
    localStorage.removeItem("SignUpJwtToken");
    if (onLogout) {
      onLogout();
    } else if (onLogout2) {
      onLogout2();
    }
    setSigntokenVerify();
    setLogintokenVerify();
  }
  useEffect(() => {
    setLogintokenVerify(localStorage.getItem("LoginJwtToken"));
    setSigntokenVerify(localStorage.getItem("SignUpJwtToken"));
    const useName = localStorage.getItem("UserName");
    if (useName) {
      setUserName(localStorage.getItem("UserName").replaceAll('"', ""));
    }
  }, []);

  return (
    <div className="container">
      <div className="navbarContainer">
        <div>
          <Link className="JobFinder" to={"/"}>
            <p>JobFinder</p>
          </Link>
        </div>
        {signIntokenVerify || loginTokenVerify ? (
          <div className="logoutDiv">
            <p onClick={logoutHandler}>Logout</p>
            {userName ? <p>Hello {userName}</p> : ""}
            <img src=""></img>
          </div>
        ) : (
          <div className="btnDiv">
            <Link to={{ pathname: "/login" }}>
              <button className="loginBtn">Login</button>
            </Link>
            <Link to={{ pathname: "/register" }}>
              <button className="registerBtn">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

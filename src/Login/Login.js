import React, { useEffect, useState } from "react";
import "../SignUp/SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();
  const [input, setInput] = useState({
    Email: "",
    Password: "",
    CheckBox: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    Email: "",
    Password: "",
    CheckBox: "",
  });

  function inputHandler(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (!value == "") {
      setInput({ ...input, CheckBox: false });
    }
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: newValue,
      };
    });
    if (name === "Email" && value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Coool Email is done with correct Form",
      });
    } else if (name === "Email" && !value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Email must end with @gmail.com",
      });
    } else if (name === "Password" && value.length >= 5) {
      setErrorMessage({
        ...errorMessage,
        Password: "Coool Password is done by at least 5 character",
      });
    } else if (name === "Password" && value.length < 5) {
      setErrorMessage({
        ...errorMessage,
        Password: "Password must be at least 5 characters long.",
      });
    }
  }

  function signInHandler() {
    if (
      (!input.Email.endsWith("@gmail.com") || input.Email.length === 0) &&
      (input.Password.length < 5 || input.Password.length === 0)
    ) {
      setErrorMessage({
        Email: "Email must end with @gmail.com",
        Password: "Password must be at least 5 characters long.",
      });
    }
  }
  const submitForm = async (event) => {
    setLoading(false);
    event.preventDefault();

    try {
      axios
        .post("https://cuvette-addjob-full-stack-project.onrender.com/login", {
          email: input.Email,
          password: input.Password,
        })
        .then((response) => {
          localStorage.setItem(
            "LoginJwtToken",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem("UserName", JSON.stringify(response.data.name));
          navigate("/");
          setLoading(false);
        })
        .catch((error) => {
          alert("Error:" + error.response.data);
          setLoading(true);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    setInput({
      Name: "",
      Email: "",
      Number: "",
      Password: "",

      CheckBox: false,
    });
    setErrorMessage({
      Name: "",
      Email: "",
      Number: "",
      Password: "",
      CheckBox: "",
    });
  };
  useEffect(() => {
    setLogintokenVerify(localStorage.getItem("LoginJwtToken"));
    setSigntokenVerify(localStorage.getItem("SignUpJwtToken"));
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          {loginTokenVerify || signIntokenVerify ? (
            navigate("/")
          ) : (
            <div className="container">
              <div className="leftDiv" style={{ alignItems: "center" }}>
                <form
                  className="userDetailsDiv"
                  style={{ padding: "0px" }}
                  onSubmit={submitForm}
                >
                  <div className="userDetailsDiv">
                    <h1>Already have an account?</h1>
                    <p>Your personal job finder is here</p>
                    <input
                      value={input.Email}
                      pattern="[a-z0-9._%+-]+@gmail\.com$"
                      required
                      type="email"
                      name="Email"
                      onChange={inputHandler}
                      placeholder="Email"
                    ></input>
                    {errorMessage ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0px",
                          marginTop: "10px",
                          fontSize: "18px",
                          paddingLeft: "20px",
                        }}
                      >
                        {errorMessage.Email}
                      </p>
                    ) : (
                      setErrorMessage("")
                    )}
                    <input
                      required
                      value={input.Password}
                      type="password"
                      name="Password"
                      minLength={5}
                      onChange={inputHandler}
                      placeholder="Password"
                    ></input>
                    {errorMessage ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0px",
                          marginTop: "10px",
                          fontSize: "18px",
                          paddingLeft: "20px",
                        }}
                      >
                        {errorMessage.Password}
                      </p>
                    ) : (
                      <p></p>
                    )}
                    <div className="termConditionDiv">
                      <input
                        onChange={inputHandler}
                        required
                        type="checkbox"
                        name="CheckBox"
                        checked={input.CheckBox}
                        value=" By creating an account, I agree to our terms of use and privacy
                policy"
                      ></input>
                      <p>
                        By creating an account, I agree to our terms of use and
                        privacy policy
                      </p>
                    </div>
                    <div className="createAccountDiv">
                      <button onClick={signInHandler}>SignIn</button>
                      <p>
                        Create an account? <a href="/register">Create</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="rightDiv"></div>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Login;

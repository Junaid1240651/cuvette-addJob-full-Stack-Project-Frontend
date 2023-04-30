import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();
  const [input, setInput] = useState({
    Name: "",
    Email: "",
    Number: "",
    Password: "",
    CheckBox: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    Name: "",
    Email: "",
    Number: "",
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
    if (name === "Name" && value.length >= 5) {
      setErrorMessage({
        ...errorMessage,
        Name: "Coool name is done by at least 5 character",
      });
    } else if (name === "Name" && value.length <= 5) {
      setErrorMessage({
        ...errorMessage,
        Name: "Name must be at least 5 characters long.",
      });
    } else if (name === "Email" && value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Coool Email is done with correct Form",
      });
    } else if (name === "Email" && !value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Email must end with @gmail.com",
      });
    } else if (name === "Number" && value.length === 10) {
      setErrorMessage({
        ...errorMessage,
        Number: "Coool Number is done by at least 10 character",
      });
    } else if (name === "Number" && value.length < 10) {
      setErrorMessage({
        ...errorMessage,
        Number: "Phone number must be 10 digits long",
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

  function signUpHandler() {
    if (
      (input.Name.length < 5 || input.Name.length === 0) &&
      (!input.Email.endsWith("@gmail.com") || input.Name.length === 0) &&
      (input.Number.length < 10 || input.Number.length === 0) &&
      (input.Password.length < 5 || input.Password.length === 0)
    ) {
      setErrorMessage({
        Name: "Name must be at least 5 characters long.",
        Email: "Email must end with @gmail.com",
        Number: "Phone number must be 10 digits long",
        Password: "Password must be at least 5 characters long.",
      });
    }
  }
  const submitForm = async (event) => {
    setLoading(false);
    try {
      axios
        .post(
          "https://cuvette-addjob-full-stack-project.onrender.com/register",
          {
            name: input.Name,
            email: input.Email,
            number: input.Number,
            password: input.Password,
          }
        )
        .then((response) => {
          setLoading(false);

          localStorage.setItem(
            "SignUpJwtToken",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem("UserName", JSON.stringify(response.data.name));
          navigate("/");
        })
        .catch((error) => {
          setLoading(true);

          alert("Error:" + error.response.data);
        });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();

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
              <div className="leftDiv">
                <form
                  className="userDetailsDiv"
                  style={{ padding: "0px" }}
                  onSubmit={submitForm}
                >
                  <div className="userDetailsDiv">
                    <h1>Create an account</h1>
                    <p>Your personal job finder is here</p>

                    <input
                      minLength={5}
                      required
                      type="text"
                      value={input.Name}
                      onChange={inputHandler}
                      name="Name"
                      placeholder="Name"
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
                        {errorMessage.Name}
                      </p>
                    ) : (
                      <p></p>
                    )}
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
                      inputmode="numeric"
                      name="Number"
                      pattern="[0-9]"
                      minLength={10}
                      maxLength={10}
                      required
                      value={input.Number}
                      type="number"
                      onChange={inputHandler}
                      placeholder="Mobile"
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
                        {errorMessage.Number}
                      </p>
                    ) : (
                      <p></p>
                    )}
                    <input
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
                      <button onClick={signUpHandler}>Create Account</button>
                      <p>
                        Already have an account? <a href="/login">Sign In</a>
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

export default SignUp;

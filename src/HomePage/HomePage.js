import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HomePage.css";
import India from "../images/india.png";
import group from "../images/Group.png";
import search from "../images/search.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const HomePage = () => {
  const navigate = useNavigate();
  const [skill, setskill] = useState([]);
  const [apidata2, setApiData2] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [apidata, setApiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();

  function logoutHandler() {
    setSigntokenVerify();
    setLogintokenVerify();
  }

  function skillHandler(e) {
    setSearchTitle("");
    if (skill.includes(e.target.id)) {
      setskill(skill.filter((i) => i !== e.target.id));
    } else {
      setskill([...skill, e.target.id]);
    }
  }

  function skillDeleteHandler(e) {
    if (skill.includes(e.target.id)) {
      setskill(skill.filter((i) => i !== e.target.id));
    }
  }

  function handleChange(e) {
    const searchInput = e.target.value.toLowerCase();
    const filteredData = apidata2.filter((data) =>
      data.jobPosition.toLowerCase().includes(searchInput)
    );
    setApiData(filteredData);
    setSearchTitle(searchInput);
  }

  useEffect(() => {
    setLoading2(false);

    try {
      axios
        .get("https://cuvette-addjob-full-stack-project.onrender.com/", {
          params: {
            skill: skill,
          },
        })
        .then(function (response) {
          setApiData(response.data);
          setApiData2(response.data);
          setLoading(true);
          setLoading2(true);
        })
        .catch((error) => alert.error(error + "Server Error"));
    } catch (error) {
      console.log(error);
    }
  }, [skill]);

  useEffect(() => {
    setLogintokenVerify(localStorage.getItem("LoginJwtToken"));
    setSigntokenVerify(localStorage.getItem("SignUpJwtToken"));
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          <Navbar onLogout={logoutHandler} />
          <div className="containerr">
            <div className="skillDiv">
              <div>
                <div>
                  <img alt="" src={search} />
                  <input
                    value={searchTitle}
                    onChange={handleChange}
                    placeholder="Type any job title"
                  />
                </div>
              </div>
              <div>
                <div className="dropdownContainer">
                  <div class="dropdown">
                    <button>Skill</button>
                    <div class="dropdown-content">
                      <p id="HTML" onClick={skillHandler}>
                        HTML
                      </p>
                      <p id="CSS" onClick={skillHandler}>
                        CSS
                      </p>
                      <p id="JAVASCRIPT" onClick={skillHandler}>
                        JAVASCRIPT
                      </p>
                      <p id="REACT" onClick={skillHandler}>
                        REACT
                      </p>
                      <p id="MONGO.DB" onClick={skillHandler}>
                        MONGO.DB
                      </p>
                      <p id="NODE.JS" onClick={skillHandler}>
                        NODE.JS
                      </p>
                      <p id="EXPRESS.JS" onClick={skillHandler}>
                        EXPRESS.JS
                      </p>
                      <p id="WORDPRESS" onClick={skillHandler}>
                        WORDPRESS
                      </p>
                    </div>
                  </div>
                  <div></div>
                  {skill.map((data) => (
                    <div className="skillData">
                      <p>{data}</p>
                      <p id={data} onClick={skillDeleteHandler}>
                        X
                      </p>
                    </div>
                  ))}
                </div>

                <div className="clearSkill">
                  <p disabled={false} onClick={() => setskill([])}>
                    Clear
                  </p>
                  {loginTokenVerify || signIntokenVerify ? (
                    <button
                      className="addJobBtn"
                      onClick={() => navigate("addJob")}
                    >
                      Add Job
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {loading2 === true ? (
              <div>
                <div className="jobListContainer">
                  {apidata && loading2 === true
                    ? apidata.map((data) => (
                        <div>
                          <div className="jobListInnerContainer">
                            <div>
                              <img src={data.companyLogo}></img>
                            </div>
                            <div>
                              <div className="jopPosition">
                                {data.jobPosition}
                              </div>
                              <div className="locationDiv">
                                <img className="groupImage" src={group}></img>

                                <p className="post">{data.jobVacancy} Post</p>
                                <p className="salary">
                                  ₹ {data.monthlySalary}{" "}
                                </p>
                                <img className="locationImg" src={India}></img>
                                <p>{data.location}</p>
                              </div>
                              <div className="workPlace">
                                <p>{data.workPlace}</p>
                                <p>{data.jobType}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="skill">
                              {data.skill.map((data2) => (
                                <p>{data2.value}</p>
                              ))}
                            </div>
                            <div className="viewDetailBrnDiv">
                              {loginTokenVerify || signIntokenVerify ? (
                                <button
                                  onClick={() =>
                                    navigate("editJob/" + data._id)
                                  }
                                >
                                  Edit Job
                                </button>
                              ) : (
                                ""
                              )}

                              <div class="popup-link">
                                <button
                                  id={data._id}
                                  onClick={() =>
                                    navigate("jobdetails/" + data._id)
                                  }
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import "./JobDetailPage.css";
import Navbar from "../Navbar/Navbar";
import stripend from "../images/stripend.png";
import { useNavigate, useParams } from "react-router-dom";
import "../HomePage/HomePage.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";

const JobDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();
  const [apidata, setApiData] = useState();
  const { id } = useParams();

  function logoutHandler2() {
    setSigntokenVerify();
    setLogintokenVerify();
  }

  useEffect(() => {
    try {
      axios
        .get(
          "https://cuvette-addjob-full-stack-project.onrender.com/jobdetails/" +
            id
        )
        .then(function (response) {
          setApiData([response.data]);
          setLoading(true);
        })
        .catch(function (error) {
          alert(error + "Server Error");
          navigate("/");
        });
      setLogintokenVerify(localStorage.getItem("LoginJwtToken"));
      setSigntokenVerify(localStorage.getItem("SignUpJwtToken"));
    } catch (error) {
      alert.log(error);
      navigate("/");
    }
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          <Navbar onLogout2={logoutHandler2}></Navbar>

          {apidata
            ? apidata.map((data) => (
                <div className="containner">
                  <div className="containnerInnerDiv">
                    <p>
                      {data.jobPosition} {data.jobType} Job/Internship at{" "}
                      {data.companyName}
                    </p>
                  </div>
                  <div className="jobDetailsDiv">
                    <div className="commonDiv">
                      <p>1w Ago</p>
                      <p>Full Time</p>
                    </div>
                    <div>
                      <div className="commonDiv">
                        <p>{data.jobPosition}</p>
                        {loginTokenVerify || signIntokenVerify ? (
                          <button onClick={() => navigate("/editJob/" + id)}>
                            Edit Job
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>{data.location} | India</p>
                    </div>
                    <div className="commonDiv">
                      <div>
                        <div className="commonDiv">
                          <img src={stripend}></img>
                          <p> stipend</p>
                        </div>
                        <p>Rs {data.monthlySalary}/Month</p>
                      </div>
                      <div>
                        <p> Duration</p>
                        <p>{data.jobDuration} Month</p>
                      </div>
                    </div>
                    <div>
                      <p>About Comapny</p>
                      <p>{data.aboutCompany}</p>
                    </div>
                    <div>
                      <p>About the job/internship</p>
                      <p>{data.jobDescription}</p>
                    </div>
                    <div>
                      <div>
                        <p>Skill(s) required</p>
                      </div>
                      <div className="commonDiv">
                        {data.skill.map((data2) => (
                          <p>{data2.value}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p>Additional Information</p>
                      <p>
                        Stipend structure: This is a performance-based
                        internship. In addition to the minimum-assured stipend,
                        you will also be paid a performance-linked incentive (₹
                        2500 per design).
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default JobDetailPage;

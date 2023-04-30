import React, { useEffect, useState } from "react";
import "./EditJobPage.css";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
const EditJobPage = () => {
  const navigate = useNavigate();
  const [jobType, setjobType] = useState();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [workPlace, setworkPlace] = useState();
  const [signIntokenVerify, setSigntokenVerify] = useState();
  const [loginTokenVerify, setLogintokenVerify] = useState();
  const { id } = useParams();

  const [jobDetails, setjobDetails] = useState({
    companyName: "",
    jobPosition: "",
    jobDuration: "",
    jobVacancy: "",
    monthlySalary: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skill: "",
  });
  const handleSkillCreate = (inputValue) => {
    const newSkill = {
      value: inputValue.toUpperCase(),
      label: inputValue.toUpperCase(),
    };
    setSelectedSkills([...selectedSkills, newSkill]);
  };
  function handleImageChange(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const editJobHandler = async (e) => {
    setLoading(false);
    e.preventDefault();

    try {
      axios
        .post(
          "https://cuvette-addjob-full-stack-project.onrender.com/edit/" +
            { id },
          {
            id: id,
            companyName: jobDetails.companyName,
            companyLogo: imageFile,
            jobPosition: jobDetails.jobPosition,
            jobDuration: jobDetails.jobDuration,
            jobVacancy: jobDetails.jobVacancy,
            monthlySalary: jobDetails.monthlySalary,
            jobType: jobType,
            workPlace: workPlace,
            location: jobDetails.location,
            jobDescription: jobDetails.jobDescription,
            aboutCompany: jobDetails.aboutCompany,
            skill: selectedSkills,
          },
          setLoading(true)
        )
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          alert(error + "server Error");
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);

      alert(error + "server Error");
    }
  };

  const addJobHandler = async (e) => {
    setLoading(false);
    e.preventDefault();
    try {
      axios
        .post(
          "https://cuvette-addjob-full-stack-project.onrender.com/procted",
          {
            token: loginTokenVerify
              ? loginTokenVerify.replaceAll('"', "")
              : signIntokenVerify.replaceAll('"', ""),
            companyName: jobDetails.companyName,
            companyLogo: imageFile,
            jobPosition: jobDetails.jobPosition,
            jobDuration: jobDetails.jobDuration,
            jobVacancy: jobDetails.jobVacancy,
            monthlySalary: jobDetails.monthlySalary,
            jobType: jobType,
            workPlace: workPlace,
            location: jobDetails.location,
            jobDescription: jobDetails.jobDescription,
            aboutCompany: jobDetails.aboutCompany,
            skill: selectedSkills,
          }
        )
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          alert(error + "server Error");
          setLoading(true);
        });
    } catch (error) {
      setLoading(true);
      alert(error + "server Error");
    }
  };

  function inputHandler(e) {
    const { name, value } = e.target;
    setjobDetails({ ...jobDetails, [name]: value });
  }
  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  function skillHandler(e) {
    setjobType(e.target.id);
  }
  function workPlaceHandler(e) {
    setworkPlace(e.target.id);
  }
  useEffect(() => {
    try {
      axios
        .get(
          "https://cuvette-addjob-full-stack-project.onrender.com/jobdetails/" +
            id
        )
        .then(function (response) {
          setjobDetails({
            companyName: response.data.companyName,
            jobPosition: response.data.jobPosition,
            jobDuration: response.data.jobDuration,
            jobVacancy: response.data.jobVacancy,
            monthlySalary: response.data.monthlySalary,
            jobType: response.data.jobType,
            workPlace: response.data.workPlace,
            location: response.data.location,
            jobDescription: response.data.jobDescription,
            aboutCompany: response.data.aboutCompany,
            skill: response.data.skill,
          });
          setjobType(response.data.jobType);
          setworkPlace(response.data.workPlace);
          const skillOptions = response.data.skill.map((skill) => ({
            label: skill.value,
            value: skill.value,
          }));

          setLoading(true);

          setSelectedSkills(skillOptions);
        })
        .catch((error) => {
          alert(error + "server Error");
        });

      setLogintokenVerify(localStorage.getItem("LoginJwtToken"));
      setSigntokenVerify(localStorage.getItem("SignUpJwtToken"));
    } catch (error) {
      alert(error + "server Error");
    }
    if (!id) {
      setLoading(true);
    }
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          {signIntokenVerify || loginTokenVerify ? (
            <div className="editPageContainer">
              <div className="editPageInnerContainer">
                <h1>Add job description</h1>
                <form
                  onSubmit={id === undefined ? addJobHandler : editJobHandler}
                >
                  <div className="formDiv">
                    <div class="formInnerDiv">
                      <div>
                        <label>Company Name</label>
                        <input
                          onChange={inputHandler}
                          type="text"
                          name="companyName"
                          required
                          value={jobDetails.companyName}
                          placeholder="Enter Your Company Name Here"
                        />
                      </div>
                      <div>
                        <label>Company Logo</label>
                        <input
                          onChange={handleImageChange}
                          name="companyLogo"
                          type="file"
                          required
                        />
                      </div>
                      <div>
                        <label>Job Position</label>
                        <input
                          onChange={inputHandler}
                          name="jobPosition"
                          type="text"
                          required
                          value={jobDetails.jobPosition}
                          placeholder="Enter job Position"
                        />
                      </div>
                      <div>
                        <label>Job Duration in Month</label>
                        <input
                          onChange={inputHandler}
                          name="jobDuration"
                          type="number"
                          required
                          value={jobDetails.jobDuration}
                          placeholder="Enter Job Duration"
                        />
                      </div>
                      <div>
                        <label>Monthly Salary</label>
                        <input
                          onChange={inputHandler}
                          name="monthlySalary"
                          type="number"
                          required
                          value={jobDetails.monthlySalary}
                          placeholder="Enter Amount In Rupees"
                        />
                      </div>
                      <div>
                        <label>Full/Part Time</label>

                        <div className="dropdownContainerr">
                          <div class="dropdownn">
                            <button>{jobType ? jobType : "Select"}</button>
                            <div class="dropdownn-content">
                              <p id="Full Time" onClick={skillHandler}>
                                Full Time
                              </p>
                              <p id="Part Time" onClick={skillHandler}>
                                Part Time
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label>Job Vacancy</label>
                        <input
                          onChange={inputHandler}
                          name="jobVacancy"
                          type="number"
                          required
                          value={jobDetails.jobVacancy}
                        />
                      </div>
                      <div>
                        <label>Remote or Office</label>
                        <div className="dropdownContainerr">
                          <div class="dropdownn">
                            <button>{workPlace ? workPlace : "Select"}</button>

                            <div class="dropdownn-content">
                              <p id="WFH Job" onClick={workPlaceHandler}>
                                WFH Job
                              </p>
                              <p id="Office Job" onClick={workPlaceHandler}>
                                Office Job
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label>Location</label>
                        <input
                          onChange={inputHandler}
                          name="location"
                          type="text"
                          required
                          value={jobDetails.location}
                          placeholder="Enter Location"
                        />
                      </div>
                      <div>
                        <label>Job Description</label>
                        <textarea
                          onChange={inputHandler}
                          name="jobDescription"
                          type="text"
                          required
                          value={jobDetails.jobDescription}
                          placeholder="Type The Job Description"
                        />
                      </div>
                      <div>
                        <label>About Company</label>
                        <textarea
                          onChange={inputHandler}
                          name="aboutCompany"
                          type="text"
                          required
                          value={jobDetails.aboutCompany}
                          placeholder="Type About Your Company"
                        />
                      </div>

                      <div>
                        <label>Skill</label>
                        <CreatableSelect
                          required
                          className="custom-select"
                          isMulti
                          formatCreateLabel={() => "Create Skill"}
                          noOptionsMessage={() => null}
                          value={selectedSkills}
                          onChange={handleSkillChange}
                          onCreateOption={handleSkillCreate}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="createBtn">
                    <button onClick={() => navigate("/")}>Close</button>
                    {id === undefined ? (
                      <button>+ Add Job</button>
                    ) : (
                      <button
                      // disabled={imageFile || selectedSkills || jobDetails}
                      >
                        + Edit Job
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="backgroundImageDiv"></div>
            </div>
          ) : (
            navigate("/login")
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default EditJobPage;

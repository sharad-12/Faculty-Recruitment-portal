import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Innernavbar from "../components/Innernavbar";
function ExperienceDetailsForm() {
  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem("user");
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (data == null) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
    organizationType: "",
    employementType: "",
    initialDate: "",
    currentWorking: "",
    enddate: "",
  });
  // const [errors, setErrors] = useState({});

  const validation = () => {
    const newErrors = {};

    if (!formData.organization) {
      newErrors.qualification = "Qualification is required";
    }

    if (!formData.designation) {
      newErrors.board = "Board is required";
    }

    if (!formData.organizationType) {
      newErrors.college = "College is required";
    }
    if (!formData.employementType) {
      newErrors.evaluation = "Evaulation is required";
    }
    if (!formData.initialDate) {
      newErrors.obtained = "Obtained is required";
    }
    if (!formData.currentWorking) {
      newErrors.passyear = "Pass year is required";
    }
    if (!formData.enddate) {
      newErrors.subject = "Subject is required";
    }
    // if (!formData.filename) {
    //   newErrors.filename= 'Filename is required';
    // }

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        const userId = localStorage.getItem("id");
        const response = await fetch("/experience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This sends cookies with the request
          body: JSON.stringify({ formData, userId }),
        });

        if (response.status === 200) {
          const data = await response.json();

          if (data === "created") {
            alert("User Created Successfully");
            navigate("/reference");
          } else if (data === "updated") {
            alert("Updated Successfully");
            navigate("/reference");
          }
          setFormData({
            organization: "",
            designation: "",
            organizationType: "",
            employementType: "",
            initialDate: "",
            currentWorking: "",
            enddate: "",
          });
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Innernavbar />
      <div className="application">
        <h3 style={{ textAlign: "center" }}> Experience Details*</h3>
        <hr />
        <form action="/application3" method="post">
          <div className="row">
            <div className="col-25">
              <label htmlFor="organisation">Name of Organisation* :</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="organization"
                placeholder="abs"
                autoComplete="disable"
                required
                onChange={handleChange}
                value={formData.organization}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="designation">Designation* :</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="designation"
                name="designation"
                placeholder=""
                autoComplete="disable"
                required
                onChange={handleChange}
                value={formData.designation}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="organisation_type">Organisation Type*:</label>
            </div>
            <div className="col-75">
              <select
                id="organisation_type"
                name="organizationType"
                onChange={handleChange}
                value={formData.organizationType}
              >
                <option value="0">Select</option>
                <option value="Central">Central</option>
                <option value="State Govt">State Govt</option>
                <option value="Semi-Govt">Semi-Govt</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="employment_type">Employment Type *:</label>
            </div>
            <div className="col-75">
              <select
                id="employment_type"
                name="employementType"
                onChange={handleChange}
                value={formData.employementType}
              >
                <option value="0">Select</option>
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="from_date">From date* :</label>
            </div>
            <div className="col-75">
              <input
                type="date"
                id="from_date"
                name="initialDate"
                autoComplete="disable"
                required
                onChange={handleChange}
                value={formData.initialDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="currently_work">Currently Working Here?*:</label>
            </div>
            <div className="col-75">
              <select
                id="currently_work"
                name="currentWorking"
                onChange={handleChange}
                value={formData.currentWorking}
              >
                <option value="0">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="to_date">To date* :</label>
            </div>
            <div className="col-75">
              <input
                type="date"
                id="to_date"
                name="enddate"
                autoComplete="disable"
                required
                onChange={handleChange}
                value={formData.enddate}
              />
            </div>
          </div>
          {/* <div className="row">
          <div className="col-25">
            <label htmlFor="filename">Upload Experience* :</label>
          </div>
          <div className="col-75">
            <input type="file" id="filename" name="filename" autoComplete="disable" required />
          </div>
        </div> */}
          <div className="row">
            <button className="button" onClick={(e) => collectData(e)}>
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ExperienceDetailsForm;

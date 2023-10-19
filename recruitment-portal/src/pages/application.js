import React, { useEffect, useState } from "react";
import Innernavbar from "../components/Innernavbar";
import { useNavigate } from "react-router-dom";
export default function ApplicationForm() {
  const navigate = useNavigate();
  useEffect(() => {
    let data = localStorage.getItem("user");
    console.log(data);
    if (data == null) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    birthPlace: "",
    Gender: "",
    maritialStatus: "",
    Nationality: "",
    Category: "",
    Religion: "",
    Subjects: "",
    CommunicationAddress: "",
    CommunicationCountry: "",
    CommunicationState: "",
    CommunicationCity: "",
    CommunicationPin: "",
    PermenantAddress: "",
    PermenantCountry: "",
    PermenantState: "",
    PermenantCity: "",
    PermenantPin: "",
    Mobile: "",
    AlternateNumber: "",
    Photograph:null,
    Signature:null,
  });
    const [errors, setErrors] = useState({});

  const validation = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.middleName) {
      newErrors.middleName = "Middle Name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.fatherName) {
      newErrors.fatherName = "Father Name is required";
    }
    if (!formData.motherName) {
      newErrors.motherName = "Mother Name is required";
    }
    if (!formData.birthPlace) {
      newErrors.birthPlace = "Birth Place is required";
    }
    if (!formData.Gender) {
      newErrors.Gender = "Gender is required";
    }
    if (!formData.maritialStatus) {
      newErrors.maritialStatus = "Maritial Status is required";
    }
    if (!formData.Nationality) {
        newErrors.Nationality = "Nationality is required";
    }
    if (!formData.Category) {
        newErrors.Category = "Category is required";
    }
    if (!formData.Religion) {
        newErrors.Religion = "Religion is required";
    }
    if (!formData.Subjects) {
        newErrors.Subjects = "Subjects are required";
    }
    if (!formData.CommunicationAddress) {
        newErrors.CommunicationAddress = "Communication Address Status is required";
    }
    if (!formData.CommunicationCountry) {
        newErrors.CommunicationCountry = "Communication Country is required";
    }
    if (!formData.CommunicationState) {
        newErrors.CommunicationState = "State is required";
    }
    if (!formData.CommunicationCity) {
        newErrors.CommunicationCity = "City is required";
    }
    if (!formData.CommunicationPin) {
        newErrors.CommunicationPin = "Pin is required";
    }
    if (!formData.PermenantAddress) {
        newErrors.PermenantAddress = "Address is required";
    }
    if (!formData.PermenantCountry) {
        newErrors.PermenantCountry = "Country is required";
    }
    if (!formData.PermenantState) {
        newErrors.PermenantState = "State is required";
    }
    if (!formData.PermenantCity) {
        newErrors.PermenantCity = "City is required";
    }
    if (!formData.PermenantPin) {
        newErrors.PermenantPin = "Pin is required";
    }
    if (!formData.Mobile) {
        newErrors.Mobile = "Mobile Number is required";
    }
    if (!formData.AlternateNumber) {
        newErrors.AlternateNumber = "Alternate Number is required";
    }
    if (!formData.Photograph) {
        newErrors.Photograph = "Photograph is required";
    }
    if (!formData.Signature) {
        newErrors.Signature = "Signature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();
    console.log("function called");
    const userId = localStorage.getItem("id");
    if (validation()) {
      try {
        const response = await fetch("/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This sends cookies with the request
          body: JSON.stringify({ formData, userId }),
        });
        console.log("after response");
        if (response.status === 200) {
          const data = await response.json();
          if (data === "created") {
            alert("User Created Successfully");
            navigate("/qualification");
          } else if (data === "updated") {
            alert("Updated Successfully");
            navigate("/qualification");
          }
          setFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            fatherName: "",
            motherName: "",
            birthPlace: "",
            Gender: "",
            maritialStatus: "",
            Nationality: "",
            Category: "",
            Religion: "",
            Subjects: "",
            CommunicationAddress: "",
            CommunicationCountry: "",
            CommunicationState: "",
            CommunicationCity: "",
            CommunicationPin: "",
            PermenantAddress: "",
            PermenantCountry: "",
            PermenantState: "",
            PermenantCity: "",
            PermenantPin: "",
            Mobile: "",
            AlternateNumber: "",
            Photograph:null,
            Signature:null,
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
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  //   const fileupload=(e)=>{
  //     console.log(e.target.files)
  //     setFormData({...formData,Photograph:e.target.files[0].name,Signature:e.target.files[1].name})
  //   }
  return (
    <>
      <Innernavbar />
      <div className="application">
        <h3>Personal Details</h3>
        <hr /><br />
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">First Name :</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder=""
              onChange={handleChange}
              value={formData.firstName}
              autoComplete="disable"
              required
            />
            {errors.firstName && (<span className="text-red-500">{errors.firstName}</span>)}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="mname">Middle Name :</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder=" "
              onChange={handleChange}
              value={formData.middleName}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Last Name :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="lastName"
              placeholder=""
              onChange={handleChange}
              value={formData.lastName}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Father Name :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fname"
              name="fatherName"
              placeholder=""
              onChange={handleChange}
              value={formData.fatherName}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Mother Name :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fname"
              name="motherName"
              placeholder=""
              onChange={handleChange}
              value={formData.motherName}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Place of Birth :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fname"
              name="birthPlace"
              placeholder=""
              onChange={handleChange}
              value={formData.birthPlace}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="gender">Gender:</label>
          </div>
          <div class="col-75">
            <select
              id="country"
              name="Gender"
              onChange={handleChange}
              value={formData.Gender}
            >
              <option value="0">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="married">Married Status:</label>
          </div>
          <div class="col-75">
            <select
              id="country"
              name="maritialStatus"
              onChange={handleChange}
              value={formData.maritialStatus}
            >
              <option value="0">Select</option>
              <option value="Married">Married</option>
              <option value="Un-Married">Un-Married</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Nationality :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fname"
              name="Nationality"
              placeholder=""
              onChange={handleChange}
              value={formData.Nationality}
              autoComplete="disable"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="catagory">Category:</label>
          </div>
          <div class="col-75">
            <select
              id="country"
              name="Category"
              onChange={handleChange}
              value={formData.Category}
            >
              <option value="0">Select</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="religion">Religion:</label>
          </div>
          <div class="col-75">
            <select
              id="religion"
              name="Religion"
              onChange={handleChange}
              value={formData.Religion}
            >
              <option value="0">Select</option>
              <option value="Hindusim">Hinduism</option>
              <option value="christian">Christian</option>
              <option value="islam">Islam</option>
              <option value="sikh">Sikhism</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="subject">Subject :</label>
          </div>
          <div class="col-75">
            <textarea
              id="subject"
              name="Subjects"
              placeholder=""
              onChange={handleChange}
              value={formData.Subjects}
            ></textarea>
          </div>
        </div>
        <h3>Communication Address:</h3>
        <hr /><br />
        <div class="row">
          <div class="col-25">
            <label for="subject">Address :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="CommunicationAddress"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.CommunicationAddress}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">Country:</label>
          </div>
          <div class="col-75">
            <select
              id="country"
              name="CommunicationCountry"
              onChange={handleChange}
              value={formData.CommunicationCountry}
            >
              <option value="0">Select</option>
              <option value="Afganistan">Afganistan</option>
              <option value="Albania">Albania</option>
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Belgium">Belgium</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="India">India</option>
              <option value="Usa">Usa</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">State :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="CommunicationState"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.CommunicationState}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">City :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="CommunicationCity"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.CommunicationCity}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Pin :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="CommunicationPin"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.CommunicationPin}
              required
            />
          </div>
        </div>
        <h3>Permanent Address:</h3>

        <hr /><br />
        <div class="row">
          <div class="col-25">
            <label for="subject">Address :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="PermenantAddress"
              placeholder=" "
              autoComplete="disable"
              onChange={handleChange}
              value={formData.PermenantAddress}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">Country:</label>
          </div>
          <div class="col-75">
            <select
              id="country"
              name="PermenantCountry"
              onChange={handleChange}
              value={formData.PermenantCountry}
            >
              <option value="0">Select</option>
              <option value="Afganistan">Afganistan</option>
              <option value="Albania">Albania</option>
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Belgium">Belgium</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="India">India</option>
              <option value="Usa">Usa</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">State :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="PermenantState"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.PermenantState}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">City :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="PermenantCity"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.PermenantCity}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Pin* :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="PermenantPin"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.PermenantPin}
              required
            />
          </div>
        </div>

        <h3>Contact Information</h3>
        <hr /><br />
        <div class="row">
          <div class="col-25">
            <label for="subject">Mobile-No* :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="Mobile"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.Mobile}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Alternate No* :</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="lname"
              name="AlternateNumber"
              placeholder=""
              autoComplete="disable"
              onChange={handleChange}
              value={formData.AlternateNumber}
              required
            />
          </div>
        </div>

        <h3>Identifiation Details*</h3>
        <hr /><br />
        <div class="row">
          <div class="col-25">
            <label for="subject">Upload Photograph* :</label>
          </div>
          <div class="col-75">
            <input
              type="file"
              id="myFile"
              name="Photograph"
              autoComplete="disable"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-25">
            <label for="subject">Upload Signature* :</label>
          </div>
          <div class="col-75">
            <input
              type="file"
              id="myFile"
              name="Signature"
              autoComplete="disable"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <button className="button" onClick={(e) => collectData(e)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

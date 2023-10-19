import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Innernavbar from '../components/Innernavbar'
function ReferenceForm() {
  // Initialize state for form fields
  const navigate = useNavigate();
  useEffect(()=>{
    let data=localStorage.getItem("user");
    console.log(data);
    if(data==null){
    navigate("/");
    }
  },[navigate]);

  const [formData, setFormData] = useState({
    Name: "",
    Designation: "",
    Organization: "",
    Address: "",
    Email: "",
    Mobile_No: "",
  });

  const [errors, setErrors] = useState({});
  
  const validation = () => {
    const newErrors = {};
   
    if (!formData.Name) {
      newErrors.Name = 'Name is required';
    }

    if (!formData.Designation) {
      newErrors.Designation = 'Designation is required';
    } 
    
    if (!formData.Organization) {
      newErrors.Organization= 'Organization is required';
    } 
    if (!formData.Address) {
      newErrors.Address= 'Address is required';
    } 
    if (!formData.Email) {
      newErrors.Email= 'Email is required';
    } 
    if (!formData.Mobile_No) {
      newErrors.Mobile_No= 'Mobile_No is required';
    } 
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can perform any necessary actions with formData here
    const userId=localStorage.getItem('id');
    if (validation()) {
      try {
        const response = await fetch("/reference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This sends cookies with the request
          body: JSON.stringify({formData,userId}),
        });

        if (response.status === 200) {
          const data = await response.json();

          if (data === "created") {
            alert("User Created Successfully");
            navigate("/final");
          } else if (data === "updated") {
            alert("Updated Successfully");
            navigate("/final");
          }
          setFormData({
            Name: "",
            Designation: "",
            Organization: "",
            Address: "",
            Email: "",
            Mobile_No: "",
          });
          
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
    <Innernavbar/>
    <div className="application">
      <h3 style={{ textAlign: "center" }}>Reference Details</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Name*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="Name"
              required
              onChange={handleInputChange}
              value={formData.Name}
            />
            {errors.Name && (<span className="text-red-500">{errors.Name}</span>)}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label for="lname">Designation*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="Designation"
              required
              onChange={handleInputChange}
              value={formData.Designation}
            />
            {errors.Designation && (<span className="text-red-500">{errors.Designation}</span>)}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label for="fname">Organization*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="Organization"
              required
              onChange={handleInputChange}
              value={formData.Organization}
            />
            {errors.Organization && (<span className="text-red-500">{errors.Organization}</span>)} 
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="fname">Address*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="Address"
              required
              onChange={handleInputChange}
              value={formData.Address}
            />
             {errors.Designation && (<span className="text-red-500">{errors.Designation}</span>)}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="fname">Email*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="Email"
              required
              onChange={handleInputChange}
              value={formData.Email}
            />
             {errors.Email && (<span className="text-red-500">{errors.Email}</span>)}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="fname">Mobile No*:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="Mobile_No"
              required
              onChange={handleInputChange}
              value={formData.Mobile_No}
            />
             {errors.Mobile_No && (<span className="text-red-500">{errors.Mobile_No}</span>)}
          </div>
        </div>
        <div className="row">
        <button className="button" onClick={(e)=>handleSubmit(e)}>submit</button>
      </div>
      </form>
    </div>
    </>
  );
}

export default ReferenceForm;

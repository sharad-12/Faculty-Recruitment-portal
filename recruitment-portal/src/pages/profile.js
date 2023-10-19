import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Innernavbar from '../components/Innernavbar';

function JobApplicationCard() {
  const navigate = useNavigate();
  useEffect(()=>{
    let data=localStorage.getItem("user");
    console.log(data);
    if(data==null){
    navigate("/");
    }
  },[navigate]);

  const [application, setApplication] = useState('');
  const [errors, setErrors] = useState({});
 

  const validation = () => {
    const newErrors = {};

    if (!application) {
      newErrors.application = 'Application Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();
    const userId=localStorage.getItem('id');
    if (validation()) {
      try {
        const response = await fetch('/applicationType', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ application,userId}), // Wrap the application in an object
        });

        if (response.status === 200) {
          const data = await response.json();
  
          if (data === 'created') {
            alert('User Created Successfully');
            navigate('/application');
          } else if (data === 'updated') {
            alert('Updated Successfully');
            navigate('/application');
          }
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      }
    }
  };

  const handleInputChange = (e) => {
    setApplication(e.target.value);
  };

  return (
    <>
      <Innernavbar />
      <div className="card">
        <div className="job-application">
          <div className="heading">
            <h2 className="job-application-heading">Job Application</h2>
          </div>
          <form className='profileform'>
            <select name="application" value={application} onChange={handleInputChange}>
            <option value="Faculty">Select Value</option>
              <option value="Faculty">Faculty</option>
              <option value="Non Faculty">Non Faculty</option>
              <option value="Hostel Attendant">Hostel Attendant</option>
              <option value="Hostel Assistant">Hostel Assistant</option>
            </select>
            {errors.application && <span className="text-red-500">{errors.application}</span>}
            <br />
            <button className='button' onClick={(e) => collectData(e)}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobApplicationCard;

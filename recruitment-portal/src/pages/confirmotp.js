import {React,useState} from 'react';
import { useNavigate} from 'react-router-dom';

export default function Home() {
  const [formData, setFormData] = useState({
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validation()) {
      try {
        const response = await fetch('/checkotp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          const data = await response.json();
  
          if (data === 'true') {
            alert('OTP Verified Successfully');
            navigate('/changepassword');
            return;
          }  
        } else {
            alert("Please Enter the Correct OTP");
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  return (
    <div className="container">
      <div className="left-container">
        <h1>Instructions to fill Application</h1>
        <ul>
        <li>Candidate has to register themselves in recruitment portal to fill application form online. Note:
                    This portal is compatible with google chrome and mozilla firefox browsers only.</li>
                <li>After registration candidate will get an email on registered email –id about detail of login
                    credential.</li>
                <li>Once you login inside the portal select advertisement no. and Post name from dropdown list and then
                    click on the start button to fill the application form.</li>
                <li>Fill separate application form for each post individually. Duplicate forms with different email-id
                    for same post will not be considered.</li>
                <li>* Marked fields are mandatory.</li>
                <li>Keep all the documents ready (self-attested and scanned) before starting to fill the online
                    application.</li>
                <li>After submitting application form, download it to save for your reference. Hard Copy of application
                    form will be required during the interview or selection process.</li>
                <li>Application form having wrong or incomplete information will not be considered for shortlisting
                    process. Also, form corrections will not be entertained.</li>
        </ul>
      </div>
      <div className="right-container">
        <h1>Confirm OTP</h1>
       
          <label htmlFor="password">OTP</label>
          <input type="otp" name="otp" placeholder="Enter OTP"  onChange={handleChange} value={formData.otp}/>
          {errors.otp && (<span className="text-red-500">{errors.otp}</span>)}

          <button type='submit' className="button" onClick={(e)=>handleSubmit(e)}>Confirm</button>
      </div>
    </div>
  );
}

 

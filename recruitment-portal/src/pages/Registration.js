import {React,useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
function ApplicationForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword:''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validation = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter your Institute Email ID';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        'Password should have at least one lowercase letter, one uppercase letter, and one special character';
    }

    if(formData.password!==formData.confirmpassword){
      newErrors.confirmpassword="Confirm Password and Password must be same"
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();
  
    if (validation()) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          const data = await response.json();
  
          if (data === 'exist') {
            alert('Email already exists');
            navigate('/register');
          } else {
            setFormData({
              name: '',
              email: '',
              password: '',
              confirmpassword:''
            });
            console.warn(data);
            localStorage.setItem('user', data.name);
            localStorage.setItem('id',data._id);
            navigate('/profile');
          }
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
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
    <div className="container">
      <div className="left-container">
        <h1>Instructions to fill Application</h1>
        <ul>
          <li>Candidate has to register themselves in the recruitment portal to fill the application form online. Note: This portal is compatible with Google Chrome and Mozilla Firefox browsers only.</li>
          <li>After registration, the candidate will receive an email on the registered email –id about details of login credentials.</li>
          <li>Once you log in inside the portal, select the advertisement no. and Post name from the dropdown list and then click on the start button to fill the application form.</li>
          <li>Fill a separate application form for each post individually. Duplicate forms with different email-ids for the same post will not be considered.</li>
          <li>* Marked fields are mandatory.</li>
          <li>Keep all the documents ready (self-attested and scanned) before starting to fill the online application.</li>
          <li>After submitting the application form, download it to save for your reference. A hard copy of the application form will be required during the interview or selection process.</li>
          <li>Application forms having wrong or incomplete information will not be considered for the shortlisting process. Also, form corrections will not be entertained.</li>
        </ul>
      </div>
      <div className="right-column">
        <h1>Registration</h1>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} value={formData.name} />
          {errors.name && (<span className="text-red-500">{errors.name}</span>)}

          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} value={formData.email}/>
          {errors.email && (<span className="text-red-500">{errors.email}</span>)}

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} value={formData.password}/>
          {errors.password && (<span className="text-red-500">{errors.password}</span>)}

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmpassword} />
          {errors.confirmpassword && (<span className="text-red-500">{errors.cofirmpassword}</span>)}

          <button className="button" onClick={(e)=>collectData(e)}>Register</button>

          <Link to="/home">Already Register?</Link>
      </div>
    </div>
  );
}

export default ApplicationForm;

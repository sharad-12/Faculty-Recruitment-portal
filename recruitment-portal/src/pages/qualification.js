import React,{useState,useEffect}from 'react';
import {useNavigate} from 'react-router-dom';
import Innernavbar from '../components/Innernavbar'
function QualificationDetailsForm() {
  const navigate = useNavigate();
  useEffect(()=>{
    let data=localStorage.getItem("user");
    console.log(data);
    if(data==null){
    navigate("/");
    }
  },[navigate]);
  const [formData, setFormData] = useState({
    qualification:'',
    board:'',
    college:'',
    evaluation:'',
    obtained:'',
    passyear:'',
    subject:'',
    filename:''

  });
  const [errors, setErrors] = useState({});


  const validation = () => {
    const newErrors = {};
   
    if (!formData.qualification) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData.board) {
      newErrors.board = 'Board is required';
    } 
    
    if (!formData.college) {
      newErrors.college= 'College is required';
    } 
    if (!formData.evaluation) {
      newErrors.evaluation= 'Evaulation is required';
    } 
    if (!formData.obtained) {
      newErrors.obtained= 'Obtained Marks or Percentile is required';
    } 
    if (!formData.passyear) {
      newErrors.passyear= 'Pass year is required';
    } 
    if (!formData.subject) {
      newErrors.subject= 'Subject is required';
    } 
    if (!formData.filename) {
      newErrors.filename= 'Filename is required';
    } 
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();
    const userId=localStorage.getItem('id');
    if (validation()) {
      try {
        const response = await fetch('/qualification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This sends cookies with the request
          body: JSON.stringify({formData,userId}),
        });
  
        if (response.status === 200) {
          const data = await response.json();

          if (data === "created") {
            alert("User Created Successfully");
            navigate("/experience");
          } else if (data === "updated") {
            alert("Updated Successfully");
            navigate("/experience");
          }
          setFormData({
            qualification:'',
            board:'',
            college:'',
            evaluation:'',
            obtained:'',
            passyear:'',
            subject:'',
            filename:''
          });
          
        } else {
          console.error("Error:", response.statusText);
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


  const fileupload=(e)=>{
    console.log(e.target.files)
    setFormData({...formData,filename:e.target.files[0].name})
  }
  return (
    <>
    <Innernavbar/>
    <div className="application">
    <h3 style={{ textAlign: 'center' }}>Qualification Details</h3>
    <hr />
    <form>
      <div className="row">
        <div className="col-25">
          <label htmlFor="qualification">Qualification:</label>
        </div>
        <div className="col-75">
          <select
            id="qualification"
            name="qualification"
            required
            onChange={handleChange} value={formData.qualification}
          >
            <option value="0">Select</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="U.G">U.G</option>
            <option value="P.G">P.G</option>
            <option value="Research">RESEARCH</option>
            <option value="Diploma">DIPLOMA</option>
            <option value="Certification">CERTIFICATION</option>
           
          </select>
          {errors.qualification && (<span className="text-red-500">{errors.qualification}</span>)}
        </div>
      </div>
      <div className="row">
          <div className="col-25">
            <label htmlFor="board">Board/University :</label>
          </div>
          <div className="col-75">
            <input type="text" id="board" name="board" placeholder="" required onChange={handleChange} value={formData.board}/>
          </div>
        </div>
        {errors.board && (<span className="text-red-500">{errors.board}</span>)}
        <div className="row">
          <div className="col-25">
            <label htmlFor="college">School/College* :</label>
          </div>
          <div className="col-75">
            <input type="text" id="college" name="college" placeholder=" " required onChange={handleChange} value={formData.college} />
          </div>
        </div>
        {errors.college && (<span className="text-red-500">{errors.college}</span>)}
        <div className="row">
          <div className="col-25">
            <label htmlFor="evaluation">Evaluation Type*:</label>
          </div>
          <div className="col-75">
            <select id="evaluation" name="evaluation"  onChange={handleChange} value={formData.evaluation}>
              <option value="0">Select</option>
              <option value="Per(%)">Per(%)</option>
              <option value="CGPA">CGPA</option>

            </select>
          </div>
        </div>
        {errors.evaluation && (<span className="text-red-500">{errors.evaluation}</span>)}
        <div className="row">
          <div className="col-25">
            <label htmlFor="obtained">Obtained:</label>
          </div>
          <div className="col-75">
            <input type="text" id="obtained" name="obtained" placeholder=" " required  onChange={handleChange} value={formData.obtained}/>
          </div>
        </div>
        {errors.obtained && (<span className="text-red-500">{errors.obtained}</span>)}
        <div className="row">
          <div className="col-25">
            <label htmlFor="passyear">Passing Year*:</label>
          </div>
          <div className="col-75">
            <select id="passyear" name="passyear"  onChange={handleChange} value={formData.passyear}>
              <option value="0">Select</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
        </div>
        {errors.passyear && (<span className="text-red-500">{errors.passyear}</span>)}
        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Subject/Specialization :</label>
          </div>
          <div className="col-75">
            <input type="text" id="subject" name="subject" placeholder="" required  onChange={handleChange} value={formData.subject} />
          </div>
        </div>
        {errors.subject && (<span className="text-red-500">{errors.subject}</span>)}
      <div className="row">
        <div className="col-25">
          <label htmlFor="filename">Upload Marksheet & Certificate*:</label>
        </div>
        <div className="col-75">
          <input
            type="file"
            id="filename"
            name="filename"
            required
            onChange={(e)=>fileupload(e)}
            
          />
        </div>
      </div>
      {errors.filename && (<span className="text-red-500">{errors.filename}</span>)}
      <div className="row">
        <button className='button' onClick={(e)=>collectData(e)}>submit</button>
      </div>
    </form>
  </div>
  </>
);
}

export default QualificationDetailsForm;

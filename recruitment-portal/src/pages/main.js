import React from "react";
import { useNavigate } from "react-router-dom";

// import Teach from "C:\Users\Hp\Desktop\Portal\teach.webp"
function Main() {
  const navigate = useNavigate();

  const changenavigation = () => {
    navigate("/home");
  };

  return (
    <>
    
  <section>
    <div class="paralex-body">
      <div class="paralex-head paralex-images">
        <div class="paralex-text">
          <img src="iiit.jpg" alt="" />
        </div>
      </div>
    </div>
  </section>
      <div className="about-us-container">
        <h1 className="about-us-heading">About Us</h1>
        <p className="about-us-paragraph">
          IIIT Una is one of the 20 IIITs being setup, funded and managed by the
          Ministry of Education, Govt. of India under the Public Private
          Partnership (PPP) model. The partners setting up IIIT Una are the
          Ministry of Education, Govt. of India, the Govt. of Himachal Pradesh,
          HP Power Corporation Limited and HP Transmission Corporation Limited.
          Admissions to the undergraduate programmes in the Institute are made
          through the Joint Entrance Examination (JEE). At present, IIIT Una
          operates from its permanent campus at Saloh, Una. The campus is fully
          furnished and working full fledged from its permanent campus.
        </p>
      </div>
      <h1 className="fresh">Fresh Opening</h1>
      <div className="jobs">
        <div className="job-container">
          {/* <img src={Teach} alt="Image 1"/> */}
          <h2>Faculty</h2>
          <p>
            Define roles, advertise vacancies, review applications, conduct
            interviews, assess qualifications, conduct teaching demos, check
            references, communicate clearly, finalize selection.
          </p>
          <button className="apply-button" onClick={changenavigation}>
            Apply Now
          </button>
        </div>
        <div className="job-container">
          {/* <img src="image2.jpg" alt="Image 2"/> */}
          <h2>Non Faculty</h2>
          <p>
            Specify roles, advertise widely, screen applications, conduct
            interviews, verify credentials, check references, communicate
            clearly, offer competitive packages, finalize selections.
          </p>
          <button className="apply-button" onClick={changenavigation}>
            Apply Now
          </button>
        </div>
        <div className="job-container">
          {/* <img src="image3.jpg" alt="Image 3"/> */}
          <h2>Working Staff</h2>
          <p>
          Define positions, advertise openings, screen applications, conduct interviews, verify credentials, check references, communicate clearly, offer competitive packages, finalize selections.
          </p>
          <button className="apply-button" onClick={changenavigation}>
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;

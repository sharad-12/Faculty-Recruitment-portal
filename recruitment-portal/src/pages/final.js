import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios'
export default function Final() {

const [completeData,setcompleteData]=useState({});
 const navigate=useNavigate();
  useEffect(()=>{
   getData();
  },[navigate]);

  useEffect(() => {
    let data = localStorage.getItem("user");
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (data == null) {
      navigate("/");
    }
  }, [navigate]);

  const getData=async()=>{
    const userId =localStorage.getItem('id');
    const response = await fetch('/finalData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({userId}), // Wrap the application? in an object
    });

    if (response.status === 200) {
      const data = await response.json();
      setcompleteData(data);
      console.log(completeData);
    } else {
      console.error('Error:', response.statusText);
    }
  }

  const generatePDF = async() => {
    const doc = new jsPDF();
    let yOffset = 10; // Initial Y position
  
    // Function to add a section to the PDF
    const addSection = (title, data) => {
      doc.setFontSize(14);
      doc.text(title, 10, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.autoTable({
        startY: yOffset,
        head: [['Field', 'Value']],
        body: data,
      });
      yOffset = doc.autoTable.previous.finalY + 10;
    };
  
    // Add Personal Details
    addSection('Personal Details', [
      ['First Name:', completeData.application?.firstName],
      ['Middle Name:', completeData.application?.middleName],
      ['Last Name:', completeData.application?.lastName],
      ['Father Name:', completeData.application?.fatherName],
      ['Mother Name:', completeData.application?.motherName],
      ['Place of Birth:', completeData.application?.birthPlace],
      ['Gender:', completeData.application?.Gender],
      ['Marital Status:', completeData.application?.maritialStatus],
      ['Nationality:', completeData.application?.Nationality],
      ['Category:', completeData.application?.Category],
      ['Religion:', completeData.application?.Religion],
    ]);
  
    // Add Address Details
    addSection('Address Details', [
      ['Communication Address:', completeData.application?.CommunicationAddress],
      ['Permanent Address:', completeData.application?.PermenantAddress],
    ]);
  
    // Add Contact Information
    addSection('Contact Information', [
      ['Mobile-No*:', completeData.application?.Mobile],
      ['Alternate No*:', completeData.application?.AlternateMobile],
    ]);
  
    // Add Identification Details (Photograph and Signature)
    addSection('Identification Details', [
      ['Upload Photograph*:', 'Griffin'],
      ['Upload Signature*:', 'Griffin'],
    ]);
  
    // Add Qualification Details
    addSection('Qualification Details', [
      ['Qualification Type*:', completeData.qualification?.qualification],
      ['Board/University:', completeData.qualification?.board],
      ['School/College*:', completeData.qualification?.college],
      ['Evaluation Type*:', completeData.qualification?.evaluation],
      ['Passing Year*:', completeData.qualification?.passyear],
      ['Subject/Specialization:', completeData.qualification?.subject],
      ['Upload Marksheet & Certificate*:', completeData.qualification?.filename],
    ]);
  
    // Add Experience Details
    addSection('Experience Details', [
      ['Name of Organisation*:', completeData.experience?.organization],
      ['Designation*:', completeData.experience?.designation],
      ['Organisation Type*:', completeData.experience?.organizationType],
      ['Employment Type*:', completeData.experience?.employementType],
      ['From date*:', completeData.experience?.initialDate],
      ['Currently Working Here*:', completeData.experience?.currentWorking],
      ['To date*:', completeData.experience?.enddate],
    ]);
  
    // Add Reference Details
    addSection('Reference Details', [
      ['Name*:', completeData.refrence?.Name],
      ['Designation*:', completeData.refrence?.Designation],
      ['Organization:', completeData.refrence?.Organization],
      ['Address*:', completeData.refrence?.Address],
      ['Email*:', completeData.refrence?.Email],
      ['Mobile No:', completeData.refrence?.Mobile_No],
    ]);
    
    doc.save('application_form.pdf');
    sendPDFToServer(doc.output('blob'));
  };

  const sendPDFToServer = (pdfBlob) => {
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'application_form.pdf');

    const userConfirmed = window.confirm('Are you sure you want to submit this application?');

    if (userConfirmed) {
      axios
      .post('/sendemail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Application Submitted successfully');
            navigate('/home');
          } else {
            alert('Application not sent');
          }
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    } else {
      console.log('Email not sent. User canceled.');
    }
  };
  
  return (
    <div>
      <h1 className='text-center font-extrabold mt-4 text-2xl'>APPLICATION FORM</h1>
<h2 className='text-center'>Personal Details</h2>


<table>
 
  <tr>
    <th>First Name :</th>
    <td>{completeData.application?.firstName}</td>
  
  </tr>
  <tr>
    <th>Middle Name :</th>
    <td>{completeData.application?.middleName}</td>
    
  </tr>
  <tr>
    <th>Last Name :</th>
    <td>{completeData.application?.lastName}</td>
   
  </tr>
  <tr>
    <th>Father Name :</th>
    <td>{completeData.application?.fatherName}</td>
    
  </tr>
   <tr>
    <th>Mother Name :</th>
    <td>{completeData.application?.motherName}</td>
    
  </tr>
   <tr>
    <th>Place of Birth :</th>
    <td>{completeData.application?.birthPlace}</td>
    
  </tr>
   <tr>
    <th>Gender:</th>
    <td>{completeData.application?.Gender}</td>
    
  </tr>
   <tr>
    <th>Married Status:</th>
    <td>{completeData.application?.maritialStatus}</td>
    
  </tr>
   <tr>
    <th>Nationality :</th>
    <td>{completeData.application?.Nationality}</td>
    
  </tr>
   <tr>
    <th>Category :</th>
    <td>{completeData.application?.Category}</td>
    
  </tr>
   <tr>
    <th>Religion :</th>
    <td>{completeData.application?.Religion}</td>
    
  </tr>
   <tr>
    <th>Gender:</th>
    <td>{completeData.application?.Gender}</td>
    
  </tr>
</table>


<table>
  <tr>
    <td>
      <h3>Communication Address</h3>
      <table>
        {/* <!-- Communication Address table content goes here -- */}
         <tr>
    <th>Address :</th>
    <td>{completeData.application?.CommunicationAddress}</td>
  
  </tr>
  <tr>
    <th>Country:</th>
    <td>{completeData.application?.CommunicationCountry}</td>
    
  </tr>
  <tr>
    <th>State :</th>
    <td>{completeData.application?.CommunicationState}</td>
   
  </tr>
  <tr>
    <th>City :</th>
    <td>{completeData.application?.CommunicationCity}</td>
    
  </tr>
   <tr>
    <th>Pin :</th>
    <td>{completeData.application?.CommunicationPin}</td>
    
  </tr>

</table>
    </td>
    <td>
      <h3>Permanent Address</h3>
      <table>
         <tr>
    <th>Address :</th>
    <td>{completeData.application?.PermenantAddress}</td>
  
  </tr>
  <tr>
    <th>Country:</th>
    <td>{completeData.application?.PermenantCountry}</td>
    
  </tr>
  <tr>
    <th>State :</th>
    <td>{completeData.application?.PermenantState}</td>
   
  </tr>
  <tr>
    <th>City :</th>
    <td>{completeData.application?.PermenantCity}</td>
    
  </tr>
   <tr>
    <th>Pin :</th>
    <td>{completeData.application?.PermenantPin}</td>
    
  </tr>
        {/* <!-- Permanent Address table content goes here --> */}
      </table>
    </td>
  </tr>
</table>  
  <table>
  <tr>
    <td>
      <h3>Contact Information</h3>
      <table>
        {/* <!-- Communication Address table content goes here --> */}
         <tr>
    <th>Mobile-No* :</th>
    <td>{completeData.application?.Mobile}</td>
  
  </tr>
  <tr>
    <th>Alternate No* :</th>
    <td>{completeData.application?.AlternateMobile}</td>
    
  </tr>
 

      </table>
    </td>
    <td>
      <h3>Identification Details</h3>
      <table>
         <tr>
    <th>Upload Photograph* :</th>
    <td>Griffin</td>
  
  </tr>
  <tr>
    <th>Upload Signature* :</th>
    <td>Griffin</td>
    
  </tr>
 
      </table>
    </td>
  </tr>
</table>







<br/>


<h2>Qualification Details</h2>


<table>
 
  <tr>
    <th>Qualification Type*:</th>
    <td>{completeData.qualification?.qualification}</td>
  
  </tr>
  <tr>
    <th>Board/University :</th>
    <td>{completeData.qualification?.board}</td>
    
  </tr>
  <tr>
    <th>School/College* :</th>
    <td>{completeData.qualification?.college}</td>
   
  </tr>
  <tr>
    <th>Evalution Type*:</th>
    <td>{completeData.qualification?.evaluation}</td>
    
  </tr>
   <tr>
    <th>Passing Year*:</th>
    <td>{completeData.qualification?.passyear}</td>
    
  </tr>
   <tr>
    <th>Subject/Specialization :</th>
    <td>{completeData.qualification?.subject}</td>
    
  </tr>
   <tr>
    <th>Upload Marksheet & Certificate* :</th>
    <td>{completeData.qualification?.filename}</td>
    
  </tr>
  
</table>


<br/>


<h2>Experience Details</h2>


<table>
 
  <tr>
    <th>Name of Organisation* :</th>
    <td>{completeData.experience?.organization}</td>
  
  </tr>
  <tr>
    <th>Designation* :</th>
    <td>{completeData.experience?.designation}</td>
    
  </tr>
  <tr>
    <th>Organisation Type*:</th>
    <td>{completeData.experience?.organizationType}</td>
   
  </tr>
  <tr>
    <th>Employment Type *:</th>
    <td>{completeData.experience?.employementType}</td>
    
  </tr>
   <tr>
    <th>From date* :</th>
    <td>{completeData.experience?.initialDate}</td>
    
  </tr>
   <tr>
    <th>Currently Working Here?*:</th>
    <td>{completeData.experience?.currentWorking}</td>
    
  </tr>
   <tr>
    <th>To date* :</th>
    <td>{completeData.experience?.enddate}</td>
    
  </tr>
   {/* <tr>
    <th>Upload Experience* :</th>
    <td>Brown</td>
    
  </tr> */}
  
</table>


<h2>Reference Details</h2>


<table>
 
  <tr>
    <th>Name*:</th>
    <td>{completeData.refrence?.Name}</td>
  
  </tr>
  <tr>
    <th>Designation*:</th>
    <td>{completeData.refrence?.Designation}</td>
    
  </tr>
  <tr>
    <th>Organization:</th>
    <td>{completeData.refrence?.Organization}</td>
   
  </tr>
  <tr>
    <th>Address*:</th>
    <td>{completeData.refrence?.Address}</td>
    
  </tr>
   <tr>
    <th>Email*:</th>
    <td>{completeData.refrence?.Email}</td>
    
  </tr>
   <tr>
    <th>Mobile No:</th>
    <td>{completeData.refrence?.Mobile_No}</td>
    
  </tr>
  
  
</table>
{/* <a href="/" class="button">Print</a> */}
<button className="button" onClick={generatePDF}>Print</button>
    </div>
  )
}


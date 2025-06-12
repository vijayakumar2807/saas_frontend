import React, { useState } from 'react'
import { postClient } from '../../helpers/ApiHelper';
// import {Button} form 'antd'
function Form() {
    const [company_name,setName] = useState('');
    const [contact_email, setEmail] = useState('');
    const [industry, setIndustry] = useState('');
    const client_Submit = async (e) => {
        e.preventDefault();//stops page refresh
        const data = {
            company_name: company_name,
            contact_email: contact_email,
            industry: industry
          };
          try{
            await postClient(data);
          }catch(error){
            alert("Successful Failure");
          }
    };

  return (
    <div>
      <form onSubmit = {(e) => client_Submit(e, company_name, contact_email, industry) }>
        <label>Name:</label><br/>
        <input type = 'text'  value ={company_name} name = 'company_name'
        onChange = {(e) => setName(e.target.value)} /><br/>
        <label>Contact_Email:</label><br/>
        <input type = 'text' value = {contact_email} name = 'contact_email'
        onChange = {(e) => setEmail(e.target.value)} /><br/>
        <label>Industry:</label><br/>
        <input type = 'text' value = {industry} name = 'industry'
        onChange = {(e) => setIndustry(e.target.value)} /><br/>
        <label>  </label><br/>
        <button type = "submit"  >SUBMIT</button>
        <style>
          {

          }
        </style>
      </form>
    </div>
  );
};

export default Form;

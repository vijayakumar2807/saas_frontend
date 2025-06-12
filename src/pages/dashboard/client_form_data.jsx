import React from 'react';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postClients } from '../../helpers/ApiHelper';
function ClientsForm() {
  const [company_name, setCompanyName] = useState('')
  const [contact_email, setEmail] = useState('')
  const [industry, setIndustry] = useState('')

  const handleClientsSubmit = async (e) => {
    e.preventDefault();

    const data = {
        company_name: company_name,
        contact_email: contact_email,
        industry: industry,
    }
    try {
        await postClients(data);
        toast.success("Client created successfully!");
    } catch(error) {
        toast.error("Client creation failed successfully!");
    }
  }
  return (
    <form onSubmit={(e) => handleClientsSubmit(e, company_name, contact_email, industry)}>
    <ToastContainer />
        <label>
        Company Name:
        </label><br/>
        <input 
               name = "company_name"
               type="text" 
               value={company_name}
               onChange={(e) => setCompanyName(e.target.value)}
        /><br/>
      <label>
        Email:
        </label><br/>
        <input 
               name = "contact_email"
               type="email"
               value={contact_email}
               onChange={(e) => setEmail(e.target.value)}
        /><br/>
      <label>
        Industry:
        </label><br/>
        <input 
               name = "industry"
               type="text"
               value={industry}
               onChange={(e) => setIndustry(e.target.value)}
        /><br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ClientsForm;
import React from 'react'
import { getMyPlan } from '../../helpers/ApiHelper';
import { useState, useEffect } from 'react';
import {Table, Spin, message, Alert} from 'antd';
function MyPlans() {
  const [myPlans, setMyplans ] = useState([]);
  const [error, setError ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
      const fetchData = async () =>{
      try{
        const data = await getMyPlan();
        console.log("getMyPlan() response:", data);
        setMyplans(Array.isArray(myPlans) ? myPlans : []);

      }catch(err){
        setError( err.message ||'Failed to fetch data' );
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const column = [
    {
      title : 'CLIENT',
      dataIndex :'client',
      key : 'client',
      render: (_, record) => {
        const clientObj = clients.find(c => c.id === record.client);
        return clientObj ? clientObj.company_name : 'Unknown';
      }
    },
    {
      title :'PLAN',
      dataIndex : 'plan',
      key : 'plan',
      render: (_, record) => {
        const planObj = plan.find(p => p.id === record.plan);
        return planObj ? planObj.name : 'Unknown';
      }
    },
    {
      title : 'START DATE',
      dataIndex: 'start_date',
      key:'start_date'
    },
    {
      title: 'END_DATE',
      dataIndex: 'end_date',
      key: 'end_date'
    },
    {
      title : 'STATUS',
      dataIndex : 'status',
      key: 'status'
    },
    // {
    //   title : 'TRIAL',
    //   dataIndex :'trial',
    //   key : 'trial',
    //   render:(val) =>(val ? 'Yes': 'No')
    // },
    // {
    //   title : 'USAGE',
    //   dataIndex : 'usage',
    //   key : 'usage'
    // },
  ];


  return (
    <>
          {/* Table for the plans fetched */}
          {error && <Alert type = "error" message = {error} showIcon style = {{marginBottom:'1rem'}}/>}
          
          {loading ? (
            <Spin tip = "Loading Subscription...."/>
          ) : (
            <Table dataSource = {myPlans}
            columns={column}
            rowKey={'id'}
            />
          )
          }
        </>
  )
}

export default MyPlans ;  

import React, { useEffect, useState } from 'react';
import { postSub, updateSub, getSub, deleteSub, getClients, getUsers, getPlans } from '../../helpers/ApiHelper' 
import { AlignCenterOutlined } from '@ant-design/icons';
import { Table, Spin, Alert, Button, Form as AntForm, Modal, Input, message, Popconfirm, Row, Col, Checkbox } from 'antd';
import { Tab } from '@headlessui/react';
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';
import { update, values } from 'lodash-es';
import { Select } from 'antd';
const {Option} = Select;
// import { data } from 'react-router';
function Subscription() {
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [ subscription, setSubscription] = useState([]);
  const [ loading, setLoading] = useState(true);
  const [ error, setError] = useState('');
  const [ modalVisible, setModalVisible] = useState(false);
  const [ currentSub, setCurrentSub] = useState(null);
  const [ form ] = AntForm.useForm();
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  useEffect(() =>{
    const fetchData = async () =>{
    try{
      const [subData, clientData, PlanData] = await Promise.all([
        getSub(),
        getClients(),
        getPlans()
      ]);
      setSubscription(subData);
      setClients(clientData);
      setPlans(PlanData);
    }catch(err){
      setError( err.message ||'Failed to fetch data' );
    }finally{
      setLoading(false);
    }
  };
  fetchData();
}, []);

  const handleAdd = () => {
  setCurrentSub(null);
  form.resetFields();
  setModalVisible(true);
};
  const handleEdit = (record) => {
    setCurrentSub(record);
    form.setFieldValue(record);
    setModalVisible(true);
  };
  const rowSelect = {
    selectRowKeys,
    onChange :(keys) => setSelectRowKeys(keys),
  };

  const deleteSelectedSub = async () => {
    try{
      for(const id of selectRowKeys){
        await deleteSub(id);
      }
      message.success('Selected Subscription deleted');
      setSubscription(prev => prev.filter( client => !selectRowKeys.includes(client.id)));
      setSelectRowKeys([]);
    }catch(err){
      message.error('Failed to Delete');
    }
  };

  //handle Submit
  const handleSubmit = async (values) => {
    try{
      if(currentSub){
        await updateSub(currentSub.id, values);
        setSubscription(prev =>prev.map(item => item.id === currentSub.id ? {...item,...values}:item));
        message.success('Successfully Updated');
      }else{
        const newSub = await postSub(values);
        setSubscription(prev => [...prev, newSub]);
        message.success('Posted New Subsciption');
      };
      setModalVisible(false);
    }catch(err){
      message.success('Operation Failed');
    }
  };
//column to be displayed
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
        const planObj = plans.find(p => p.id === record.plan);
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
    {
      title : 'UPDATE',
      key : ' update',
      render : (_, record) => (
        <Button onClick = {
          () => handleEdit(record)}>EDIT</Button>
      )
    },
  ]


  return (
    <>
          {/* Add/edit SUBSCRIPTION Modal */}
          <Modal title = {currentSub ? 'Edit Subscription' :'Add SUBSCRIPTION'}
          open = {modalVisible}
          onCancel={() => setModalVisible(false)}
          footer = {null}
          >
            <AntForm form={form}
            initialValues={currentSub || {} }
            onFinish = {handleSubmit}
            layout='vertical'
            >
              {currentSub && (
      <>
        <AntForm.Item
          name="start_date"
          label="START DATE :"
          rules={[{ required: true }]}
        >
          <Input type="date" />
        </AntForm.Item>

        <AntForm.Item
          name="end_date"
          label="END DATE :"
          rules={[{ required: true }]}
        >
          <Input type="date" />
        </AntForm.Item>
      </>
    )}
              <AntForm.Item name = "status" label = 'Status :' rules = {[{required:true}]}>
                <Input/>
              </AntForm.Item>
              {/* <AntForm.Item name = 'trial' label ="TRIAL :" valuePropName='checked'>
                <Checkbox>TRAIL</Checkbox>
              </AntForm.Item> 
              <AntForm.Item name ="usage" label ='USAGE :' rules ={[{required : true}]}>
                <Input/>
              </AntForm.Item> */}
              <AntForm.Item name = 'client' label = 'CLIENT :' rules = {[{required: true}]}>
                <Select placeholder = 'Select Client'>
                  {
                  clients.map(client => (
                    <Option key = {client.id} value = {client.id}>{client.company_name}</Option>
                  ))
                  };
                </Select>
              </AntForm.Item>
              <AntForm.Item name = 'plan' label = 'PLAN :' rules = {[{required : true }]}>
                <Select placeholder = "Select Plan">
                  {
                  plans.map(plan => (
                    <Option Key = {plan.name} value = {plan.id}>{plan.name}</Option> 
                  ))
                  };
                </Select>
              </AntForm.Item>
              <AntForm.Item >
                <Button type='primary' htmlType='submit'>
                  {currentSub ? 'Update':'Submit'}
                </Button>
              </AntForm.Item>
            </AntForm>
          </Modal>
          {/* Deletion and other header Section front end  */}
          <Row justify='space-between' align="middle" style={{marginBottom: '1rem'}}>
            <Col>
            <h1 style = {{marginBottom: 0}}>SUBSCRIPTION</h1>
            <h2 style = {{marginBottom: 0}}>MANAGE YOUR SUBSCRIPTION FROM HERE</h2>
            </Col>
            <Col>
            <Button type='primary' onClick={handleAdd}>ADD SUBSCRIPTION</Button>
            </Col>
          </Row>
          {/* Delete Button */}
          <Row justify= 'start' style = {{marginBottom: '1rem'}}>
            <Col>
            <Popconfirm title = "Confirm to Delete Selected Subscription" 
            onConfirm = {deleteSelectedSub}
            okText = 'Yes'
            cancelText = 'No'
            getPopupContainer = {() => document.body}
            popupStyle = {{ zIndex: 1500}}
            disabled = {selectRowKeys.length === 0}>
              <Button disabled = {selectRowKeys.length === 0}>
                DELETE
              </Button>
              </Popconfirm>
              </Col>
          </Row>
          {/* Table for the plans fetched */}
          {error && <Alert type = "error" message = {error} showIcon style = {{marginBottom:'1rem'}}/>}
          
          {loading ? (
            <Spin tip = "Loading Subscription...."/>
          ) : (
            <Table dataSource = {subscription}
            columns={column}
            rowKey={'id'}
            rowSelection={rowSelect}
            />
          )
        }
        </>
  )
};

export default Subscription
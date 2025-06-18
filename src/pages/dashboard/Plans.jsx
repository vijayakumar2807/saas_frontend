import React, { useEffect, useState } from 'react'
import {Table, Spin, Alert, Button, Form as AntForm, Modal, Input, message, Popconfirm, Row, Col} from 'antd';
import{getPlans, postPlan, updatePlan, deletePlan} from '../../helpers/ApiHelper';
import { style } from '@mui/system';
import { AlignCenterOutlined } from '@ant-design/icons';

function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [error, setError ] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = AntForm.useForm();
  const [selectRowKeys, setSelectRowKeys ] = useState([]);
  const [currentPlan, setCurrentPlan ] = useState(null);
  useEffect(() => {
      const fetchPlans = async () => {
        try {
          const data = await getPlans();
          setPlans(data);
        } catch (err) {
          setError(err.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlans();
    }, []);


  const rowSelect = {
    selectRowKeys,
    onChange: (keys) =>setSelectRowKeys(keys),
  };

  const handleAdd = () =>{
    setCurrentPlan(null);
    form.resetFields();
    setModalVisible(true);
  };
  const handleEdit = (record) => {
    setCurrentPlan(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };
  
  const deleteSelectedPlan = async () =>{
    try{
      for(const id of selectRowKeys){
        await deletePlan(id);
      }
      message.success('Selected Plans Deleted');
      setPlans(prev => prev.filter(client => !selectRowKeys.includes(client.id)));
      setSelectRowKeys([]);
    }catch(err){
      message.error('Failed to Delete');
    }
  };

  const handleSubmit = async (values) =>{
    try{
      if(currentPlan){
        await updatePlan(currentPlan.id, values);
        setPlans(prev => prev.map(item =>item.id === currentPlan.id ? {...item, ...values}:item
        )
      );
      message.success('Plans Updated Successfully');
      }else{
        const newPlan = await postPlan(values);
        setPlans(prev => [...prev, newPlan]);
        message.success("Plans Added Successfully");
      };
      setModalVisible(false);
    }catch(error){
      message.error('operation failed');
    }
  };
  const column = [
    {
      title : "Name",
      dataIndex:"name",
      key:'name'
    },
    {
      title: "Price",
      dataIndex:"price",
      key:'price'
    },
    {
      title:'user_limit',
      dataIndex:'user_limit',
      key:'user_limit'
    },
    {
      title:'AI_Minute',
      dataIndex:'ai_minutes',
      key:'ai_minutes'
    },
    {
      title:'Duration',
      dataIndex:'duration',
      key:'duration'
    },
    {
      title:'Update',
      key:'update',
      render:(_,record) =>(
        <Button onClick ={
          () =>handleEdit(record)}>EDIT</Button>
      )
    },
  ];
  return (
    <>
      {/* Add/edit PLAN Modal */}
      <Modal title = {currentPlan ? 'Edit Plan' :'Add Client'}
      open = {modalVisible}
      onCancel={() => setModalVisible(false)}
      footer = {null}
      >
        <AntForm form={form}
        initialValues={currentPlan || {} }
        onFinish = {handleSubmit}
        layout='vertical'
        >
          <AntForm.Item name = 'name' label = 'PLAN NAME :' rules ={[{required: true}]}>
            <Input/>
          </AntForm.Item>
          <AntForm.Item name = 'price' label = 'Price :' rules = {[{required:true}]}>
            <Input/>
          </AntForm.Item>
          <AntForm.Item name = "user_limit" label = 'Plan Status :' rules = {[{required:true}]}>
            <Input/>
          </AntForm.Item>
          <AntForm.Item name = 'ai_minutes' label ="AI_MINUTE :" rules = {[{required:true}]}>
            <Input/>
          </AntForm.Item>
          <AntForm.Item name ="duration" label ='DURATION :' rules ={[{required : true}]}>
            <Input/>
          </AntForm.Item>
          <AntForm.Item >
            <Button type='primary' htmlType='submit'>
              {currentPlan ? 'Update':'Submit'}
            </Button>
          </AntForm.Item>
        </AntForm>
      </Modal>
      {/* Deletion and other header Section front end  */}
      <Row justify='space-between' align="middle" style={{marginBottom: '1rem'}}>
        <Col>
        <h1 style = {{marginBottom: 0}}>PLANS</h1>
        <h2 style = {{marginBottom: 0}}>MANAGE YOUR PLANS FROM HERE</h2>
        </Col>
        <Col>
        <Button type='primary' onClick={handleAdd}>ADD PLANS</Button>
        </Col>
      </Row>
      {/* Delete Button */}
      <Row justify= 'start' style = {{marginBottom: '1rem'}}>
        <Col>
        <Popconfirm title = "Confirm to Delete Selected Plans" 
        onConfirm = {deleteSelectedPlan}
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
        <Spin tip = "Loading Plans...."/>
      ) : (
        <Table dataSource = {plans}
        columns={column}
        rowKey={'id'}
        rowSelection={rowSelect}
        />
      )};
    </>
  );
};

export default Plans
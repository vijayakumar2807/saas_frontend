import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, Form as AntForm, Modal,Input, message, Popconfirm } from 'antd';
import { getClients } from 'helpers/ApiHelper';
import Form  from './add_client' 
import { update } from 'immutable';
import { deleteClient, updateClient } from '../../helpers/ApiHelper';
import { keys } from 'lodash-es';
import { AlignRightOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editData, setClientEdit] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError(err.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);


//column for selecting the rows
  const rowSelect = {
    selectRowKeys,
    onChange:(keys) =>{
      setSelectRowKeys(keys);
    }
  };


  //Deleting the selected rows
  const deleteSelected = async() => {
    try{
      for(const id of selectRowKeys){
        await deleteClient(id);
      }
      message.success('Selected Clients Deleted');
      setClients(prev =>prev.filter(client =>!selectRowKeys.includes(client.id)));
      setSelectRowKeys([]);
    }catch(err){
      message.err('Failed to delete');
    }
  };


  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Contact Email',
      dataIndex: 'contact_email',
      key: 'contact_email',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'UPDATE',
      key: 'update',
      render: (_, record) =>(
        <Button onClick = {() =>{
        setClientEdit(true);
        setCurrentClient(record);
      } 
    }>EDIT</Button>
   )
    }
  ];

  return (
    <>

    <Modal title = {"Edit Client"}
    open = {editData}
    onCancel={() => setClientEdit(false)}
    footer = { null }>
      <AntForm 
        initialValues = {currentClient}
        onFinish={async(values) => {
          try {
        await updateClient(currentClient.id, values); // Your API call
        setClients(prev =>
          prev.map(item =>
            item.id === currentClient.id ? { ...item, ...values } : item
          )
        );
        setClientEdit(false);
        alert('Client updated successfully');
      } catch (err) {
        alert('Update failed');
      };
        }}
        key={currentClient?.id}>
          <AntForm.Item name = "company_name" label = "Company">
            <Input/>
          </AntForm.Item>
          <AntForm.Item name='contact_email' label = 'Mail'>
            <Input/>
          </AntForm.Item>
          <AntForm.Item name = 'industry' label = "Industry">
            <Input/>
          </AntForm.Item>
          <AntForm.Item>
            <Button type='primary' htmlType='submit'>UPDATE</Button>
          </AntForm.Item>
      </AntForm>
    </Modal>
{/* general webpage frontend */}
    <div>
      <Form/>
      <h2>Clients</h2>
      <p>Manage your clients from here.</p>

      {error && <Alert type="error" message={error} showIcon />}
      {loading ? (
        <Spin tip="Loading clients..." />
      ) : (
        <>
        <div style = {{marginBottom: '1rem', justifyContent:'end'}}>
          <Popconfirm 
          title = "Confirm To Delete The Selected CLIENTS !"
          onConfirm = {deleteSelected}
          okText = "YES"
          cancelText = "NO"
          disabled = {selectRowKeys.length === 0}>
            <Button type = "primary"
            disabled = {selectRowKeys.length === 0}>
              DELETE   
            </Button>
          </Popconfirm>
        </div>
        <Table dataSource={clients} 
        columns={columns} 
        rowKey="id" 
        rowSelection = {rowSelect} />
        </>
      )};
    </div>
    </>
  );
}

export default Clients;

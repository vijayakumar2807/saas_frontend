import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Modal, Form as AntForm , Input, Button, Popconfirm, Row, Col, Select, Checkbox} from 'antd';
import { getClients, getUsers, deleteUsers, putUsers, postUsers } from '../../helpers/ApiHelper';
 import { toast } from 'react-toastify';
import { set } from 'immutable';
import Password from 'antd/es/input/Password';
import { Tab } from '@headlessui/react';
const { Option } = Select;

function MyEmployees() {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = AntForm.useForm();
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const [search, setSearch] = useState('');

useEffect(() => {
  const fetchdata = async () => {
    try{
      const [userData, clientData] = await Promise.all([getUsers(), getClients()]);
      console.log("Users:", userData);
      console.log("Clients", clientData);
      setUsers(userData);
      setClients(clientData);
    } catch (error) {
      setError(error.error) || "Something went wrong!"
    }
    finally{
      setLoading(false);
    }
  };
  fetchdata();
}, []);

const RowSelection = {
  selectRowKeys, onChange: (keys) => setSelectRowKeys(keys),
};

const deleteSelected = async () => {
  try {
    for (const id of selectRowKeys) {
      await deleteUsers(id);
    }
    toast.success("Users deleted successfully.")
    setUsers(prev => prev.filter(client => !selectRowKeys.includes(client.id)));
    setSelectRowKeys([]);
  } catch(error) {
    toast.error("Failed to delete users!");
  }
};

const handleEdit = (record) => {
  setSelectedUsers(record);
  form.setFieldsValue(record);
  setModalVisible(true);
};

const handleAdd = () => {
  setSelectedUsers(null);
  form.resetFields();
  setModalVisible(true);
};

const handleSubmit = async (values) => {
  console.log("Form Values:", values);
  try{
  if (selectedUsers) {
    await putUsers(selectedUsers.id, values);
    setUsers(prev => prev.map(item => item.id === selectedUsers.id ? {...item, ...values} : item));
    toast.success("User updated successfully!");
  }
  else {
    const newUser = await postUsers(values);
    setUsers(prev => [...prev, newUser]);
    toast.success("User created successfully");
  }
  setModalVisible(false);
  } catch (error) {
    toast.error("Failed! Please try again!");
  }
};

const columns = [
  {
    title: 'Client',
    dataIndex: "client",
    key: 'client',
    render: (_, record) => {
      console.log("Client field:" , record.client);
      const clientobj = clients.find(c => c.id === record.client);  
      return clientobj ? clientobj.company_name : 'Unknown';
    }
  },
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'last_name',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone no.',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Is active',
    dataIndex: "is_active",
    key: "is_active",
    render: (value) => (value ? 'Yes' : 'No')
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text) => new Date(text).toLocaleString(),
  },
  {
    title: 'Update',
    key: 'update',
    render: (_, record) => (
      <Button onClick = {() => { handleEdit(record)}}> Edit </Button>
    )
    },
];

return (
   <>
   {/*Add or to Edit users*/}
  <Modal 
          title = {selectedUsers ? 'Edit User' : 'Add User'}
          open = {modalVisible}
          onCancel={() => setModalVisible(false)}
          footer = {null}
    >
      <AntForm
          form = {form}
          initialValues={selectedUsers || {}}
          onFinish={handleSubmit}
          layout='vertical'
      >
       <AntForm.Item name="client" label = "Client" rules={[{required: false}]}>
        <Select placeholder = "Select Client">  
          {clients.map(client => (
              <Option key={client.id} value={client.id}>
                  {client.company_name}
              </Option>
              ))}
        </Select>
       </AntForm.Item>
       <AntForm.Item name="first_name" label="First name" rules={[{required:true}]}>
            <Input/>
       </AntForm.Item>
       <AntForm.Item name="last_name" label="Last name">
              <Input/>
       </AntForm.Item>
       <AntForm.Item name="email" label="Email" rules={[{required: true, type: "email"}]}>
            <Input/>
       </AntForm.Item>
       <AntForm.Item name="password" label="Password" rules={[{required: true}]}>
            <Input.Password/>
        </AntForm.Item>
       <AntForm.Item name="phone" label="Phone no.">
            <Input/>
       </AntForm.Item>
       <AntForm.Item name="is_active" label="" valuePropName='checked'>
          <Checkbox>Active</Checkbox>
       </AntForm.Item>
       <AntForm.Item>
        <Button type='primary' htmlType='submit'>
            {selectedUsers ? 'Update' : 'Submit'}
        </Button>
       </AntForm.Item>
       </AntForm>
      </Modal>
      
      {/*For Adding User operation*/}
      <Row justify="space-between" align="middle" style={{marginBottom: '1rem'}}>
      <Col>
          <Button type='primary' onClick={handleAdd}>Add Users</Button>
      </Col>
      </Row>
      
      {/*For Delete confirmattion*/}
      <Row justify="start" style={{marginBottom: '1rem'}}>
      <Col>
          <Popconfirm
            title =  "Confirm User(s) Deletion"
            onConfirm={deleteSelected}
            okText = "Yes"
            cancelText = "No"
            getPopupContainer={() => document.body}
            popupStyle = {{zIndex: 1500}}
            disabled = {selectRowKeys.length === 0}>
          <Button danger disabled={selectRowKeys.length === 0}>
            Delete
          </Button>
            </Popconfirm>
      </Col>
      </Row>

      <Row style={{marginBottom: '1rem'}}>
      <Col>
      <Input.Search placeholder = "Search users..."
              allowClear
              style = {{width: 300}}
              value = {search}
              onChange = {(e) => setSearch(e.target.value)}
              enterButton
      />
      </Col>
      </Row>
      
      {error && <Alert type='error' message={error} showIcon style={{marginBottom: '1rem'}}/>} 
          {loading ? (<Spin tip="Loading clients..."/>) : 
            (<Table dataSource={users.filter((user) => {
              const Search = (search || '').toLowerCase();
              return(
                (user.first_name || '').toLowerCase().includes(Search) ||
                (user.last_name || '').toLowerCase().includes(Search) ||
                (user.email || '').toLowerCase().includes(Search)||
                (user.phone || '').toLowerCase().includes(Search)||
                (user.created_at ? new Date(user.created_at).toLocaleString() : '').toLowerCase().includes(Search)||
                (clients.find(c => c.id === user.client)?.company_name || '').
                toLowerCase().includes(Search)
              );
            })
          }
                    columns={columns}
                    rowKey="id"
                    rowSelection={RowSelection}
            />
            )}
      </>
        );
      }

export default MyEmployees;
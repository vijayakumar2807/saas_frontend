import React, { useEffect, useState } from 'react';
import {
  Table, Spin, Alert, Button,
  Form as AntForm, Modal, Input, message, Popconfirm, Row, Col
} from 'antd';
import { getClients, postClient, updateClient, deleteClient } from '../../helpers/ApiHelper';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = AntForm.useForm();
  const [currentClient, setCurrentClient] = useState(null);
  const [selectRowKeys, setSelectRowKeys] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const rowSelect = {
    selectRowKeys,
    onChange: (keys) => setSelectRowKeys(keys),
  };

  const deleteSelected = async () => {
    try {
      for (const id of selectRowKeys) {
        await deleteClient(id);
      }
      message.success('Selected clients deleted');
      setClients(prev => prev.filter(client => !selectRowKeys.includes(client.id)));
      setSelectRowKeys([]);
    } catch (err) {
      message.error('Failed to delete');
    }
  };

  const handleEdit = (record) => {
    setCurrentClient(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentClient(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentClient) {
        await updateClient(currentClient.id, values);
        setClients(prev =>
          prev.map(item =>
            item.id === currentClient.id ? { ...item, ...values } : item
          )
        );
        message.success('Client updated successfully');
      } else {
        const newClient = await postClient(values);
        setClients(prev => [...prev, newClient]);
        message.success('Client added successfully');
      }
      setModalVisible(false);
    } catch (err) {
      message.error('Operation failed');
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
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>EDIT</Button>
      ),
    },
  ];

  return (
    <>
      {/* Add/Edit Client Modal */}
      <Modal
        title={currentClient ? 'Edit Client' : 'Add Client'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <AntForm
          form={form}
          initialValues={currentClient || {}}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <AntForm.Item name="company_name" label="Company" rules={[{ required: true }]}>
            <Input />
          </AntForm.Item>
          <AntForm.Item name="contact_email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </AntForm.Item>
          <AntForm.Item name="industry" label="Industry" rules={[{ required: true }]}>
            <Input />
          </AntForm.Item>
          <AntForm.Item>
            <Button type="primary" htmlType="submit">
              {currentClient ? 'Update' : 'Submit'}
            </Button>
          </AntForm.Item>
        </AntForm>
      </Modal>

      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '1rem' }}>
        <Col>
          <h1 style={{ marginBottom: 0 }}>Clients</h1>
          <h3 style={{ marginTop: 0 }}>Manage your clients from here.</h3>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAdd}>Add Client</Button>
        </Col>
      </Row>

      {/* Delete Button */}
      <Row justify="start" style={{ marginBottom: '1rem' }}>
        <Col>
          <Popconfirm
  title="Confirm to delete selected clients?"
  onConfirm={deleteSelected}
  okText="Yes"
  cancelText="No"
  getPopupContainer={() => document.body}
  popupStyle={{ zIndex: 1500 }} 
  disabled={selectRowKeys.length === 0}
>
  <Button danger disabled={selectRowKeys.length === 0}>
    Delete
  </Button>
</Popconfirm>

        </Col>
      </Row>

      {/* Alert and Table */}
      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: '1rem' }} />}
      {loading ? (
        <Spin tip="Loading clients..." />
      ) : (
        <Table
          dataSource={clients}
          columns={columns}
          rowKey="id"
          rowSelection={rowSelect}
          
        />
      )}
    </>
  );
}

export default Clients;

import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Modal, Form, Input, Button } from 'antd';
import { getClients, updateClients, deleteClients } from '../../helpers/ApiHelper';
import ClientsForm from './client_form_data';
import { toast } from 'react-toastify';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [editClient, setEditClient] = useState(false);
  const [deleteClient, setDeleteClient] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

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

  const toggleSelection = (id) => {
    setDeleteClient((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (deleteClient.length === 0) {
      toast.warn('Please select at least one client!');
      return;
    }

    try {
      await Promise.all(deleteClient.map((id) => deleteClients(id)));
      toast.success('Client(s) deleted successfully!');
      setClients((prev) =>
        prev.filter((client) => !deleteClient.includes(client.id))
      );
      setDeleteClient([]);
    } catch (error) {
      toast.error('Failed to delete clients!');
    }
  };

  const handleDeleteClick = () => {
    if (deleteClient.length === 0) {
      toast.warn('Please select at least one client!');
      return;
    }
    setConfirmVisible(true);
  };

  const handleConfirmOk = () => {
    setConfirmVisible(false);
    deleteSelected();
  };

  const handleConfirmCancel = () => {
    setConfirmVisible(false);
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
      title: 'Update',
      key: 'update',
      render: (_, record) => (
        <Button
          onClick={() => {
            setSelectedClient(record);
            setEditClient(true);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={deleteClient.includes(record.id)}
          onChange={() => toggleSelection(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      {/* Edit Modal */}
      <Modal
        title="Edit Client"
        open={editClient}
        onCancel={() => setEditClient(false)}
        footer={null}
      >
        <Form
          initialValues={selectedClient}
          onFinish={async (values) => {
            try {
              await updateClients(selectedClient.id, values);
              setClients((prev) =>
                prev.map((item) =>
                  item.id === selectedClient.id ? { ...item, ...values } : item
                )
              );
              setEditClient(false);
              toast.success('Client updated successfully!');
            } catch (error) {
              toast.error('Client update failed!');
            }
          }}
          key={selectedClient?.id}
        >
          <Form.Item name="company_name" label="New Company Name">
            <Input />
          </Form.Item>
          <Form.Item name="contact_email" label="New Email">
            <Input />
          </Form.Item>
          <Form.Item name="industry" label="New Industry">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        title="Confirm Deletion"
        open={confirmVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure about this, fella?</p>
      </Modal>

      <div>
        <ClientsForm />
        <h2>Clients</h2>
        <p>Manage your clients from here.</p>

        {!loading && (
          <Button
            danger
            onClick={handleDeleteClick}
            disabled={deleteClient.length === 0}
            style={{ marginBottom: '1rem' }}
          >
            Delete
          </Button>
        )}

        {error && <Alert type="error" message={error} showIcon />}
        {loading ? (
          <Spin tip="Loading clients..." />
        ) : (
          <Table dataSource={clients} columns={columns} rowKey="id" />
        )}
      </div>
    </>
  );
}

export default Clients;

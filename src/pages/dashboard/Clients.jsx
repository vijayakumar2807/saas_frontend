import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { getClients } from 'helpers/ApiHelper';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    }
  ];

  return (
    <div>
      <h2>Clients</h2>
      <p>Manage your clients from here.</p>

      {error && <Alert type="error" message={error} showIcon />}
      {loading ? (
        <Spin tip="Loading clients..." />
      ) : (
        <Table dataSource={clients} columns={columns} rowKey="id" />
      )}
    </div>
  );
}

export default Clients;

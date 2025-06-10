import {UserOutlined} from '@ant-design/icons';



const icons={
  UserOutlined}

// ==============================|| MENU ITEMS - CLIENTS ||============================== //
const clients = {
  id: 'group-clients', 
    title: '',
    type: 'group',
    children: [
        {
            id: 'clients',
            title: 'Clients',
            type: 'item',
            url: '/clients',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default clients;
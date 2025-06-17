import {UserOutlined} from '@ant-design/icons';



const icons={
  UserOutlined}

// ==============================|| MENU ITEMS - CLIENTS ||============================== //
const leads = {
  id: 'group-clients', 
    title: '',
    type: 'group',
    children: [
        {
            id: 'leads',
            title: 'leads',
            type: 'item',
            url: '/leads',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default leads;
import{UsergroupAddOutlined} from '@ant-design/icons'

const icons={
  UsergroupAddOutlined
}

// ==============================|| MENU ITEMS - USERS ||============================== //


const users = {
  id: 'users',
  title: '',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    }
  ]
};

export default users;
// icons
import { FileTextOutlined } from '@ant-design/icons';

const icons = {
  FileTextOutlined
};

// ==============================|| MENU ITEMS - PLANS ||============================== //
const plans = {
  id: 'group-plans',
  title: '',
  type: 'group',
  children: [
    {
      id: 'plans',
      title: 'Plans',
      type: 'item',
      url: '/plans',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    }
  ]
};

export default plans;

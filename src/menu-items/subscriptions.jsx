// icons
import { CreditCardOutlined } from '@ant-design/icons';

const icons = {
  CreditCardOutlined
};

// ==============================|| MENU ITEMS - SUBSCRIPTIONS ||============================== //
const subscriptions = {
  id: 'group-subscriptions',
  title: '',
  type: 'group',
  children: [
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      type: 'item',
      url: '/subscriptions',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    }
  ]
};

export default subscriptions;

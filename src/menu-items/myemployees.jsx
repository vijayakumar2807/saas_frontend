//Using Phosphor icon
import { IdentificationBadge } from 'phosphor-react';
import { Children } from 'react';

const My_Employees = {
    id: 'group-myemployees',
    title: 'Employees',
    type: 'group',
    children: [
        {
            id: 'myemployees',
            title: 'My Employees',
            type: 'item',
            url: '/myemployees',
            icon: () => <IdentificationBadge size={22} color='#053165' weight='regular' />,
            breadcrumbs: false 
        }
    ]
}

export default My_Employees;
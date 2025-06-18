//Using Phosphor icon
import { NotePencil } from 'phosphor-react';
import { Children } from 'react';

const My_Plans = {
    id: 'group-myplans',
    title: '',
    type: 'group',
    children: [
        {
            id: 'myplans',
            title: 'My Plans',
            type: 'item',
            url: '/myplans',
            icon: () => <NotePencil size={22} color='#053165' weight='regular' />,
            breadcrumbs: false 
        }
    ]
}

export default My_Plans;
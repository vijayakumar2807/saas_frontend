// import { PhosphorLogo } from "phosphor-react"
import { Breadcrumb } from "antd";
import { IdentificationBadge } from "phosphor-react"
const icon ={
    IdentificationBadge,
};
//=======================|| menu ||=============//
const myemployee = {
    id: 'myemployee',
    title:'Employee Management',
    type:'group',
    children: [
        {
            id:'myemployee',
            title:'Employee',
            type:'item',
            url:'/myemployee',
            icon:() => <icon.IdentificationBadge size={22} color="#053165" weight = 'regular' />,
            breadcrumbs: false,
        }
    ]
};
export default myemployee ;
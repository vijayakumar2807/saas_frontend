// import { PhosphorLogo } from "phosphor-react"
import { Breadcrumb } from "antd";
import { User } from "phosphor-react"
const icon ={
    User
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
            icon: icon.User,
            breadcrumbs: false,
        }
    ]
};
export default myemployee ;
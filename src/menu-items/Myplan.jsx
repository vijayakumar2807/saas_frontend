import { Breadcrumb } from "antd";
import { Strategy } from "phosphor-react";
const icon = {
    Strategy
};
//========================|| Menu List ||======================//
const MyPlan = {
    id: 'my-subscriptions',
    title: '',
    type:'group',
    children: [
        {
            id:'my-subscriptions',
            title:'My Plan',
            type:'item',
            url:'/my-subscriptions',
            icon: () => <icon.Strategy size={22} color="#053165" weight = 'regular'/>,
            breadcrumbs: false,
        }
    ]
};
export default MyPlan ;
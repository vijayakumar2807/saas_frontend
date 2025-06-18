import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PrivateRoute from 'routes/PrivateRoute';



// Pages
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Clients = Loadable(lazy(() => import('pages/dashboard/clients')));
const Users = Loadable(lazy(() => import('pages/dashboard/User')));
const Plans = Loadable(lazy(() => import('pages/dashboard/Plans')));
const Subscription = Loadable(lazy(() => import('pages/dashboard/Subscription')));
const Leads = Loadable(lazy(() => import('pages/dashboard/Leads')));
const MyEmployee = Loadable(lazy(() => import ('pages/dashboard/myemployees')));
const MainRoutes = {
  path: '/',
  element: <PrivateRoute />, // 👈 Protect all child routes
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <DashboardDefault />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: '',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'clients',
          element: <Clients />
        },
        {
          path:'users',
          element:<Users />
        },
        {
          path:"plans",
          element:<Plans />
        },
        {
          path: 'subscription',
          element: <Subscription />
        },
        {
          path:'leads',
          element:<Leads/>
        },
        {
          path:'myemployee',
          element:<MyEmployee/>
        },
       
      
      ]
    }
  ]
};

export default MainRoutes;

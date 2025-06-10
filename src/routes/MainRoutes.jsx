import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PrivateRoute from 'routes/PrivateRoute';

// Pages
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Clients = Loadable(lazy(() => import('pages/dashboard/clients')));

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
        }
      ]
    }
  ]
};

export default MainRoutes;

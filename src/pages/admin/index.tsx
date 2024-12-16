import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../../components/Layout';
import { adminRoutes } from '../../utils/adminRoutes';

const AdminHomePage: React.FC = () => {
  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <ul>
        {adminRoutes.map((route: { path: string; name: string }) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AdminHomePage;

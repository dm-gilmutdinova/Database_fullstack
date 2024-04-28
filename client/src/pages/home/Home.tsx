import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout';

export const Home = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <Link to='/'>Employees</Link>
    </Layout>
  );
};

import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout.js';

const ApiTest = (props) => (
  <Layout>
    {props.data.map((item) => <p key={item.code}>{item.name}</p>)}
  </Layout>
);

ApiTest.getInitialProps = async function ({ req }) {
  // console.clear();

  const host = 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  console.log(`${protocol}://${host}/api`);
  const res = await fetch(`${protocol}://${host}/api`);

  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    data,
  };
};


export default ApiTest;

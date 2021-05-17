import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HomeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HomeProvider>
  );
}

export default MyApp;

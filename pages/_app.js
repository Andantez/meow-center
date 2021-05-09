import Layout from '../components/Layout';
import ContextProvider from '../context/home_context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;

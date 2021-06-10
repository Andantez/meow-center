import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';
import FiltersContextProvider from '../context/filters_context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HomeProvider>
      <FiltersContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FiltersContextProvider>
    </HomeProvider>
  );
}

export default MyApp;

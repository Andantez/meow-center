import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';
import FiltersContextProvider from '../context/filters_context';
import { SWRConfig } from 'swr';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HomeProvider>
      <FiltersContextProvider>
        <SWRConfig
          value={{
            fetcher: (...args) => fetch(...args).then((res) => res.json()),
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </FiltersContextProvider>
    </HomeProvider>
  );
}

export default MyApp;

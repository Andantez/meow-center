import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';
import FiltersContextProvider from '../context/filters_context';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <HomeProvider>
      <FiltersContextProvider>
        <SWRConfig
          value={{
            fetcher: (url) =>
              fetch(url, {
                headers: {
                  'x-api-key': process.env.X_API_KEY,
                },
              }).then((res) => res.json()),
          }}
        >
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </Layout>
        </SWRConfig>
      </FiltersContextProvider>
    </HomeProvider>
  );
}

export default MyApp;

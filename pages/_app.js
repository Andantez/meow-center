import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';
import FiltersContextProvider from '../context/filters_context';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
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
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </FiltersContextProvider>
      </HomeProvider>
    </SessionProvider>
  );
}

export default MyApp;

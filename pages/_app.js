import Layout from '../components/Layout';
import HomeProvider from '../context/home_context';
import FiltersContextProvider from '../context/filters_context';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner';
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
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </SWRConfig>
        </FiltersContextProvider>
      </HomeProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!isUser) router.push('/account'); // If not authenticated, redirect
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Spinner />;
}
export default MyApp;

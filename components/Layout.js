import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHomeContext } from '../context/home_context';

const Layout = ({ children }) => {
  const router = useRouter();
  const { closeSidebar, hideDropdown} = useHomeContext();

  useEffect(() => {
    const handleRouterChange = () => {
      closeSidebar();
      hideDropdown();
    }
    router.events.on('routeChangeStart', handleRouterChange);

    return () => {
      router.events.off('routeChangeStart', handleRouterChange);
    }
  },[])
  return (
    <>
      <Head>
        <title>Meow Portal</title>
        <meta
          name="description"
          content="Learn more about your cat breed, some interesting facts about cats and browse the gallery with hundreds of pictures"
        />
      </Head>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

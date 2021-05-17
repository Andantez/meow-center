import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
const Layout = ({ children }) => {
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

import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Meow-Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1>Meow</h1>
    </div>
  );
}
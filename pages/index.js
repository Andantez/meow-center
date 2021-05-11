import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';

export default function Home() {
  return (
    <>
      <Head>
        <title>Meow Portal - Learn More About Your Cat Breed</title>
      </Head>
      <Hero />
      <MostPopular />
    </>
  );
}

import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Head>
          <title>Meow Portal - Learn More About Your Cat Breed</title>
        </Head>
      </main>
    </>
  );
}

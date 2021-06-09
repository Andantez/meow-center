import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
import { connectToDatabase } from '../utils/mongodb';

export default function Home({ isConnected }) {
  console.log(isConnected)
  return (
    <>
      <Head>
        <title>Meow Portal - Learn More About Your Cat Breed</title>
      </Head>
      <Hero />
      <MostPopular />
      <Facts />
    </>
  );
}

export const getStaticProps = async () => {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
};

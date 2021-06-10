import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
// import { connectToDatabase } from '../utils/mongodb';

export default function Home({ mostPopularBreeds }) {
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

// commented out ot reduce request calls
// export const getStaticProps = async () => {
//   const { db } = await connectToDatabase();
//   const mostPopularBreeds = await db.collection('mostpopular').find().sort({score: -1, breeId: 1}).limit(10).toArray();
//   return {
//     props: { mostPopularBreeds: JSON.parse(JSON.stringify(mostPopularBreeds)) },
//   };
// };

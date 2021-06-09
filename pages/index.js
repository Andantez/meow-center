import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
// import { connectToDatabase } from '../utils/mongodb';

export default function Home() {
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

// export const getStaticProps = async () => {
//   const { db } = await connectToDatabase();
//   const insertedResponse = await db.collection('mostpopular').findOneAndUpdate(
//     { breedId: 'abys' },
//     { $inc: { score: 1 } },
//     {
//       returnOriginal: false,
//       projection: {
//         name: 1,
//         score: 1,
//       },
//     }
//   );

//   return {
//     props: { insertedResponse: JSON.parse(JSON.stringify(insertedResponse)) },
//   };
// };

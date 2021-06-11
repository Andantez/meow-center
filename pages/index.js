import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
import useSWR from 'swr';
// import { connectToDatabase } from '../utils/mongodb';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ mostPopularBreeds, facts }) {
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_FACTS_URI}?limit=3&max_length=200`,
    fetcher,
    { revalidateOnFocus: false, initialData: facts }
  );

  return (
    <>
      <Head>
        <title>Meow Portal - Learn More About Your Cat Breed</title>
      </Head>
      <Hero />
      <MostPopular />
      <Facts facts={data} mutate={mutate} />
    </>
  );
}

// commented out ot reduce request calls
export const getStaticProps = async () => {
  // const { db } = await connectToDatabase();
  // const mostPopularBreeds = await db.collection('mostpopular').find().sort({score: -1, breeId: 1}).limit(10).toArray();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FACTS_URI}?limit=3&max_length=200`
  );
  const factsData = await response.json();
  return {
    // to be changed to return data from db too
    // props: { mostPopularBreeds: JSON.parse(JSON.stringify(mostPopularBreeds)) },
    props: { facts: factsData },
    revalidate: 1800,
  };
};

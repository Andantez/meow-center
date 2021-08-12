import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
import useSWR from 'swr';
// import { connectToDatabase } from '../utils/mongodb';
import { useHomeContext } from '../context/home_context';
import { useEffect } from 'react';
import { useRouterScroll } from '@moxy/next-router-scroll';
import { motion } from 'framer-motion';

export default function Home({ mostPopularBreeds, facts, breeds }) {
  const { data, mutate, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_FACTS_URI}?limit=3&max_length=200`,
    { revalidateOnFocus: false, initialData: facts }
  );
  const { setData } = useHomeContext();
  const { updateScroll } = useRouterScroll();

  useEffect(() => {
    updateScroll();
  }, []);

  useEffect(() => {
    setData(breeds);
  }, []);
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Head>
        <title>Meow Portal - Learn More About Your Cat Breed</title>
      </Head>
      <Hero />
      <MostPopular />
      <Facts facts={data} mutate={mutate} isValidating={isValidating} />
    </motion.div>
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

  const breedsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/breeds`,
    {
      headers: {
        'x-api-key': process.env.X_API_KEY,
      },
    }
  );
  const breedsData = await breedsResponse.json();

  return {
    // to be changed to return data from db too
    // props: { mostPopularBreeds: JSON.parse(JSON.stringify(mostPopularBreeds)) },
    props: { facts: factsData, breeds: breedsData },
    revalidate: 1800,
  };
};

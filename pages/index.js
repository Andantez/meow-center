import Head from 'next/head';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import Facts from '../components/Facts';
import { useHomeContext } from '../context/home_context';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPlaiceholder } from 'plaiceholder';
import imgPaths from '../data/imagePaths';
import clientPromise from '../utils/mongodb';

export default function Home({ mostPopularBreeds, facts, breeds, images }) {
  const { setData } = useHomeContext();

  useEffect(() => {
    setData(breeds);
  }, []);

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Head>
        <title>Meow Portal - Learn More About Your Cat Breed</title>
      </Head>
      <Hero frontHeroImg={images[0]} backHeroImg={images[1]} />
      <MostPopular mostPopularBreeds={mostPopularBreeds} />
      <Facts facts={facts} images={images} />
    </motion.div>
  );
}

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const dbBreedData = await db
    .collection('mostpopular')
    .find()
    .sort({ score: -1, breeId: 1 })
    .limit(10)
    .toArray();

  //  fetch facts from api
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FACTS_URI}?limit=3&max_length=200`
  );
  const factsData = await response.json();
  // ----------------------------------

  // get all breeds data from API
  const breedsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/breeds`,
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
      },
    }
  );
  const breedsData = await breedsResponse.json();
  // --------------

  //  generate base64 data URL  static images.
  const images = await Promise.all(
    imgPaths.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src);

      return {
        ...img,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  // generate and add base64 data url property and src to mostpopular breeds data.
  const mostPopularBreeds = await Promise.all(
    dbBreedData.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src.image);
      const { breedId, description, name, score } = src;
      return {
        ...img,
        blurDataURL: base64,
        breedId,
        description,
        name,
        score,
      };
    })
  ).then((values) => values);

  if (factsData.code === 404 || !breedsData || !images || !mostPopularBreeds) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      facts: factsData,
      breeds: breedsData,
      images,
      mostPopularBreeds: JSON.parse(JSON.stringify(mostPopularBreeds)),
    },
    revalidate: 60,
  };
};

import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

const BreedDetails = ({ breed, images }) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <h2>Loading......</h2>;
  }
  const mainImage = images[0].url; //temporary

  const {
    name,
    id: breedId,
    description,
    temperament,
    adaptability,
    affection_level,
    child_friendly,
    energy_level,
    grooming,
    health_issues,
    social_needs,
    intelligence,
    stranger_friendly,
    hypoallergenic,
    life_span,
    weight: { metric: weight },
    wikipedia_url,
  } = breed;

  return (
    <StyledSection>
      <Head>
        <title>{id} | Meow Portal</title>
      </Head>
      {name}
    </StyledSection>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  // gets the breed data
  const breedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/search?breed_id=${id}&limit=8&order=ASC`,
    {
      headers: {
        'x-api-key': process.env.X_API_KEY,
      },
    }
  );

  const data = await breedResponse.json();

  const breed = data[0].breeds[0];

  // get the images
  const images = data.map((breed) => {
    const { url, id } = breed;
    return { url, id };
  });

  return {
    props: {
      breed,
      images,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const StyledSection = styled.section``;

export default BreedDetails;

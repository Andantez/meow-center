import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCharacteristics } from '../../utils/helpers';
import Score from '../../components/Score';
const BreedDetails = ({ breed, images }) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <h2>Loading......</h2>;
  }

  const mainImage = images[0].url; //temporary
  const { name, id: breedId, description, temperament, wikipedia_url } = breed;
  const characteristics = getCharacteristics(breed);
  return (
    <StyledSection>
      <Head>
        <title>{name} | Meow Portal</title>
      </Head>
      <div className="container">
        <div className="mobile-img">
          <Image src={mainImage} alt={name} width="450" height="350" />
        </div>
        <div className="details">
          <h1>{name}</h1>
          <article>
            <p>{description}</p>
            <div className="temperament">
              <p>Temperament:</p>
              <p>{temperament}</p>
            </div>
            <div className="characteristics">
              {characteristics.map((characteristic) => {
                const { characteristic: char, value } = characteristic;
                return (
                  <div key={char}>
                    <p>{char}:</p>
                    <Score characteristic={characteristic} score={value} />
                  </div>
                );
              })}
            </div>
          </article>
        </div>
        <div className="gallery">
          <div className="img-container">
            <Image src={mainImage} alt={name} width="600" height="600" />
          </div>
          <div className="carousel">
            {images.slice(0, 3).map((image) => {
              return (
                <Image
                  src={image.url}
                  key={image.id}
                  width="150"
                  height="150"
                />
              );
            })}
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  // gets the breed data
  // const breedResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/search?breed_id=${id}&limit=8&order=ASC`,
  //   {
  //     headers: {
  //       'x-api-key': process.env.X_API_KEY,
  //     },
  //   }
  // );

  // const data = await breedResponse.json();

  // const breed = data[0].breeds[0];

  // get the images
  // const images = data.map((breed) => {
  //   const { url, id } = breed;
  //   return { url, id };
  // });

  // temporary to minimize the api call.
  const temporaryBreedImages = [
    {
      url: 'https://cdn2.thecatapi.com/images/j6oFGLpRG.jpg',
      id: 'j6oFGLpRG',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/rw09G0crt.jpg',
      id: 'rw09G0crt',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/Y4YIOqGKb.jpg',
      id: 'Y4YIOqGKb',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/SpioNJPsd.jpg',
      id: 'SpioNJPsd',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/qinVu0VLV.jpg',
      id: 'qinVu0VLV',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/iY76694gN.jpg',
      id: 'iY76694gN',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/ZSV_8HqoS.jpg',
      id: 'ZSV_8HqoS',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/3-DZDkDGa.jpg',
      id: '3-DZDkDGa',
    },
  ];
  const temporaryBreedData = {
    weight: { imperial: '6 - 15', metric: '3 - 7' },
    id: 'char',
    name: 'Chartreux',
    cfa_url: 'http://cfa.org/Breeds/BreedsCJ/Chartreux.aspx',
    vetstreet_url: 'http://www.vetstreet.com/cats/chartreux',
    vcahospitals_url:
      'https://vcahospitals.com/know-your-pet/cat-breeds/chartreux',
    temperament: 'Affectionate, Loyal, Intelligent, Social, Lively, Playful',
    origin: 'France',
    country_codes: 'FR',
    country_code: 'FR',
    description: `The Chartreux is generally silent but communicative. Short play sessions, mixed with naps and meals are their perfect day. Whilst appreciating any attention you give them, they are not demanding, content instead to follow you around devotedly, sleep 
on your bed and snuggle with you if you’re not feeling well.`,
    life_span: '12 - 15',
    indoor: 0,
    lap: 1,
    alt_names: '',
    adaptability: 5,
    affection_level: 5,
    child_friendly: 4,
    dog_friendly: 5,
    energy_level: 2,
    grooming: 1,
    health_issues: 2,
    intelligence: 4,
    shedding_level: 3,
    social_needs: 5,
    stranger_friendly: 5,
    vocalisation: 1,
    experimental: 0,
    hairless: 0,
    natural: 0,
    rare: 0,
    rex: 1,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: 'https://en.wikipedia.org/wiki/Chartreux',
    hypoallergenic: 1,
    reference_image_id: 'j6oFGLpRG',
  };

  return {
    props: {
      breed: temporaryBreedData,
      images: temporaryBreedImages,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const StyledSection = styled.section`
  width: 90vw;
  margin: 0 auto;

  .container {
    margin-top: 3em;
  }
  .gallery {
    display: none;
  }

  .temperament {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1em;
  }

  .characteristics {
    display: grid;
    /* grid-template-columns: 1fr 1fr; */
    /* gap: 1em; */
    gap: 0.5em;
  
    p {
      text-transform: capitalize;
    }
    & > div {
      display: grid;
      grid-template-columns: 0.5fr 1fr;
      /* gap: 1em; */
    }
  }
`;

export default BreedDetails;

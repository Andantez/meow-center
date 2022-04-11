import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import clientPromise from '../utils/mongodb';

const MostPopular = ({ mostPopularBreeds }) => {
  return (
    <StyledDiv exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Head>
        <title>Most Popular | Meow Portal</title>
      </Head>
      <h1>top 10 most popular breeds</h1>
      <section>
        {mostPopularBreeds.map((breed, index) => {
          const { breedId, name, description, src, blurdDataURL } = breed;
          return (
            <div key={breedId} className="background">
              <div className="content">
                <div className="img-container">
                  <Image
                    src={src}
                    width="450"
                    height="400"
                    placeholder="blur"
                    blurDataURL={blurdDataURL}
                  />
                </div>
                <div className="info">
                  <p className="title">
                    <span>{index + 1}.</span>
                    {name}
                  </p>
                  <p className="description">{description.slice(0, 200)}...</p>
                  <Link href={`/breeds/${breedId}`}>
                    <a>Learn More →</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </StyledDiv>
  );
};

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // fetch most popular breeds from db
  const breedsData = await db
    .collection('mostpopular')
    .find()
    .sort({ score: -1, breeId: 1 })
    .limit(10)
    .toArray();

  //  generate base64 blurDataURL for all images.
  const mostPopularBreeds = await Promise.all(
    breedsData.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src.image);
      const { name, description, score, breedId } = src;

      return {
        ...img,
        blurdDataURL: base64,
        name,
        description,
        score,
        breedId,
      };
    })
  ).then((values) => values);

  return {
    props: {
      mostPopularBreeds: JSON.parse(JSON.stringify(mostPopularBreeds)),
    },
    revalidate: 60,
  };
};

const StyledDiv = styled.div`
  max-width: 1200px;
  width: 90vw;
  margin: 3em auto;

  section {
    display: grid;
    gap: 2em;
    margin-top: 3em;
  }
  h1 {
    font-size: 2.25rem;
    font-family: var(--ff-heading);
    text-transform: capitalize;
    color: var(--clr-primary-500);
    text-align: center;
  }
  .content {
    display: grid;
    gap: 1em;
    margin-top: -2em;
  }
  .background {
    padding: 1em;
    border-radius: 0.5em;
    background: var(--clr-primary-500);
  }

  .img-container > div {
    border-radius: 0.5em;
    box-shadow: 1px 2px 5px var(--clr-black);
  }
  .img-container {
    place-self: center;
    display: flex;
  }
  .info {
    background-color: var(--clr-secondary-500);
    display: grid;
    gap: 0.5em;
    padding: 1.5em 1em;
    border-radius: 0.5em;
    font-family: var(--ff-paragraph);
    a {
      color: var(--clr-black);
      font-weight: var(--fw-bold);
      display: flex;
      align-items: center;
      margin-top: 0.5em;
      transition: color 250ms ease;
      width: max-content;
      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  .title,
  .description {
    color: var(--clr-primary-500);
  }
  .title {
    font-weight: var(--fw-bold);
    font-size: 1.5rem;
  }
  .description {
    letter-spacing: 0.5px;
    line-height: 1.3;
  }

  @media (min-width: 768px) {
    margin-top: 5em;
    section {
      margin-top: 5em;
    }
    .content {
      grid-template-columns: auto 1fr;
      margin-top: 0;
      margin-left: -2em;
    }

    .background {
      margin-left: 1em;
    }

    .img-container {
      max-width: 250px;
    }
    .info a {
      margin-top: 0;
    }
  }

  @media (min-width: 1024px) {
    section {
      max-width: 900px;
      margin: 5em auto 0;
    }
  }
`;
export default MostPopular;

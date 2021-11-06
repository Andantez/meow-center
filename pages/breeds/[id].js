import Head from 'next/head';
import styled from 'styled-components';
import router, { useRouter } from 'next/router';
import Image from 'next/image';
import { getCharacteristics } from '../../utils/helpers';
import Score from '../../components/Score';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { motion } from 'framer-motion';
import Spinner from '../../components/Spinner';
import { getPlaiceholder } from 'plaiceholder';

const BreedDetails = ({ breed, images }) => {
  const { isFallback } = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [imgList, setImageList] = useState([]);
  const [breedData, setBreedData] = useState({});
  const [characteristics, setCharacteristics] = useState();

  useEffect(() => {
    if (!isFallback) {
      setBreedData(breed);
      setCharacteristics(getCharacteristics(breed));
      setImageList(images);
    }
  }, [isFallback, breed, images]);

  // commented to reduce requests.
  useEffect(() => {
    if (!isFallback) {
      const { id, name, description } = breedData;
      const breed = {
        breedId: id,
        name,
        description,
        image: images[0].src,
      };
      const updateMostPopular = async () => {
        fetch('/api/updateMostPopular', {
          method: 'POST',
          body: JSON.stringify(breed),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      };

      updateMostPopular();
    }
  }, [breedData]);

  if (isFallback) {
    return <Spinner />;
  }

  return (
    <StyledSection>
      <Head>
        <title>{breedData.name} | Meow Portal</title>
      </Head>
      <div className="container">
        <div className="mobile-img-container">
          {imgList.length > 0 && (
            <CarouselProvider
              naturalSlideWidth={700}
              naturalSlideHeight={500}
              totalSlides={imgList.length}
              className="mobile-img"
              infinite
              step={1}
              visibleSlides={1}
            >
              <Slider className="mobile-slider-container">
                {imgList.map((img, index) => {
                  const { id, src, blurDataURL } = img;
                  return (
                    <Slide index={index} key={id} className="mobile-slide">
                      <div className="mobile-img-wrapper">
                        <Image
                          src={src}
                          alt={breedData.name}
                          width="700"
                          height="500"
                          priority={true}
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                        />
                      </div>
                    </Slide>
                  );
                })}
              </Slider>
              <ButtonBack className="prev-slide" disabled={imgList.length <= 1}>
                <FaChevronLeft />
              </ButtonBack>
              <ButtonNext className="next-slide" disabled={imgList.length <= 1}>
                <FaChevronRight />
              </ButtonNext>
              <div>
                <DotGroup
                  className={`dot-group ${imgList.length <= 1 && 'hidden'}`}
                />
              </div>
            </CarouselProvider>
          )}
        </div>
        <div className="details">
          <h1>{breedData.name}</h1>
          <article>
            <p>{breedData.description}</p>
            <div className="temperament">
              <p className="title">Temperament:</p>
              <p>{breedData.temperament}</p>
            </div>
            {characteristics && (
              <div className="characteristics">
                {characteristics.map((characteristic) => {
                  const { characteristic: char, value } = characteristic;
                  return (
                    <div key={char} className="single-char">
                      <p className="title">{char}:</p>
                      <Score characteristic={characteristic} score={value} />
                    </div>
                  );
                })}
              </div>
            )}
          </article>
          <p className="wiki-link">
            more information on {breedData.name}{' '}
            <a
              href={breedData.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>{' '}
            page.
          </p>
        </div>
        <div className="gallery">
          <div className="img-container">
            {imgList.length > 0 && (
              <Image
                src={imgList[imgIndex].src}
                alt={breedData.name}
                width="600"
                height="600"
                priority={true}
                placeholder="blur"
                blurDataURL={imgList[imgIndex].blurDataURL}
              />
            )}
          </div>
          <div>
            <CarouselProvider
              naturalSlideWidth={200}
              // naturalSlideHeight={175}
              totalSlides={imgList.length}
              orientation="horizontal"
              step={4}
              dragStep={4}
              visibleSlides={4}
              infinite
              isIntrinsicHeight={true}
              className="carousel-wrapper"
            >
              <Slider className="sliders-wrapper" moveThreshold={0.4}>
                {imgList.map((image, index) => {
                  const { id, src, blurDataURL } = image;
                  return (
                    <Slide
                      key={id}
                      index={index}
                      className="single-slide"
                      onClick={() => setImgIndex(index)}
                    >
                      <div
                        className={`${
                          index === imgIndex
                            ? 'active img-wrapper'
                            : 'img-wrapper'
                        }`}
                      >
                        <Image
                          src={src}
                          width="200"
                          height="200"
                          layout="responsive"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                        />
                      </div>
                    </Slide>
                  );
                })}
              </Slider>
              <ButtonBack className="prev" disabled={imgList.length <= 4}>
                <FaChevronLeft />
              </ButtonBack>
              <ButtonNext className="next" disabled={imgList.length <= 4}>
                <FaChevronRight />
              </ButtonNext>
            </CarouselProvider>
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        <motion.button
          onClick={() => router.back()}
          type="button"
          className="back-btn"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: '#4a4a64' }}
        >
          Back
        </motion.button>
      </div>
    </StyledSection>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  // gets the breed data
  const breedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/images/search?breed_id=${id}&limit=12&order=ASC`,
    {
      headers: {
        'x-api-key': process.env.X_API_KEY,
      },
    }
  );
  const data = await breedResponse.json();

  const breed = data[0].breeds[0];

  const images = await Promise.all(
    data.map(async (breed) => {
      const { url, id } = breed;
      const { base64, img } = await getPlaiceholder(url);

      return {
        ...img,
        id,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      breed,
      images,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const StyledSection = styled.section`
  width: 90vw;
  margin: 0 auto;
  max-width: 1200px;
  .container {
    margin: 3em auto 0;
    display: grid;
    gap: 1em;
  }
  .img-container > div,
  .mobile-img > div {
    border-radius: 0.5em;
  }

  .details {
    p {
      font-family: var(--ff-paragraph);
    }

    h1 {
      font-family: var(--ff-heading);
      text-align: center;
      color: var(--clr-primary-500);
      font-size: 2.25rem;
    }

    article {
      display: grid;
      gap: 1em;
      color: var(--clr-primary-400);
      margin-top: 1em;
    }
  }

  .title {
    font-weight: var(--fw-bold);
    color: var(--clr-primary-500);
  }

  .temperament {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
  }

  .img-container {
    display: none;
  }

  .characteristics {
    display: grid;
    gap: 1em;

    p {
      text-transform: capitalize;
    }
    & > div {
      display: grid;
      grid-template-columns: 0.5fr 1fr;
    }
  }
  .single-char:nth-child(-n + 4),
  .temperament {
    gap: 0.5em;
  }

  .single-char:nth-child(n + 5) {
    grid-template-columns: 1fr;
    gap: 0.5em;
  }

  .prev,
  .next {
    display: none;
  }

  .prev:disabled,
  .next:disabled {
    pointer-events: none;
    opacity: 0;
  }

  .active > div {
    border: 2px solid var(--clr-grey);
  }

  .wiki-link {
    font-size: 0.875rem;
    text-transform: capitalize;
    text-align: center;
    margin: 3em 0 2em;
    a {
      color: var(--clr-black);
      font-weight: var(--fw-bold);
      text-decoration: underline;
      letter-spacing: 1px;
    }
  }

  .indicators {
    position: relative;
    margin: 0.5em auto 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25em;

    span {
      height: 1em;
      background-color: var(--clr-lightgrey);
      width: 1em;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.8;
    }
  }
  span.active-img {
    background-color: var(--clr-grey);
    opacity: 1;
  }

  .mobile-img {
    position: relative;
    text-align: center;
  }

  .prev-slide,
  .next-slide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--clr-grey);

    svg {
      font-size: 1.75rem;
    }
  }

  .prev-slide {
    left: 0.25em;
  }
  .next-slide {
    right: 0.25em;
  }
  .gallery {
    display: none;
  }
  .img-wrapper > div {
    vertical-align: middle;
    border-radius: 0.5em;
  }
  .img-wrapper {
    border-radius: 0.5em;
  }

  .single-slide {
    padding: 0 0.5em;

    &:hover {
      cursor: pointer;
    }
  }
  .carousel-wrapper {
    position: relative;
  }
  .sliders-wrapper {
    border-radius: 0.5em;
    overflow: hidden;
  }
  .mobile-slider-container {
    border-radius: 0.5em;
  }

  .dot-group {
    display: flex;
    justify-content: center;
    margin-top: 1em;
    button {
      width: 0.75em;
      height: 0.75em;
      border-radius: 50%;
      border: transparent;
      background-color: var(--clr-lightgrey);
      opacity: 0.6;
    }

    button:not(:last-child) {
      margin-right: 0.5em;
    }
    .carousel__dot--selected {
      background-color: var(--clr-grey);
      opacity: 1;
    }
  }
  .hidden {
    /* display: none; */
    opacity: 0;
    pointer-events: none;
  }
  .btn-wrapper {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    gap: 5em; */
    /* margin-top: 1em; */
    margin-bottom: 3em;
  }
  .back-btn {
    color: var(--clr-secondary-500);
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    font-size: 0.8125em;
    letter-spacing: 1px;
    text-transform: capitalize;
    display: block;
    padding: 1em 3em;
    transform: translateX(0);
    background: var(--clr-primary-500);
    border: none;
    border-radius: 0.25em;
    box-shadow: 1px 2px 5px 0 var(--clr-black);
    cursor: pointer;
    /* grid-column: 2;
     */
    place-self: center;
  }
  @media (min-width: 768px) {
    .characteristics {
      grid-template-columns: 1fr 1fr;
      gap: 1.5em;
    }
  }

  .hide {
    display: none !important;
  }
  .prev-slide:disabled,
  .next-slide:disabled {
    display: none;
  }
  @media (min-width: 1024px) {
    .indicators,
    .prev-slide,
    .next-slide {
      display: none;
    }

    .container {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5em;
    }
    .characteristics {
      grid-template-columns: 1fr 1fr;
    }
    .gallery {
      display: block;
      grid-row: 1;
      grid-column: 1;
    }

    .prev,
    .next {
      display: inline-block;
      width: 2em;
      height: 2em;
      border: transparent;
      background-color: transparent;
      opacity: 0.4;
      display: grid;
      place-items: center;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      cursor: pointer;
      transition: opacity 250ms ease;

      &:hover {
        opacity: 1;
      }
      svg {
        font-size: 1.75rem;
        color: var(--clr-grey);
      }
    }

    .prev {
      left: -1.5em;
    }

    .next {
      right: -1.5em;
    }

    .btn-wrapper {
      margin-top: 1em;
    }

    .mobile-img-container {
      display: none;
    }
    .img-container {
      display: block;
      margin-bottom: 2em;
    }
  }

  @media (min-width: 1200px) {
    .mobile-img-container {
      display: none;
    }

    .mobile-img {
      display: none;
    }
    .img-container {
      display: block;
    }

    .gallery {
      max-width: 600px;
      place-self: center;
      grid-column: 1 / span 1;
      grid-row: 1;
    }
    .carousel-wrapper {
      margin-top: 2em;
    }

    .wiki-link {
      margin: 4em 0 2em;
    }
    .btn-wrapper {
      grid-template-columns: repeat(2, 1fr);
      gap: 5em;
      margin-top: 0.5em;
    }
    .back-btn {
      grid-column: 2;
    }
  }
`;

export default BreedDetails;

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
import {
  fadeInDown,
  fadeInAndUp,
  stagger,
  fadeIn,
} from '../../variants/animationVariants';
import DetailsSkeleton from '../../components/Loading';


const BreedDetails = ({ breed, images }) => {
  const { isFallback } = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [imgList, setImageList] = useState([]);
  const [breedData, setBreedData] = useState({});
  const [characteristics, setCharacteristics] = useState();
  const [[fromIndex, toIndex], setFromIndexToIndex] = useState([0, 3]);

  // commented one until make sure it works fine like it is.
  // if (router.isFallback) {
  //   return <h2>Loading......</h2>;
  // }
  // const { url: mainImage } = imgList[imgIndex];
  // const { name, id: breedId, description, temperament, wikipedia_url } = breed;
  // const characteristics = getCharacteristics(breed);

  useEffect(() => {
    if (!isFallback) {
      setBreedData(breed);
      setCharacteristics(getCharacteristics(breed));
      setImageList(images);
    }
  }, [isFallback, breed, images]);

  // commented to reduce requests.
  // useEffect(() => {
  //   const breedData = {
  //     breedId,
  //     name,
  //     description,
  //     image: images[0].url,
  //   };
  //   const updateMostPopular = async () => {
  //       fetch('/api/updateMostPopular', {
  //       method: 'POST',
  //       body: JSON.stringify(breedData),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   };

  //   updateMostPopular();
  // }, []);

  const nextSlide = () => {
    setFromIndexToIndex(([prevFrom, prevTo]) => {
      if (prevTo > images.length - 1) {
        return [prevFrom, prevTo];
      }
      return [prevFrom + 1, prevTo + 1];
    });
  };
  const previousSlide = () => {
    setFromIndexToIndex(([prevFrom, prevTo]) => {
      if (prevFrom <= 0) {
        return [prevFrom, prevTo];
      }
      return [prevFrom - 1, prevTo - 1];
    });
  };

  const previousImage = () => {
    setImgIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return imgList.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const nextImage = () => {
    setImgIndex((prevIndex) => {
      if (prevIndex >= imgList.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };
  if (isFallback) {
    return <DetailsSkeleton />;
  }
  return (
    <StyledSection exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Head>
        <title>{breedData.name} | Meow Portal</title>
      </Head>
      <div className="container">
        <motion.div className="mobile-img-container" variants={fadeInDown}>
          {/* <div className="mobile-img">
            {imgList.length > 0 && (
              <Image
                src={imgList[imgIndex].url}
                alt={breedData.name}
                width="700"
                height="500"
                priority={true}
              />
            )}
            <button
              type="button"
              className="prev-slide"
              onClick={previousImage}
              disabled={imgList.length === 1}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="next-slide"
              onClick={nextImage}
              disabled={imgList.length === 1}
            >
              <FaChevronRight />
            </button>
          </div> */}
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
                  return (
                    <Slide index={index} key={img.id} className="mobile-slide">
                      <div className="mobile-img-wrapper">
                        <Image
                          src={img.url}
                          alt={breedData.name}
                          width="700"
                          height="500"
                          priority={true}
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
          {/* {imgList.length > 0 && (
            <div className="indicators">
              {imgList.map((indicator, index) => (
                <span
                  key={index}
                  className={`${index === imgIndex ? 'active-img' : ''}`}
                  onClick={() => setImgIndex(index)}
                ></span>
              ))}
            </div>
          )} */}
        </motion.div>
        <motion.div className="details">
          <motion.h1 variants={fadeInDown}>{breedData.name}</motion.h1>
          <motion.article
            variants={stagger}
            custom={{
              staggerDuration: 0.1,
              staggerDirection: 1,
              delayChildren: 0.2,
            }}
          >
            <motion.p variants={fadeInAndUp}>{breedData.description}</motion.p>
            <motion.div className="temperament" variants={fadeInAndUp}>
              <p className="title">Temperament:</p>
              <p>{breedData.temperament}</p>
            </motion.div>
            {characteristics && (
              <motion.div
                className="characteristics"
                variants={stagger}
                custom={{
                  staggerDuration: 0.02,
                  staggerDirection: 1,
                  delayChildren: 0.2,
                }}
              >
                {characteristics.map((characteristic) => {
                  const { characteristic: char, value } = characteristic;
                  return (
                    <motion.div
                      key={char}
                      className="single-char"
                      variants={fadeInAndUp}
                    >
                      <p className="title">{char}:</p>
                      <Score characteristic={characteristic} score={value} />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.article>
          <motion.p className="wiki-link" variants={fadeInAndUp}>
            more information on {breedData.name}{' '}
            <a
              href={breedData.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>{' '}
            page.
          </motion.p>
        </motion.div>
        <motion.div
          className="gallery"
          variants={stagger}
          custom={{
            staggerDuration: 0.2,
            staggerDirection: 1,
            delayChildren: 0.2,
          }}
        >
          <motion.div className="img-container" variants={fadeIn}>
            {imgList.length > 0 && (
              <Image
                src={imgList[imgIndex].url}
                alt={breedData.name}
                width="600"
                height="600"
                priority={true}
              />
            )}
          </motion.div>
          <motion.div variants={fadeIn}>
            {/* {imgList.slice(fromIndex, toIndex).map((image, index) => {
              return (
                <div
                  key={image.id}
                  onClick={() => setImgIndex(index + fromIndex)}
                  className={`${index + fromIndex === imgIndex && 'active'}`}
                >
                  <Image src={image.url} width="250" height="250" />
                </div>
              );
            })} */}
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
                  return (
                    <Slide
                      key={image.id}
                      index={index}
                      className="single-slide"
                      onClick={() => setImgIndex(index + fromIndex)}
                    >
                      <div
                        className={`${
                          index + fromIndex === imgIndex
                            ? 'active img-wrapper'
                            : 'img-wrapper'
                        }`}
                      >
                        <Image
                          src={image.url}
                          width="200"
                          height="200"
                          layout="responsive"
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
            {/* <button
              type="button"
              className={`prev ${fromIndex === 0 && 'first-slide'} ${
                imgList.length <= 3 ? 'hide' : ''
              }`}
              onClick={previousSlide}
              disabled={imgList.length <= 3}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className={`next ${imgList.length === toIndex && 'last-slide'} ${
                imgList.length <= 3 ? 'hide' : ''
              }`}
              onClick={nextSlide}
              disabled={imgList.length <= 3}
            >
              <FaChevronRight />
            </button> */}
          </motion.div>
        </motion.div>
      </div>
      <div className="btn-wrapper">
        <motion.button
        onClick={() => router.back()}
          type="button"
          className="back-btn"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: '#4a4a64'}}
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

  // get the images
  const images = data.map((breed) => {
    const { url, id } = breed;
    return { url, id };
  });

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

const StyledSection = styled(motion.section)`
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
    .gallery {
      grid-column: span 2;
    }

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
      grid-template-columns: 1fr 1fr;
    }
    .characteristics {
      grid-template-columns: 1fr 1fr;
    }
    .gallery {
      display: block;
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
      margin-top: 3em;
    }
  }

  @media (min-width: 1200px) {
    .mobile-img-container {
      display: none;
    }
    .container {
      gap: 5em;
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

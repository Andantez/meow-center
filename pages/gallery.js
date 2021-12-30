import Head from 'next/head';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useSWRInfinite, cache } from 'swr';
import { useEffect, useRef, useState } from 'react';
import useIsIntersecting from '../hoooks/useItsIntersecting';
import Skeleton from '../components/Skeleton';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { fadeIn, fadeInDown, stagger } from '../variants/animationVariants';
import { MdFavorite } from 'react-icons/md';
import { IoMdHeartDislike } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
const breakpointColumnsObj = {
  default: 4,
  // 1024: 3,
  768: 2,
  500: 2,
};
const PAGE_SIZE = 32;

const skeletonArray = Array.from({ length: PAGE_SIZE }, (_, index) => {
  return index;
});
const getKey = (pageIndex, previousData, mimeTypes, categoryId) => {
  if (previousData && !previousData.length) return null;
  return `${
    process.env.NEXT_PUBLIC_API_BASE_URI
  }/images/search?limit=${PAGE_SIZE}&order=asc&page=${
    pageIndex + 1
  }&mime_types=${mimeTypes}&category_ids=${categoryId}`;
};

const Gallery = ({ categories }) => {
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mimeType, setMimeType] = useState('jpg,png,gif');
  const [categoryId, setCategoryId] = useState('');
  const [favouritesHash, setFavouritesHash] = useState({});
  const [willDislike, setWillDislike] = useState(false);
  const { data: session, status } = useSession();
  // const { data, error, isValidating, size, setSize } = useSWRInfinite(
  //   (...args) => getKey(...args, mimeType, categoryId),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: favourites,
    error,
    mutate,
  } = useSWR(
    session?.user
      ? `${process.env.NEXT_PUBLIC_API_BASE_URI}/favourites?sub_id=${session.user.id}`
      : null
  ); // if there is user session => fetch his favourite images.
  const categoriesList = [{ id: 'all', name: 'all' }, ...categories];
  // const ref = useRef();
  // const isVisible = useIsIntersecting(ref);
  // const allImages = data ? [].concat(...data) : [];
  // const isEmpty = data?.[0]?.length === 0;
  // const isReachingEnd =
  //   isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  // const isRefreshing = isValidating && data && data.length === size;
  // const isLoadingInitialData = !data && !error;
  // const isLoadingMore =
  //   isLoadingInitialData ||
  //   (size > 0 && data && typeof data[size - 1] === 'undefined');

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // useEffect(() => {
  //   cache.clear();
  // }, [mimeType, categoryId]);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     cache.clear();
  //   };
  //   router.events.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router.events.off('routerChangeStart', handleRouteChange);
  //   };
  // }, []);
  // useEffect(() => {
  //   if (isVisible && !isReachingEnd && !isRefreshing) {
  //     setSize(size + 1);
  //   }
  // }, [isVisible]);

  useEffect(() => {
    if (favourites) {
      const favHash = favourites.reduce((acc, current) => {
        // convert the favourites list to hash with image id as property
        const { image_id, id: favourite_id } = current;
        return { ...acc, [image_id]: { image_id, favourite_id } };
      }, {});
      setFavouritesHash(favHash);
    }
  }, [favourites]);
  const handleData = (e) => {
    const name = e.target.name;
    if (name === 'animated') {
      setMimeType('gif');
    }

    if (name === 'static') {
      setMimeType('jpg,png');
    }

    if (name === 'all') {
      setMimeType('jpg,png,gif');
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setCategoryId('');
      return;
    }
    setCategoryId(value);
  };

  const handleLike = async (e, image_id) => {
    e.stopPropagation(); // prevent the event from bubbling up
    try {
      const { id: sub_id } = session.user;
      const favImg = { image_id, sub_id };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URI}/favourites`, // add image as favourite with user id.
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
          },
          body: JSON.stringify(favImg),
        }
      );
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setFavouritesHash({
        ...favouritesHash,
        [image_id]: { image_id, favourite_id: data.id },
      }); // update the hash table.
      mutate(); // revalidate the favourites list.
      setWillDislike(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDislike = async (e, id) => {
    e.stopPropagation();
    try {
      const { favourite_id } = favouritesHash[id]; // get the favourite id of the image from the favouritesHash
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URI}/favourites/${favourite_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const newFavouritesHash = { ...favouritesHash };
      delete newFavouritesHash.id;
      setFavouritesHash(newFavouritesHash);
      mutate(); //revalidate the favourites hash
    } catch (error) {
      console.log(error);
    }
  };
  // if (!data) return 'loading';
  // temporary -------------------------------------
  const allImages = [
    {
      breeds: [],
      height: 333,
      id: '2mj',
      url: 'https://cdn2.thecatapi.com/images/2mj.jpg',
      width: 500,
    },
    {
      breeds: [],
      categories: [
        {
          id: 5,
          name: 'boxes',
        },
      ],
      height: 333,
      id: '5l2',
      url: 'https://cdn2.thecatapi.com/images/5l2.jpg',
      width: 500,
    },
    {
      breeds: [],
      categories: [
        {
          id: 6,
          name: 'caturday',
        },
      ],
      height: 600,
      id: '5u8',
      url: 'https://cdn2.thecatapi.com/images/5u8.jpg',
      width: 408,
    },
    {
      breeds: [],
      categories: [
        {
          id: 9,
          name: 'dream',
        },
      ],
      height: 313,
      id: '6hp',
      url: 'https://cdn2.thecatapi.com/images/6hp.jpg',
      width: 500,
    },
    {
      breeds: [],
      categories: [
        {
          id: 14,
          name: 'sinks',
        },
      ],
      height: 1552,
      id: '8os',
      url: 'https://cdn2.thecatapi.com/images/8os.jpg',
      width: 2592,
    },
    {
      breeds: [],
      height: 647,
      id: 'aq6',
      url: 'https://cdn2.thecatapi.com/images/aq6.png',
      width: 415,
    },
    {
      breeds: [],
      height: 640,
      id: 'di3',
      url: 'https://cdn2.thecatapi.com/images/di3.jpg',
      width: 427,
    },
    {
      breeds: [],
      height: 374,
      id: 'e49',
      url: 'https://cdn2.thecatapi.com/images/e49.jpg',
      width: 500,
    },
    {
      breed_ids: null,
      breeds: [],
      created_at: '2021-09-02T23:06:23.000Z',
      height: 682,
      id: 'HkoR633xp',
      original_filename: 'IMGP3160.jpg',
      sub_id: 'demo-26beae',
      url: 'https://cdn2.thecatapi.com/images/HkoR633xp.jpg',
      width: 1024,
    },
    {
      breed_ids: null,
      breeds: [],
      created_at: '2021-12-03T05:46:46.000Z',
      height: 391,
      id: 'QjKNuv5hE',
      original_filename: 'image.jpg',
      sub_id: null,
      url: 'https://cdn2.thecatapi.com/images/QjKNuv5hE.jpg',
      width: 499,
    },
  ];
  const data = true;
  const isEmpty = false;
  const isLoadingMore = false;
  // ----------------------------------------------------
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Head>
        <title>Gallery | Meow Portal</title>
      </Head>
      <StyledSection>
        <div className="container">
          <motion.h1 variants={fadeInDown}>Cat Photos</motion.h1>
          <form>
            <motion.div
              className="form-control"
              variants={stagger}
              custom={{
                staggerDuration: 0.1,
                staggerDirection: -1,
                delayChildren: 0,
              }}
            >
              <motion.button
                type="button"
                name="all"
                className={`${mimeType === 'jpg,png,gif' ? 'active' : ''}`}
                onClick={handleData}
                variants={fadeIn}
              >
                All
              </motion.button>
              <motion.button
                type="button"
                name="static"
                className={`${mimeType === 'jpg,png' ? 'active' : ''}`}
                onClick={handleData}
                variants={fadeIn}
              >
                Static
              </motion.button>
              <motion.button
                type="button"
                name="animated"
                className={`${mimeType === 'gif' ? 'active' : ''}`}
                onClick={handleData}
                variants={fadeIn}
              >
                Animated
              </motion.button>
            </motion.div>
            <motion.div className="form-control" variants={fadeIn}>
              <label htmlFor="categories">Category: </label>
              <select
                name="categories"
                id="categories"
                value={categoryId}
                onChange={handleOnChange}
              >
                {categoriesList.map((category) => {
                  const { id, name } = category;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </motion.div>
          </form>
          <div className="img-gallery">
            <motion.div
              className={`shade ${isOpen ? 'visible' : ''}`}
              animate={{ opacity: isOpen ? 1 : 0 }}
              onClick={() => setIsOpen(false)}
            ></motion.div>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {!data &&
                skeletonArray.map((skeleton, index) => (
                  <Skeleton key={index} />
                ))}
              {data &&
                // allImages
                allImages.map((image, index) => {
                  const { id, url, height, width } = image;
                  const itsPortrait = height > width;
                  const itsAnimated = url.endsWith('gif');

                  return (
                    <StyledDiv
                      key={id + index}
                      className={`img-container ${
                        imgIndex === index && isOpen ? 'open' : ''
                      } ${imgIndex === index ? 'selected-image' : ''}`}
                      onClick={() => setImgIndex(index)}
                      imageOrientation={
                        imgIndex === index && isOpen && itsPortrait
                          ? 'portrait'
                          : 'landscape'
                      }
                      imageHeight={height}
                      animatedImage={itsAnimated}
                    >
                      <motion.div
                        className="img-wrapper"
                        onClick={() => setIsOpen(!isOpen)}
                        layout
                      >
                        <motion.div className="wrapper-relative" layout>
                          <Image
                            src={url}
                            width={width}
                            height={height}
                            layout="responsive"
                            alt={url}
                          />
                          <motion.div className="icon-wrapper" layout>
                            <motion.div
                              title={`${
                                favouritesHash[id]
                                  ? 'Click to remove from your favourites.'
                                  : 'Add to your favourites'
                              }`}
                              className={`icon ${
                                favouritesHash[id] ? 'favourite' : ''
                              }`}
                              onClick={
                                willDislike
                                  ? (e) => handleDislike(e, id)
                                  : (e) => handleLike(e, id)
                              }
                              onMouseEnter={
                                favouritesHash[id]
                                  ? () => {
                                      setWillDislike(true);
                                    }
                                  : undefined
                              }
                              onMouseLeave={
                                favouritesHash[id] || willDislike
                                  ? () => {
                                      setWillDislike(false);
                                    }
                                  : undefined
                              }
                              layout
                            >
                              {willDislike && favouritesHash[id] ? (
                                <IoMdHeartDislike />
                              ) : (
                                <MdFavorite />
                              )}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </StyledDiv>
                  );
                })}
            </Masonry>
            {isEmpty && (
              <div className="no-results">
                No cat photos with a category of{' '}
                <span>
                  "
                  {
                    categoriesList.filter(
                      (category) => category.id === Number(categoryId)
                    )[0]?.name
                  }
                  "
                </span>
              </div>
            )}
            <div>
              <h2 className="no-results-heading">No More Results</h2>
            </div>
            {/* <div className="loading-notification" ref={ref}>
              {isLoadingMore && 'Grabbing more pictures'}
            </div> */}
            <div className="loading-notification">
              {isLoadingMore && 'Grabbing more pictures'}
            </div>
          </div>
        </div>
      </StyledSection>
    </motion.div>
  );
};
export const getStaticProps = async (context) => {
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/categories`
  );
  const categories = await categoriesResponse.json();

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};

const StyledDiv = styled.div`
  &.open .img-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: ${(props) =>
      props.imageOrientation === 'portrait'
        ? '80vw'
        : props.animatedImage
        ? '90vw'
        : '90vw'};
    height: ${(props) =>
      props.imageOrientation === 'portrait'
        ? '70vh'
        : props.animatedImage
        ? `30vh`
        : '35vh'};
  }

  &.open .img-wrapper .wrapper-relative {
    width: 100%;
    height: 100%;
  }
  .wrapper-relative > div:first-child {
    height: 100%;
  }
  &.open .icon-wrapper {
    padding: 0.75em;
  }
  @media (min-width: 768px) {
    &.open .img-wrapper {
      width: ${(props) =>
        props.imageOrientation === 'portrait'
          ? '70vw'
          : props.animatedImage
          ? '90vw'
          : '90vw'};
      height: ${(props) =>
        props.imageOrientation === 'portrait'
          ? '90vh'
          : props.animatedImage
          ? `40vh`
          : '50vh'};
    }
  }
  @media (min-width: 1024px) {
    &.open .img-wrapper {
      width: ${(props) =>
        props.imageOrientation === 'portrait'
          ? '35vw'
          : props.animatedImage
          ? '35vw'
          : '55vw'};
      height: ${(props) =>
        props.imageOrientation === 'portrait'
          ? '95vh'
          : props.animatedImage
          ? '40vh'
          : '80vh'};
    }
    &.open .icon-wrapper {
      padding: 1.75em;
    }
    &.open .icon {
      padding: 0.5em;

      svg {
        font-size: 1.5rem;
      }
    }
  }
`;
const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  width: 90vw;

  .container {
    margin-top: 3em;
  }
  h1 {
    font-family: var(--ff-heading);
    color: var(--clr-primary-500);
    font-size: 2.25rem;
    text-align: center;
  }
  h2 {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    font-size: 1.25rem;
    text-align: center;
    margin: 5em 0;
  }
  form {
    margin-top: 3em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .form-control {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    width: max-content;
    display: flex;
    gap: 0.5em;
    align-items: center;

    button,
    label,
    select {
      font-size: 0.8125rem;
    }
    button {
      color: var(--clr-black);
      background: transparent;
      border: 1px solid var(--clr-grey);
      opacity: 0.7;
      padding: 0.5em 1.5em;
      cursor: pointer;
      transition: opacity 250ms ease, border 250ms ease;
      border-radius: 0.5em;
      &:hover {
        opacity: 1;
        border: 1px solid var(--clr-black);
      }
    }

    label {
      font-weight: var(--fw-bold);
    }
    select {
      color: var(--clr-primary-500);
      background-color: var(--clr-secondary-500);
      padding: 0.25em;
      width: fit-content;
      border: transparent;
      border-radius: 0.5em;
      border: 1px solid var(--clr-grey);
      text-transform: capitalize;
      cursor: pointer;
    }
  }
  .img-gallery {
    margin-top: 1em;
    /* min-height: 100vh; */
  }
  .masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: -1.5em; /* gutter size offset */
    width: auto;
  }
  .masonry-grid-column {
    padding-left: 1.5em; /* gutter size */
    background-clip: padding-box;
  }
  .masonry-grid-column > div {
    margin-bottom: 1.5em;
  }
  button.active {
    border: 1px solid var(--clr-black);
    opacity: 1;
  }
  .loading-notification {
    text-align: center;
    font-family: var(--ff-paragraph);
    margin: 2em 0;
  }
  .no-results {
    text-align: center;
    font-family: var(--ff-paragraph);
    margin: 10em 0 20em 0;
    span {
      text-transform: capitalize;
      font-weight: var(--fw-bold);
    }
  }

  .img-container .img-wrapper {
    cursor: zoom-in;
  }
  .img-container.open .img-wrapper {
    cursor: zoom-out;
  }
  .img-gallery .visible {
    pointer-events: auto;
    cursor: zoom-out;
  }

  .shade {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.85);
    pointer-events: none;
    opacity: 0;
  }

  .selected-image {
    position: relative;
    z-index: 99;
  }

  .wrapper-relative {
    position: relative;
  }

  .icon-wrapper {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    color: var(--clr-grey);
    padding: 0.5em;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    background-color: var(--clr-secondary-500);
    padding: 0.25em;
    border-radius: 0.25em;
    transition: background-color 250ms ease;
    cursor: pointer;
    &:hover {
      background-color: hsl(270, 2%, 90%);
    }
  }
  .icon.favourite:hover {
    background-color: hsl(359, 79%, 96%);
  }
  .favourite {
    svg {
      color: var(--clr-red-100);
    }
  }
  @media (min-width: 768px) {
    .form-control {
      button,
      label,
      select {
        font-size: 1rem;
      }
    }
    form {
      flex-direction: row;
      justify-content: space-between;
    }

    .icon {
      svg {
        font-size: 1.25rem;
      }
    }
    .icon-wrapper {
      padding: 0.75em;
    }
  }

  @media (min-width: 1024px) {
    .container {
      margin-top: 6em;
      h1 {
        font-size: 3rem;
      }
    }
    form {
      margin-top: 6em;
    }

    h2 {
      font-size: 1.5rem;
      margin: 7em 0;
    }

    .icon {
      padding: 0.5em;
    }
    .icon-wrapper {
      padding: 1em;
      opacity: 0;
      transition: opacity 250ms ease-out;
    }
    .img-wrapper:hover .icon-wrapper {
      opacity: 1;
      transition: opacity 250ms ease-in;
    }
  }
`;
export default Gallery;

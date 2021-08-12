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

const breakpointColumnsObj = {
  default: 3,
  // 1024: 3,
  768: 2,
  500: 2,
};
const PAGE_SIZE = 25;

const skeletonArray = Array.from({ length: 25 }, (_, index) => {
  return index;
});
const getKey = (pageIndex, previousData, mimeTypes, categoryId) => {
  if (previousData && !previousData.length) return null;
  return `${
    process.env.NEXT_PUBLIC_API_BASE_URI
  }/images/search?limit=25&order=asc&page=${
    pageIndex + 1
  }&mime_types=${mimeTypes}&category_ids=${categoryId}`;
};

const Gallery = ({ categories }) => {
  const router = useRouter();
  const [mimeType, setMimeType] = useState('jpg,png,gif');
  const [categoryId, setCategoryId] = useState('');
  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, mimeType, categoryId),
    {
      revalidateOnFocus: false,
    }
  );
  const categoriesList = [{ id: 'all', name: 'all' }, ...categories];
  const ref = useRef();
  const isVisible = useIsIntersecting(ref);
  const allImages = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  useEffect(() => {
    cache.clear();
  }, [mimeType, categoryId]);
  
  useEffect(() => {
    const handleRouteChange = () => {
      cache.clear();
    }
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routerChangeStart', handleRouteChange)
    }
  }, [])
  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1);
    }
  }, [isVisible]);

  const handleData = async (e) => {
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
  // if (!data) return 'loading';

  return (
    <motion.div exit={{opacity: 0}}>
      <Head>
        <title>Gallery | Meow Portal</title>
      </Head>
      <StyledSection>
        <div className="container">
          <h1>Cat Photos</h1>
          <form>
            <div className="form-control">
              <button
                type="button"
                name="all"
                className={`${mimeType === 'jpg,png,gif' ? 'active' : ''}`}
                onClick={handleData}
              >
                All
              </button>
              <button
                type="button"
                name="static"
                className={`${mimeType === 'jpg,png' ? 'active' : ''}`}
                onClick={handleData}
              >
                Static
              </button>
              <button
                type="button"
                name="animated"
                className={`${mimeType === 'gif' ? 'active' : ''}`}
                onClick={handleData}
              >
                Animated
              </button>
            </div>
            <div className="form-control">
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
            </div>
          </form>
          <div className="img-gallery">
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
                allImages.map((image, index) => {
                  const { id, url, height, width } = image;
                  return (
                    <div key={id + index}>
                      <Image
                        src={url}
                        width={width}
                        height={height}
                        layout="responsive"
                        alt={url}
                      />
                    </div>
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
            <div className="loading-notification" ref={ref}>
              {isLoadingMore && 'Grabbing more pictures'}
            </div>
          </div>
        </div>
      </StyledSection>
    </motion.div>
  );
};
export const getStaticProps = async (context) => {
  const tempCategories = [
    {
      id: 5,
      name: 'boxes',
    },
    {
      id: 15,
      name: 'clothes',
    },
    {
      id: 1,
      name: 'hats',
    },
    {
      id: 14,
      name: 'sinks',
    },
    {
      id: 2,
      name: 'space',
    },
    {
      id: 4,
      name: 'sunglasses',
    },
    {
      id: 7,
      name: 'ties',
    },
  ];
  const tempImages = [
    {
      breeds: [],
      categories: [
        {
          id: 5,
          name: 'boxes',
        },
      ],
      id: 'f4',
      url: 'https://cdn2.thecatapi.com/images/f4.jpg',
      width: 1280,
      height: 855,
    },
    {
      breeds: [],
      id: 'l8',
      url: 'https://cdn2.thecatapi.com/images/l8.jpg',
      width: 1024,
      height: 683,
    },
    {
      breeds: [],
      categories: [
        {
          id: 6,
          name: 'caturday',
        },
      ],
      id: 'q9',
      url: 'https://cdn2.thecatapi.com/images/q9.jpg',
      width: 700,
      height: 514,
    },
    {
      breeds: [],
      id: '181',
      url: 'https://cdn2.thecatapi.com/images/181.jpg',
      width: 448,
      height: 336,
    },
    {
      breeds: [],
      id: '1v6',
      url: 'https://cdn2.thecatapi.com/images/1v6.jpg',
      width: 706,
      height: 1062,
    },
    {
      breeds: [],
      id: '28j',
      url: 'https://cdn2.thecatapi.com/images/28j.jpg',
      width: 624,
      height: 403,
    },
    {
      breeds: [],
      id: '2fd',
      url: 'https://cdn2.thecatapi.com/images/2fd.jpg',
      width: 495,
      height: 501,
    },
    {
      breeds: [],
      id: '2vd',
      url: 'https://cdn2.thecatapi.com/images/2vd.jpg',
      width: 604,
      height: 456,
    },
    {
      breeds: [],
      categories: [
        {
          id: 6,
          name: 'caturday',
        },
      ],
      id: '3b8',
      url: 'https://cdn2.thecatapi.com/images/3b8.jpg',
      width: 640,
      height: 480,
    },
    {
      breeds: [],
      id: '3da',
      url: 'https://cdn2.thecatapi.com/images/3da.jpg',
      width: 720,
      height: 533,
    },
    {
      breeds: [],
      id: '48f',
      url: 'https://cdn2.thecatapi.com/images/48f.gif',
      width: 317,
      height: 198,
    },
    {
      breeds: [],
      id: '4ac',
      url: 'https://cdn2.thecatapi.com/images/4ac.gif',
      width: 320,
      height: 240,
    },
    {
      breeds: [],
      id: '4ba',
      url: 'https://cdn2.thecatapi.com/images/4ba.gif',
      width: 252,
      height: 168,
    },
    {
      breeds: [],
      id: '4jk',
      url: 'https://cdn2.thecatapi.com/images/4jk.gif',
      width: 500,
      height: 200,
    },
    {
      breeds: [],
      id: '4kl',
      url: 'https://cdn2.thecatapi.com/images/4kl.gif',
      width: 500,
      height: 281,
    },
    {
      breeds: [],
      id: '4nn',
      url: 'https://cdn2.thecatapi.com/images/4nn.jpg',
      width: 500,
      height: 332,
    },
    {
      breeds: [],
      id: '4u9',
      url: 'https://cdn2.thecatapi.com/images/4u9.jpg',
      width: 500,
      height: 334,
    },
    {
      breeds: [],
      id: '4ub',
      url: 'https://cdn2.thecatapi.com/images/4ub.gif',
      width: 450,
      height: 255,
    },
    {
      breeds: [],
      id: '51k',
      url: 'https://cdn2.thecatapi.com/images/51k.gif',
      width: 500,
      height: 281,
    },
    {
      breeds: [],
      id: '53g',
      url: 'https://cdn2.thecatapi.com/images/53g.jpg',
      width: 449,
      height: 694,
    },
    {
      breeds: [],
      id: '57u',
      url: 'https://cdn2.thecatapi.com/images/57u.jpg',
      width: 700,
      height: 700,
    },
    {
      breeds: [],
      id: '6q4',
      url: 'https://cdn2.thecatapi.com/images/6q4.png',
      width: 500,
      height: 334,
    },
    {
      breeds: [],
      id: '869',
      url: 'https://cdn2.thecatapi.com/images/869.gif',
      width: 250,
      height: 198,
    },
    {
      breeds: [],
      id: '86v',
      url: 'https://cdn2.thecatapi.com/images/86v.jpg',
      width: 640,
      height: 428,
    },
    {
      breeds: [],
      id: '8kj',
      url: 'https://cdn2.thecatapi.com/images/8kj.jpg',
      width: 600,
      height: 400,
    },
    {
      breeds: [],
      categories: [
        {
          id: 14,
          name: 'sinks',
        },
      ],
      id: '8mh',
      url: 'https://cdn2.thecatapi.com/images/8mh.jpg',
      width: 1229,
      height: 922,
    },
    {
      breeds: [],
      categories: [
        {
          id: 14,
          name: 'sinks',
        },
      ],
      id: '8q3',
      url: 'https://cdn2.thecatapi.com/images/8q3.jpg',
      width: 500,
      height: 334,
    },
    {
      breeds: [],
      id: '9bf',
      url: 'https://cdn2.thecatapi.com/images/9bf.jpg',
      width: 680,
      height: 494,
    },
    {
      breeds: [],
      id: '9ev',
      url: 'https://cdn2.thecatapi.com/images/9ev.jpg',
      width: 560,
      height: 421,
    },
    {
      breeds: [],
      id: '9uk',
      url: 'https://cdn2.thecatapi.com/images/9uk.jpg',
      width: 1024,
      height: 683,
    },
    {
      breeds: [],
      id: 'ac8',
      url: 'https://cdn2.thecatapi.com/images/ac8.jpg',
      width: 450,
      height: 600,
    },
    {
      breeds: [],
      id: 'ag6',
      url: 'https://cdn2.thecatapi.com/images/ag6.png',
      width: 1024,
      height: 1024,
    },
    {
      breeds: [],
      id: 'as1',
      url: 'https://cdn2.thecatapi.com/images/as1.jpg',
      width: 290,
      height: 290,
    },
    {
      breeds: [],
      id: 'bbj',
      url: 'https://cdn2.thecatapi.com/images/bbj.jpg',
      width: 500,
      height: 342,
    },
    {
      breeds: [],
      id: 'be5',
      url: 'https://cdn2.thecatapi.com/images/be5.jpg',
      width: 500,
      height: 367,
    },
    {
      breeds: [],
      id: 'ber',
      url: 'https://cdn2.thecatapi.com/images/ber.jpg',
      width: 400,
      height: 400,
    },
    {
      breeds: [],
      id: 'bfk',
      url: 'https://cdn2.thecatapi.com/images/bfk.jpg',
      width: 480,
      height: 319,
    },
    {
      breeds: [],
      id: 'bls',
      url: 'https://cdn2.thecatapi.com/images/bls.png',
      width: 765,
      height: 1024,
    },
    {
      breeds: [],
      id: 'c18',
      url: 'https://cdn2.thecatapi.com/images/c18.jpg',
      width: 500,
      height: 375,
    },
    {
      breeds: [],
      id: 'c3r',
      url: 'https://cdn2.thecatapi.com/images/c3r.png',
      width: 1024,
      height: 640,
    },
    {
      breeds: [],
      id: 'c4c',
      url: 'https://cdn2.thecatapi.com/images/c4c.jpg',
      width: 900,
      height: 600,
    },
    {
      breeds: [],
      id: 'c7o',
      url: 'https://cdn2.thecatapi.com/images/c7o.jpg',
      width: 800,
      height: 1204,
    },
    {
      breeds: [],
      id: 'cb7',
      url: 'https://cdn2.thecatapi.com/images/cb7.jpg',
      width: 800,
      height: 808,
    },
    {
      breeds: [],
      id: 'cgi',
      url: 'https://cdn2.thecatapi.com/images/cgi.png',
      width: 320,
      height: 411,
    },
    {
      breeds: [],
      id: 'cm4',
      url: 'https://cdn2.thecatapi.com/images/cm4.jpg',
      width: 707,
      height: 800,
    },
    {
      breeds: [],
      id: 'cms',
      url: 'https://cdn2.thecatapi.com/images/cms.jpg',
      width: 640,
      height: 426,
    },
    {
      breeds: [],
      id: 'cnk',
      url: 'https://cdn2.thecatapi.com/images/cnk.jpg',
      width: 698,
      height: 723,
    },
    {
      breeds: [],
      id: 'cot',
      url: 'https://cdn2.thecatapi.com/images/cot.jpg',
      width: 3028,
      height: 2592,
    },
    {
      breeds: [],
      id: 'dii',
      url: 'https://cdn2.thecatapi.com/images/dii.png',
      width: 430,
      height: 616,
    },
    {
      breeds: [],
      id: 'djt',
      url: 'https://cdn2.thecatapi.com/images/djt.jpg',
      width: 565,
      height: 376,
    },
    {
      breeds: [],
      id: 'dl6',
      url: 'https://cdn2.thecatapi.com/images/dl6.jpg',
      width: 500,
      height: 342,
    },
    {
      breeds: [],
      id: 'dpl',
      url: 'https://cdn2.thecatapi.com/images/dpl.jpg',
      width: 900,
      height: 675,
    },
    {
      breeds: [],
      id: 'dup',
      url: 'https://cdn2.thecatapi.com/images/dup.jpg',
      width: 742,
      height: 538,
    },
    {
      breeds: [],
      id: 'e0h',
      url: 'https://cdn2.thecatapi.com/images/e0h.jpg',
      width: 400,
      height: 720,
    },
    {
      breeds: [],
      id: 'e4e',
      url: 'https://cdn2.thecatapi.com/images/e4e.jpg',
      width: 500,
      height: 375,
    },
    {
      breeds: [],
      id: 'e4h',
      url: 'https://cdn2.thecatapi.com/images/e4h.jpg',
      width: 450,
      height: 600,
    },
    {
      breeds: [],
      id: 'e52',
      url: 'https://cdn2.thecatapi.com/images/e52.jpg',
      width: 768,
      height: 1024,
    },
    {
      breeds: [],
      id: 'eg9',
      url: 'https://cdn2.thecatapi.com/images/eg9.jpg',
      width: 500,
      height: 335,
    },
    {
      breeds: [],
      id: 'MTQ5NzQ2MA',
      url: 'https://cdn2.thecatapi.com/images/MTQ5NzQ2MA.jpg',
      width: 500,
      height: 332,
    },
    {
      breeds: [],
      id: 'MTUxOTE0Nw',
      url: 'https://cdn2.thecatapi.com/images/MTUxOTE0Nw.jpg',
      width: 640,
      height: 427,
    },
    {
      breeds: [],
      categories: [
        {
          id: 6,
          name: 'caturday',
        },
      ],
      id: 'MTU1NDMzNg',
      url: 'https://cdn2.thecatapi.com/images/MTU1NDMzNg.jpg',
      width: 523,
      height: 687,
    },
    {
      breeds: [],
      id: 'MTU4NzQwNA',
      url: 'https://cdn2.thecatapi.com/images/MTU4NzQwNA.jpg',
      width: 1280,
      height: 1280,
    },
    {
      breeds: [],
      id: 'MTY2OTA1Ng',
      url: 'https://cdn2.thecatapi.com/images/MTY2OTA1Ng.jpg',
      width: 500,
      height: 331,
    },
    {
      breeds: [],
      id: 'MTcxNjAxOA',
      url: 'https://cdn2.thecatapi.com/images/MTcxNjAxOA.jpg',
      width: 500,
      height: 277,
    },
    {
      breeds: [],
      id: 'MTcxNzk5Ng',
      url: 'https://cdn2.thecatapi.com/images/MTcxNzk5Ng.jpg',
      width: 640,
      height: 468,
    },
    {
      breeds: [],
      id: 'MTczOTM3NQ',
      url: 'https://cdn2.thecatapi.com/images/MTczOTM3NQ.gif',
      width: 500,
      height: 281,
    },
    {
      breeds: [],
      id: 'MTc3NTMyNg',
      url: 'https://cdn2.thecatapi.com/images/MTc3NTMyNg.jpg',
      width: 500,
      height: 333,
    },
    {
      breeds: [],
      id: 'MTgzMDcyMA',
      url: 'https://cdn2.thecatapi.com/images/MTgzMDcyMA.jpg',
      width: 574,
      height: 800,
    },
    {
      breeds: [],
      id: 'MTg2NzgzOQ',
      url: 'https://cdn2.thecatapi.com/images/MTg2NzgzOQ.jpg',
      width: 398,
      height: 600,
    },
    {
      breeds: [],
      id: 'MTkxNDM3Mg',
      url: 'https://cdn2.thecatapi.com/images/MTkxNDM3Mg.jpg',
      width: 1280,
      height: 853,
    },
    {
      breeds: [],
      id: 'MjAxNTU5MA',
      url: 'https://cdn2.thecatapi.com/images/MjAxNTU5MA.jpg',
      width: 640,
      height: 480,
    },
    {
      breeds: [],
      id: 'MjAzNjQ3Mw',
      url: 'https://cdn2.thecatapi.com/images/MjAzNjQ3Mw.jpg',
      width: 413,
      height: 622,
    },
    {
      breeds: [],
      id: 'MjA4MDU4Nw',
      url: 'https://cdn2.thecatapi.com/images/MjA4MDU4Nw.jpg',
      width: 550,
      height: 365,
    },
    {
      breeds: [],
      id: '3P-m0fVVf',
      url: 'https://cdn2.thecatapi.com/images/3P-m0fVVf.jpg',
      width: 1241,
      height: 1159,
    },
    {
      breeds: [],
      id: 'JYAXLe0I-',
      url: 'https://cdn2.thecatapi.com/images/JYAXLe0I-.jpg',
      width: 1536,
      height: 2048,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '6 - 12',
            metric: '3 - 7',
          },
          id: 'beng',
          name: 'Bengal',
          cfa_url: 'http://cfa.org/Breeds/BreedsAB/Bengal.aspx',
          vetstreet_url: 'http://www.vetstreet.com/cats/bengal',
          vcahospitals_url:
            'https://vcahospitals.com/know-your-pet/cat-breeds/bengal',
          temperament: 'Alert, Agile, Energetic, Demanding, Intelligent',
          origin: 'United States',
          country_codes: 'US',
          country_code: 'US',
          description:
            "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.",
          life_span: '12 - 15',
          indoor: 0,
          lap: 0,
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          cat_friendly: 4,
          dog_friendly: 5,
          energy_level: 5,
          grooming: 1,
          health_issues: 3,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 3,
          vocalisation: 5,
          bidability: 3,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Bengal_(cat)',
          hypoallergenic: 1,
          reference_image_id: 'O3btzLlsO',
        },
      ],
      id: 'aaxNf4D0H',
      url: 'https://cdn2.thecatapi.com/images/aaxNf4D0H.jpg',
      width: 1080,
      height: 1350,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '10 - 12',
            metric: '5 - 6',
          },
          id: 'dons',
          name: 'Donskoy',
          temperament: 'Playful, affectionate, loyal, social',
          origin: 'Russia',
          country_codes: 'RU',
          country_code: 'RU',
          description:
            'Donskoy are affectionate, intelligent, and easy-going. They demand lots of attention and interaction. The Donskoy also gets along well with other pets. It is now thought the same gene that causes degrees of hairlessness in the Donskoy also causes alterations in cat personality, making them calmer the less hair they have.',
          life_span: '12 - 15',
          indoor: 0,
          adaptability: 4,
          affection_level: 4,
          child_friendly: 3,
          cat_friendly: 3,
          dog_friendly: 3,
          energy_level: 4,
          grooming: 2,
          health_issues: 3,
          intelligence: 3,
          shedding_level: 1,
          social_needs: 5,
          stranger_friendly: 5,
          vocalisation: 2,
          experimental: 0,
          hairless: 1,
          natural: 0,
          rare: 1,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Donskoy_(cat)',
          hypoallergenic: 0,
          reference_image_id: '3KG57GfMW',
        },
      ],
      id: 'Z9zxhFVdw',
      url: 'https://cdn2.thecatapi.com/images/Z9zxhFVdw.jpg',
      width: 3789,
      height: 2873,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '5 - 9',
            metric: '2 - 4',
          },
          id: 'munc',
          name: 'Munchkin',
          vetstreet_url: 'http://www.vetstreet.com/cats/munchkin',
          temperament: 'Agile, Easy Going, Intelligent, Playful',
          origin: 'United States',
          country_codes: 'US',
          country_code: 'US',
          description:
            'The Munchkin is an outgoing cat who enjoys being handled. She has lots of energy and is faster and more agile than she looks. The shortness of their legs does not seem to interfere with their running and leaping abilities.',
          life_span: '10 - 15',
          indoor: 0,
          lap: 1,
          alt_names: '',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          dog_friendly: 5,
          energy_level: 4,
          grooming: 2,
          health_issues: 3,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 5,
          vocalisation: 3,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 1,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Munchkin_(cat)',
          hypoallergenic: 0,
          reference_image_id: 'j5cVSqLer',
        },
      ],
      id: '8LxU2Gwmo',
      url: 'https://cdn2.thecatapi.com/images/8LxU2Gwmo.jpg',
      width: 1600,
      height: 1200,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '5 - 9',
            metric: '2 - 4',
          },
          id: 'munc',
          name: 'Munchkin',
          vetstreet_url: 'http://www.vetstreet.com/cats/munchkin',
          temperament: 'Agile, Easy Going, Intelligent, Playful',
          origin: 'United States',
          country_codes: 'US',
          country_code: 'US',
          description:
            'The Munchkin is an outgoing cat who enjoys being handled. She has lots of energy and is faster and more agile than she looks. The shortness of their legs does not seem to interfere with their running and leaping abilities.',
          life_span: '10 - 15',
          indoor: 0,
          lap: 1,
          alt_names: '',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          dog_friendly: 5,
          energy_level: 4,
          grooming: 2,
          health_issues: 3,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 5,
          vocalisation: 3,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 1,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Munchkin_(cat)',
          hypoallergenic: 0,
          reference_image_id: 'j5cVSqLer',
        },
      ],
      id: 'gLh13vDBk',
      url: 'https://cdn2.thecatapi.com/images/gLh13vDBk.jpg',
      width: 807,
      height: 810,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '7 - 15',
            metric: '3 - 7',
          },
          id: 'ocic',
          name: 'Ocicat',
          cfa_url: 'http://cfa.org/Breeds/BreedsKthruR/Ocicat.aspx',
          vetstreet_url: 'http://www.vetstreet.com/cats/ocicat',
          vcahospitals_url:
            'https://vcahospitals.com/know-your-pet/cat-breeds/ocicat',
          temperament:
            'Active, Agile, Curious, Demanding, Friendly, Gentle, Lively, Playful, Social',
          origin: 'United States',
          country_codes: 'US',
          country_code: 'US',
          description:
            "Loyal and devoted to their owners, the Ocicat is intelligent, confident, outgoing, and seems to have many dog traits. They can be trained to fetch toys, walk on a lead, taught to 'speak', come when called, and follow other commands. ",
          life_span: '12 - 14',
          indoor: 0,
          alt_names: '',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          dog_friendly: 5,
          energy_level: 5,
          grooming: 1,
          health_issues: 3,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 5,
          vocalisation: 3,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Ocicat',
          hypoallergenic: 1,
          reference_image_id: 'JAx-08Y0n',
        },
      ],
      id: 'NZ_C9Edot',
      url: 'https://cdn2.thecatapi.com/images/NZ_C9Edot.jpg',
      width: 2560,
      height: 1600,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '5 - 10',
            metric: '2 - 5',
          },
          id: 'orie',
          name: 'Oriental',
          cfa_url: 'http://cfa.org/Breeds/BreedsKthruR/Oriental.aspx',
          vetstreet_url: 'http://www.vetstreet.com/cats/oriental',
          vcahospitals_url:
            'https://vcahospitals.com/know-your-pet/cat-breeds/oriental',
          temperament:
            'Energetic, Affectionate, Intelligent, Social, Playful, Curious',
          origin: 'United States',
          country_codes: 'US',
          country_code: 'US',
          description:
            'Orientals are passionate about the people in their lives. They become extremely attached to their humans, so be prepared for a lifetime commitment. When you are not available to entertain her, an Oriental will divert herself by jumping on top of the refrigerator, opening drawers, seeking out new hideaways.',
          life_span: '12 - 14',
          indoor: 0,
          lap: 1,
          alt_names: 'Foreign Type',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          dog_friendly: 5,
          energy_level: 5,
          grooming: 1,
          health_issues: 3,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 3,
          vocalisation: 5,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Oriental_Shorthair',
          hypoallergenic: 1,
          reference_image_id: 'LutjkZJpH',
        },
      ],
      id: '0Z9FWHLuK',
      url: 'https://cdn2.thecatapi.com/images/0Z9FWHLuK.jpg',
      width: 1100,
      height: 733,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '5 - 11',
            metric: '2 - 5',
          },
          id: 'rblu',
          name: 'Russian Blue',
          cfa_url: 'http://cfa.org/Breeds/BreedsKthruR/RussianBlue.aspx',
          vetstreet_url: 'http://www.vetstreet.com/cats/russian-blue-nebelung',
          vcahospitals_url:
            'https://vcahospitals.com/know-your-pet/cat-breeds/russian-blue',
          temperament:
            'Active, Dependent, Easy Going, Gentle, Intelligent, Loyal, Playful, Quiet',
          origin: 'Russia',
          country_codes: 'RU',
          country_code: 'RU',
          description:
            'Russian Blues are very loving and reserved. They do not like noisy households but they do like to play and can be quite active when outdoors. They bond very closely with their owner and are known to be compatible with other pets.',
          life_span: '10 - 16',
          indoor: 0,
          lap: 1,
          alt_names: 'Archangel Blue, Archangel Cat',
          adaptability: 3,
          affection_level: 3,
          child_friendly: 3,
          dog_friendly: 3,
          energy_level: 3,
          grooming: 3,
          health_issues: 1,
          intelligence: 3,
          shedding_level: 3,
          social_needs: 3,
          stranger_friendly: 1,
          vocalisation: 1,
          experimental: 0,
          hairless: 0,
          natural: 1,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Russian_Blue',
          hypoallergenic: 1,
          reference_image_id: 'Rhj-JsTLP',
        },
      ],
      id: 'tmH3RG7rD',
      url: 'https://cdn2.thecatapi.com/images/tmH3RG7rD.jpg',
      width: 3072,
      height: 2048,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '8 - 16',
            metric: '4 - 7',
          },
          id: 'sibe',
          name: 'Siberian',
          cfa_url: 'http://cfa.org/Breeds/BreedsSthruT/Siberian.aspx',
          vetstreet_url: 'http://www.vetstreet.com/cats/siberian',
          vcahospitals_url:
            'https://vcahospitals.com/know-your-pet/cat-breeds/siberian',
          temperament:
            'Curious, Intelligent, Loyal, Sweet, Agile, Playful, Affectionate',
          origin: 'Russia',
          country_codes: 'RU',
          country_code: 'RU',
          description:
            'The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors. ',
          life_span: '12 - 15',
          indoor: 0,
          lap: 1,
          alt_names: 'Moscow Semi-longhair, HairSiberian Forest Cat',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          dog_friendly: 5,
          energy_level: 5,
          grooming: 2,
          health_issues: 2,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 4,
          stranger_friendly: 3,
          vocalisation: 1,
          experimental: 0,
          hairless: 0,
          natural: 1,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          wikipedia_url: 'https://en.wikipedia.org/wiki/Siberian_(cat)',
          hypoallergenic: 1,
          reference_image_id: '3bkZAjRh1',
        },
      ],
      id: 'FUJOW3SIi',
      url: 'https://cdn2.thecatapi.com/images/FUJOW3SIi.jpg',
      width: 3060,
      height: 1722,
    },
    {
      breeds: [
        {
          weight: {
            imperial: '7 - 14',
            metric: '3 - 6',
          },
          id: 'ebur',
          name: 'European Burmese',
          cfa_url: 'http://cfa.org/Breeds/BreedsCJ/EuropeanBurmese.aspx',
          temperament: 'Sweet, Affectionate, Loyal',
          origin: 'Burma',
          country_codes: 'MM',
          country_code: 'MM',
          description:
            'The European Burmese is a very affectionate, intelligent, and loyal cat. They thrive on companionship and will want to be with you, participating in everything you do. While they might pick a favorite family member, chances are that they will interact with everyone in the home, as well as any visitors that come to call. They are inquisitive and playful, even as adults. ',
          life_span: '10 - 15',
          indoor: 0,
          lap: 1,
          alt_names: '',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          cat_friendly: 4,
          dog_friendly: 4,
          energy_level: 4,
          grooming: 1,
          health_issues: 4,
          intelligence: 5,
          shedding_level: 3,
          social_needs: 5,
          stranger_friendly: 5,
          vocalisation: 4,
          experimental: 0,
          hairless: 0,
          natural: 0,
          rare: 0,
          rex: 0,
          suppressed_tail: 0,
          short_legs: 0,
          hypoallergenic: 0,
        },
      ],
      id: 'ATYs2BetM',
      url: 'https://cdn2.thecatapi.com/images/ATYs2BetM.jpg',
      width: 1920,
      height: 1440,
    },
    {
      breeds: [],
      id: 'p31g12IyE',
      url: 'https://cdn2.thecatapi.com/images/p31g12IyE.jpg',
      width: 1900,
      height: 1266,
    },
    {
      breeds: [],
      id: '5A6g4xtZo',
      url: 'https://cdn2.thecatapi.com/images/5A6g4xtZo.jpg',
      width: 3024,
      height: 4032,
    },
    {
      breeds: [],
      id: 'mnaeul1Gk',
      url: 'https://cdn2.thecatapi.com/images/mnaeul1Gk.jpg',
      width: 1265,
      height: 951,
    },
    {
      breeds: [],
      id: 'OixRI7qHN',
      url: 'https://cdn2.thecatapi.com/images/OixRI7qHN.jpg',
      width: 1200,
      height: 1200,
    },
    {
      breeds: [],
      id: 'b2TP8Z15f',
      url: 'https://cdn2.thecatapi.com/images/b2TP8Z15f.jpg',
      width: 1265,
      height: 951,
    },
    {
      breeds: [],
      id: 'LpkpO2jCb',
      url: 'https://cdn2.thecatapi.com/images/LpkpO2jCb.jpg',
      width: 429,
      height: 315,
    },
    {
      breeds: [],
      id: 'zfeiaRwc-B',
      url: 'https://cdn2.thecatapi.com/images/zfeiaRwc-B.false',
      width: 1000,
      height: 667,
    },
    {
      breeds: [],
      id: '4NNF8EwEP',
      url: 'https://cdn2.thecatapi.com/images/4NNF8EwEP.jpg',
      width: 700,
      height: 465,
    },
    {
      breeds: [],
      id: 'DxlC8ufjq',
      url: 'https://cdn2.thecatapi.com/images/DxlC8ufjq.false',
      width: 1000,
      height: 667,
    },
    {
      breeds: [],
      id: 'Hs99BTR0d',
      url: 'https://cdn2.thecatapi.com/images/Hs99BTR0d.jpg',
      width: 300,
      height: 168,
    },
    {
      breeds: [],
      id: 'iJk1-CXYP',
      url: 'https://cdn2.thecatapi.com/images/iJk1-CXYP.jpg',
      width: 3072,
      height: 2048,
    },
    {
      breeds: [],
      id: 'UZJoJBczj',
      url: 'https://cdn2.thecatapi.com/images/UZJoJBczj.jpg',
      width: 500,
      height: 334,
    },
    {
      breeds: [],
      id: 'i9voo7lqpY',
      url: 'https://cdn2.thecatapi.com/images/i9voo7lqpY.jpg',
      width: 4928,
      height: 3264,
    },
    {
      breeds: [],
      id: 'tXSD5qfr7',
      url: 'https://cdn2.thecatapi.com/images/tXSD5qfr7.jpg',
      width: 4608,
      height: 3072,
    },
    {
      breeds: [],
      id: 'fhHPIF7Sp',
      url: 'https://cdn2.thecatapi.com/images/fhHPIF7Sp.jpg',
      width: 329,
      height: 198,
    },
    {
      breeds: [],
      id: 'fe32hM21k',
      url: 'https://cdn2.thecatapi.com/images/fe32hM21k.jpg',
      width: 4621,
      height: 3462,
    },
  ];

  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/categories`
  );
  const categories = await categoriesResponse.json();

  // const imagesResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URI}/images/search?limit=5&order=ASC&page=0&mime_types=jpg,png&category_ids=`,
  //   {
  //     headers: {
  //       'x-api-key': process.env.X_API_KEY,
  //     },
  //   }
  // );
  // const images = await imagesResponse.json();

  return {
    props: {
      categories,
      // images,
    },
    revalidate: 1800,
  };
};
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
    }
  }
  .img-gallery {
    margin-top: 1em;
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
    cursor: zoom-in;
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
  }
`;
export default Gallery;

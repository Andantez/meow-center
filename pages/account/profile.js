import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';
import { useSWRInfinite } from 'swr';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import Skeleton from '../../components/Skeleton';
import { deleteFavourite } from '../../utils/userUtils';

const skeletonArray = Array.from({ length: 10 }, (_, index) => {
  return index;
});
const PAGE_SIZE = 2;
const getKey = (pageIndex, previousPageData, user_id) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `${process.env.NEXT_PUBLIC_API_BASE_URI}/favourites?sub_id=${user_id}&page=${pageIndex}&limit=${PAGE_SIZE}`; // SWR key
};
const Profile = () => {
  const { data: session, status } = useSession();
  const { name, email, id, image, provider } = session.user;
  const { data, error, isValidating, size, setSize, mutate } = useSWRInfinite(
    (...args) => getKey(...args, id)
  );
  const router = useRouter();
  const favourites = data ? [].concat(...data) : []; // convert favourites to single Array.
  const isEmpty = data?.[0]?.lenght === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const withCredentials = provider; // to be changed to provider === 'credentials
  // console.log(withCredentials);
  const tempImages = [
    {
      created_at: '2018-10-28T00:20:09.000Z',
      id: 1123,
      image: {
        id: 'b9c',
        url: 'https://cdn2.thecatapi.com/images/b9c.jpg',
      },
      image_id: 'b9c',
      sub_id: 'demo-252474',
      user_id: '4',
    },
    {
      created_at: '2018-10-28T00:36:35.000Z',
      id: 1126,
      image: {
        id: '3k8',
        url: 'https://cdn2.thecatapi.com/images/3k8.jpg',
      },
      image_id: '3k8',
      sub_id: 'demo-252474',
      user_id: '4',
    },
    {
      created_at: '2018-10-28T00:36:36.000Z',
      id: 1127,
      image: {
        id: 'mi',
        url: 'https://cdn2.thecatapi.com/images/mi.jpg',
      },
      image_id: 'mi',
      sub_id: 'demo-252474',
      user_id: '4',
    },
    {
      created_at: '2018-10-28T00:36:37.000Z',
      id: 1128,
      image: {
        id: '2c9',
        url: 'https://cdn2.thecatapi.com/images/2c9.jpg',
      },
      image_id: '2c9',
      sub_id: 'demo-252474',
      user_id: '4',
    },
    {
      created_at: '2018-10-28T00:50:43.000Z',
      id: 1129,
      image: {
        id: 'MjA3NTE1MA',
        url: 'https://cdn2.thecatapi.com/images/MjA3NTE1MA.jpg',
      },
      image_id: 'MjA3NTE1MA',
      sub_id: 'test',
      user_id: '4',
    },
    {
      created_at: '2018-10-28T00:51:38.000Z',
      id: 1131,
      image: {
        id: '6cs',
        url: 'https://cdn2.thecatapi.com/images/6cs.gif',
      },
      image_id: '6cs',
      sub_id: 'demo-440b14',
      user_id: '4',
    },
  ]; // temporary to reduce api calls.
  // console.log(session.user);
  const handleRemoveFavourite = async (id, index) => {
    const message = await deleteFavourite(id);
    mutate();
  };

  return (
    <StyledSection>
      <div className="profile-container">
        <div className="profile-img">
          {image && <img src={image} alt="profile" />}
        </div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p>{email}</p>
          {withCredentials && (
            <button type="button" className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="profile-gallery">
        <div>
          <hr />
        </div>
        <p>Favourite images: {isLoadingMore ? '...' : favourites.length}</p>
        <div className="images-container">
          {!favourites &&
            skeletonArray.map((_, index) => <Skeleton key={index} />)}
          {favourites &&
            favourites.map((image, index) => {
              const {
                image: { url },
                id,
              } = image;
              return (
                <div key={id} className="fav-img">
                  <Image
                    src={url}
                    alt="cat image"
                    width="200px"
                    height="200px"
                    layout="responsive"
                  />
                  <div
                    className="icon-delete"
                    onClick={(e) => handleRemoveFavourite(id, index)}
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
        </div>
        <button
          type="button"
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore || isReachingEnd}
        >
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more results'
            : 'Load More'}
        </button>
      </div>
    </StyledSection>
  );
};
Profile.auth = true;

const StyledSection = styled.section`
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em 0;
  font-family: var(--ff-paragraph);
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .profile-info {
    display: grid;
    gap: 1em;
    h1 {
      font-size: 1.5rem;
      color: var(--clr-primary-500);
    }

    p {
      color: var(--clr-grey);
    }
    margin-left: 1.75em;
  }

  .profile-img {
    display: flex;
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
  }

  .edit-btn {
    border: 1px solid var(--clr-grey);
    background-color: transparent;
    border-radius: 0.5em;
    padding: 0.5em;
    width: max-content;
    transition: box-shadow 250ms ease;
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 2px var(--clr-grey);
    }
  }

  .profile-gallery {
    padding-top: 3em;
    /* temporary */
    display: grid;
    gap: 3em;
  }

  .fav-img {
    display: block;
    position: relative;
    border-radius: 0.5em;
    transition: box-shadow 250ms ease;
    &:hover {
      box-shadow: 0 0 4px var(--clr-grey);
      cursor: zoom-in;
    }
  }

  .fav-img > div:first-child {
    border-radius: 0.5em;
  }
  .images-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }

  .icon-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: rgba(32, 32, 39, 0.5);
    border-radius: 50%;
    padding: 0.5em;
    transition: background-color 250ms ease;
    &:hover {
      cursor: pointer;
      background-color: rgba(32, 32, 39, 0.8);
    }
    svg {
      color: var(--clr-secondary-500);
    }
  }

  @media (min-width: 768px) {
    min-height: 100vh;
    .images-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    padding: 5em 0;
    .images-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .profile-info {
      h1 {
        font-size: 2rem;
      }
    }
  }
`;
export default Profile;

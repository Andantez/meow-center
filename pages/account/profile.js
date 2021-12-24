import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';
import useSWR from 'swr';
import Image from 'next/image';
import { IoTrashOutline } from 'react-icons/io5';

const Profile = () => {
  const { data: session, status } = useSession();
  const { name, email, id, image, provider } = session.user;
  const { data, error } = useSWR('https://api.thecatapi.com/v1/favourites'); // will fetch user favourite images.
  const router = useRouter();
  const withCredentials = provider; // to be changed to provider === 'credentials 
  console.log(withCredentials)
  // console.log(data);
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
  console.log(session.user);
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
        <div className="images-container">
          {tempImages.map((image) => {
            const {
              image: { url },
              id,
            } = image;
            return (
              <div key={id} className="fav-img">
                <Image src={url} alt="cat image" width="200px" height="200px" />
                <div className="icon-delete">
                  <IoTrashOutline />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledSection>
  );
};
Profile.auth = true;

const StyledSection = styled.section`
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--ff-paragraph);
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
    /* temporary */
  }
  .profile-info {
    display: grid;
    gap: 1em;
    h1 {
      font-size: 2rem;
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
    margin-top: 2em; 
    /* temporary */
  }
`;
export default Profile;

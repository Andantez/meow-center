import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';
import { useSWRInfinite } from 'swr';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import Skeleton from '../../components/Skeleton';
import { deleteFavourite } from '../../utils/userUtils';
import { useState } from 'react';
import {
  validateEmail,
  validatePassword,
  validateProfileDetails,
} from '../../utils/helpers';

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
  const {
    name: sessionName,
    email: sessionEmail,
    id,
    image,
    provider,
  } = session.user;
  const [userInfo, setUserInfo] = useState({
    name: sessionName,
    email: sessionEmail,
    oldPassword: '',
    newPassword: '',
    userId: id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileError, setProfileError] = useState({
    nameError: '',
    emailError: '',
    oldPasswordError: '',
    newPasswordError: '',
  });
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

  const handleRemoveFavourite = async (id, index) => {
    const message = await deleteFavourite(id);
    mutate();
  };
  const handleClick = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserInfo({ ...userInfo, [inputName]: inputValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSameName = userInfo.name === session.user.name;
    const isSameEmail = userInfo.email === session.user.email;
    const isChangingPassword = oldPassword.length > 0 || newPassword.length > 0;

    if (isSameName && isSameEmail && !isChangingPassword) {
      setIsEditing(false);
      setProfileError({
        ...profileError,
        nameError: '',
        emailError: '',
        passwordError: '',
      });
      return;
    }

    const profileDetailsErrors = validateProfileDetails(
      userInfo.name,
      userInfo.email,
      userInfo.oldPassword,
      userInfo.newPassword
    );

    if (profileDetailsErrors.errors) {
      setProfileError(profileDetailsErrors);
      return;
    }

    const res = await fetch('/api/users/updateProfile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();
    if (res.status === 409) {
      setProfileError({ ...profileError, emailError: data.message });
      return;
    }
    if (!data.status) {
      const { data: resDataErrors } = data;
      console.log(resDataErrors);
      setProfileError({
        ...profileError,
        nameError: resDataErrors.nameError,
        emailError: resDataErrors.emailError,
        passwordError: resDataErrors.passwordError,
      });
      return;
    }
    const updatedSession = await fetch('/api/auth/session?update=session'); // fetch the updated session.
    const sessionData = await updatedSession.json();
    // const newSession = await getSession();
    // console.log("updated session",newSession)
    console.log("session?update response",sessionData)
    reloadSession();
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const reloadSession = () => {
    // trigger session revalidation on the active browser tab.  when called and force next-auth to update the session.
    const event = new Event('visibilitychange');
    const eventRes = document.dispatchEvent(event);
    console.log(eventRes)
  };
  // console.log(session);
  const { name, email, oldPassword, newPassword } = userInfo;
  console.log(session)
  return (
    <StyledSection>
      <div className="profile-container">
        {isEditing ? (
          <div className="edit-container">
            <ul className="profile-section">
              <li
                className={`${!isChangingPassword ? 'changing-profile' : ''}`}
                onClick={() => setIsChangingPassword(false)}
              >
                Profile
              </li>
              <li
                className={`${isChangingPassword ? 'changing-password' : ''}`}
                onClick={() => setIsChangingPassword(true)}
              >
                Password
              </li>
            </ul>
            <form className="edit-form" onSubmit={handleSubmit}>
              {isChangingPassword ? (
                <>
                  <input
                    hidden
                    type="text"
                    autoComplete="username"
                    value={name}
                    readOnly
                  />
                  <div className="form-field">
                    <label htmlFor="old-password">Old Password</label>
                    <input
                      type="password"
                      id="old-password"
                      value={oldPassword}
                      autoComplete="current-password"
                      name="oldPassword"
                      onChange={handleChange}
                    />
                    {profileError.passwordError && (
                      <small>{profileError.passwordError}</small>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="new-password">New Password</label>
                    <input
                      type="password"
                      id="new-password"
                      value={newPassword}
                      autoComplete="new-password"
                      name="newPassword"
                      onChange={handleChange}
                    />
                    {profileError.passwordError && (
                      <small>{profileError.passwordError}</small>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      autoComplete="username"
                      name="name"
                      autoCapitalize="off"
                      autoCorrect="off"
                      onChange={handleChange}
                    />
                  </div>
                  {profileError.nameError && <p>{profileError.nameError}</p>}
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      autoComplete="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              {profileError.emailError && <p>{profileError.emailError}</p>}
              <div className="button-wrapper">
                <button type="submit" className="edit-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="profile-img">
              {image && <img src={image} alt="profile" />}
            </div>
            <div className="profile-info">
              <h1>{name}</h1>
              <p>{email}</p>
              {withCredentials && (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={handleClick}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="profile-gallery">
        <div>
          <hr />
        </div>
        <p>Favourite images: {isLoadingMore ? '...' : favourites.length}</p>
        <div className="images-container">
          {!data && skeletonArray.map((_, index) => <Skeleton key={index} />)}
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
                    title="Remove from favourites."
                    className="icon-delete"
                    onClick={(e) => handleRemoveFavourite(id, index)}
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
        </div>
        {favourites && (
          <div
            className={`button-wrapper ${isReachingEnd ? 'not-allowed' : ''}`}
          >
            <button
              type="button"
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore || isReachingEnd}
              className={`btn-more ${
                isReachingEnd ? 'disabled' : isLoadingMore ? 'loading' : ''
              }`}
            >
              {isLoadingMore
                ? 'Loading...'
                : isReachingEnd
                ? 'No more results'
                : 'Load More'}
            </button>
          </div>
        )}
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

  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.75em;
  }
  .btn-more {
    width: fit-content;
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.75em 2.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 0.875rem;
    text-transform: capitalize;
    cursor: pointer;
  }
  .btn-more.disabled {
    background-color: var(--clr-grey);
    pointer-events: none;
  }
  .btn-more.loading {
    cursor: wait;
  }

  .not-allowed {
    cursor: not-allowed;
  }

  .profile-section {
    .changing-password,
    .changing-profile {
      font-weight: var(--fw-bold);
      padding: 0.75em 1.5em;
      color: var(--clr-yellow);
    }
  }
  .edit-container {
    display: flex;
    flex-direction: column;
    font-family: var(--ff-paragraph);
    width: 100%;
  }

  .profile-section {
    display: flex;
    justify-content: center;
    li {
      padding: 0.75em 1.5em;
      cursor: pointer;
    }
  }

  .form-field {
    display: grid;
    gap: 0.5em;
    color: var(--clr-primary-500);
    label {
      font-weight: var(--fw-bold);
    }
    input {
      letter-spacing: 1px;
      padding: 0.5em 0;
      border: 1px solid transparent;
      background-color: hsl(270, 2%, 94%);
      text-indent: 0.75em;
      outline-color: var(--clr-grey);
      border-radius: 0.5em;
      width: 100%;
      padding-right: 2em;
      color: var(--clr-black);
    }

    input::-ms-reveal {
      display: none;
    }
    input:focus {
      background-color: transparent;
    }
  }
  @media (min-width: 768px) {
    min-height: 100vh;
    .images-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .btn-more {
      font-size: 1rem;
    }
  }

  .edit-form {
    display: grid;
    gap: 1.5em;
    padding-top: 1.5em;
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

    .edit-container {
      max-width: 30vw;
    }
  }
`;
export default Profile;

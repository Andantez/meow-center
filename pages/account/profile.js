import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { useSWRInfinite } from 'swr';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import Skeleton from '../../components/Skeleton';
import { deleteFavourite } from '../../utils/userUtils';
import { useEffect, useState } from 'react';
import { validateProfileDetails } from '../../utils/helpers';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { profileVariants } from '../../variants/animationVariants';
import Link from 'next/link';
import { MdFavorite } from 'react-icons/md';

const skeletonArray = Array.from({ length: 10 }, (_, index) => {
  return index;
});
const PAGE_SIZE = 24;
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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileError, setProfileError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isValidating, size, setSize, mutate } = useSWRInfinite(
    (...args) => getKey(...args, id)
  );

  const favourites = data ? [].concat(...data) : []; // convert favourites to single Array.
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const withCredentials = provider === 'credentials';

  const handleScroll = () => {
    setIsModalOpen(false)
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleRemoveFavourite = async (id, index) => {
    if (isModalOpen) setIsModalOpen(false);
    const message = await deleteFavourite(id);
    mutate();
  };
  const handleClick = () => {
    setIsEditing(true);
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

    reloadSession();
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const reloadSession = () => {
    // trigger session revalidation on the active browser tab.  when called and force next-auth to update the session.
    const event = new Event('visibilitychange');
    const eventRes = document.dispatchEvent(event);
    console.log(eventRes);
  };
  const { name, email, oldPassword, newPassword } = userInfo;
  return (
    <StyledSection>
      <div className="profile-container">
        <AnimatePresence exitBeforeEnter initial={false}>
          {isEditing ? (
            <motion.div
              key="edit-form"
              className="edit-container"
              initial="initial"
              animate="animate"
              variants={profileVariants}
              layout
            >
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
                  <div className="form-wrapper">
                    <input
                      hidden
                      type="text"
                      autoComplete="username"
                      value={name}
                      readOnly
                    />
                    <div className="form-field">
                      <label htmlFor="old-password">Old Password</label>
                      <div className="input-wrapper">
                        <input
                          className={`${
                            profileError.passwordError ? 'validation-error' : ''
                          }`}
                          type={showOldPassword ? 'text' : 'password'}
                          id="old-password"
                          value={oldPassword}
                          autoComplete="current-password"
                          name="oldPassword"
                          onChange={handleChange}
                        />
                        {oldPassword ? (
                          showOldPassword ? (
                            <AiFillEyeInvisible
                              className="icon icon-btn icon-dark"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            />
                          ) : (
                            <AiFillEye
                              className="icon icon-btn"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            />
                          )
                        ) : (
                          <RiLockPasswordFill
                            className="icon"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          />
                        )}
                      </div>
                      {profileError.passwordError &&
                        profileError.passwordError ===
                          'Passwords do not match' && (
                          <small className="error-message">
                            {profileError.passwordError}
                          </small>
                        )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="new-password">New Password</label>
                      <div className="input-wrapper">
                        <input
                          className={`${
                            profileError.passwordError ? 'validation-error' : ''
                          }`}
                          type={showNewPassword ? 'text' : 'password'}
                          id="new-password"
                          value={newPassword}
                          autoComplete="new-password"
                          name="newPassword"
                          onChange={handleChange}
                        />
                        {newPassword ? (
                          showNewPassword ? (
                            <AiFillEyeInvisible
                              className="icon icon-btn icon-dark"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          ) : (
                            <AiFillEye
                              className="icon icon-btn"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          )
                        ) : (
                          <RiLockPasswordFill
                            className="icon"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          />
                        )}
                      </div>
                      {profileError.passwordError &&
                        profileError.passwordError !==
                          'Passwords do not match' && (
                          <small className="error-message">
                            {profileError.passwordError}
                          </small>
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="form-wrapper">
                    <div className="form-field">
                      <label htmlFor="name">Name</label>
                      <div className="input-wrapper">
                        <input
                          className={`${
                            profileError.nameError ? 'validation-error' : ''
                          }`}
                          type="text"
                          id="name"
                          value={name}
                          autoComplete="username"
                          name="name"
                          autoCapitalize="off"
                          autoCorrect="off"
                          onChange={handleChange}
                        />
                        <IoMdPerson className="icon" />
                      </div>
                      {profileError.nameError && (
                        <small className="error-message">
                          {profileError.nameError}
                        </small>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <div className="input-wrapper">
                        <input
                          className={`${
                            profileError.emailError ? 'validation-error' : ''
                          }`}
                          type="email"
                          id="email"
                          value={email}
                          autoComplete="email"
                          name="email"
                          onChange={handleChange}
                        />
                        <MdEmail className="icon" />
                      </div>
                      {profileError.emailError && (
                        <small className="error-message">
                          {profileError.emailError}
                        </small>
                      )}
                    </div>
                  </div>
                )}
                <div className="button-wrapper">
                  <button type="submit" className="edit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="profile-info-container"
              key="profile-info"
              initial="initial"
              animate="animate"
              variants={profileVariants}
              layout
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="profile-gallery">
        <div>
          <hr />
        </div>
        {favourites.length > 0 && (
          <p>Favourite images: {isLoadingMore ? '...' : favourites.length}</p>
        )}
        {favourites.length > 0 && (
          <div className="images-container">
            <motion.div
              className={`shade ${isModalOpen ? 'visible' : ''}`}
              animate={{ opacity: isModalOpen ? 1 : 0 }}
              onClick={() => setIsModalOpen(false)}
            ></motion.div>
            {!data && skeletonArray.map((_, index) => <Skeleton key={index} />)}
            {favourites &&
              favourites.map((image, index) => {
                const {
                  image: { url },
                  id,
                } = image;
                return (
                  <motion.div
                    key={id}
                    className={`fav-img ${
                      imageIndex === index && isModalOpen ? 'open' : ''
                    } ${imageIndex === index ? 'selected-image' : ''}`}
                    onClick={
                      !isModalOpen
                        ? () => setImageIndex(index)
                        : () => setIsModalOpen(false)
                    }
                  >
                    <motion.div className="image-wrapper" layout>
                      <motion.div
                        className="wrapper-relative"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        layout
                      >
                        <Image
                          src={url}
                          alt="cat image"
                          width="200px"
                          height="200px"
                          layout="responsive"
                        />
                      </motion.div>
                      <motion.div
                        title="Remove from favourites"
                        className="icon-delete"
                        onClick={(e) => handleRemoveFavourite(id, index)}
                        layout
                      >
                        <MdDelete />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
          </div>
        )}

        {favourites.length > 0 && (
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
        {isEmpty && (
          <div className="no-results-container">
            <h2 className="no-results-header">
              Looks like you have no favourite images
            </h2>
            <p className="no-results-text">
              Explore the{' '}
              <Link href="/gallery">
                <a>Gallery</a>
              </Link>{' '}
              and add an image to your favourites by clicking the{' '}
              <span className="favourite-wrapper">
                <MdFavorite /> Like
              </span>{' '}
              button.
            </p>
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
    /* min-height: 18em; */
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
      width: 3.125em;
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
    &:active {
      transform: scale(0.95);
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

  .image-wrapper > div:first-child {
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
    padding-top: 1.5em;
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

  .profile-info-container {
    display: flex;
    align-items: center;
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

  .form-field .validation-error {
    border: 1px solid var(--clr-red-900);
  }

  .error-message {
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    color: var(--clr-red-900);
    padding-left: 1em;
  }

  .input-wrapper {
    position: relative;
  }
  .icon {
    position: absolute;
    top: 50%;
    right: 0.75em;
    transform: translateY(-50%);
    color: var(--clr-grey);
    /* font-size: 1.1rem; */
  }

  .icon-btn {
    cursor: pointer;
  }
  .icon-dark {
    color: var(--clr-black);
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
  .visible {
    pointer-events: auto;
    cursor: zoom-out;
  }
  .wrapper-relative > div {
    border-radius: 0.5em;
  }
  .open .image-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .open .image-wrapper .wrapper-relative {
    width: 100%;
    height: 100%;
  }
  .wrapper-relative > div:first-child {
    height: 100%;
  }
  .selected-image {
    z-index: 99;
  }
  .open .image-wrapper {
    max-width: 90vw;
    max-height: 50vh;
  }

  .fav-img.open .image-wrapper {
    cursor: zoom-out;
  }
  .fav-img.open {
    box-shadow: none;
    cursor: zoom-out;
  }
  .edit-form {
    padding-top: 1.5em;
  }

  .form-wrapper {
    display: grid;
    gap: 1.5em;
  }

  .no-results-container {
    display: grid;
    /* place-items: center; */
    grid-template-columns: 1fr;
    gap: 1em;
    width: auto;
  }

  .no-results-header {
    font-size: 1.5rem;
    color: var(--clr-primary-500);
    text-align: center;
  }
  .no-results-text {
    color: var(--clr-grey);
    text-align: center;
    letter-spacing: 0.5px;
    a {
      color: var(--clr-primary-500);
      font-weight: var(--fw-bold);
      text-decoration: underline;
    }
  }

  .favourite-wrapper {
    display: inline-block;
    padding: 0.25em;
    border-radius: 0.5em;
    border: 1px solid var(--clr-lightgrey);
    cursor: pointer;
    font-size: 0.8125rem;
    svg {
      color: var(--clr-red-100);
      vertical-align: middle;
      font-size: 0.9125rem;
    }
    &:active {
      background-color: hsl(270, 2%, 90%);
    }
  }
  @media (min-width: 600px) {
    .open .image-wrapper {
      max-width: 90vw;
      max-height: 70vh;
    }
  }
  @media (min-width: 768px) {
    min-height: 90vh;
    .images-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .btn-more {
      font-size: 1rem;
    }
  }

  @media (min-width: 800px) {
    .open .image-wrapper {
      max-width: 90vw;
      max-height: 80vh;
    }

    @media (min-width: 1000px) {
      .open .image-wrapper {
        max-width: 90vw;
        max-height: 90vh;
      }
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

    .edit-container {
      max-width: 30vw;
    }
  }

  @media (min-width: 1100px) {
    .open .image-wrapper {
      width: 900px;
      height: 800px;
    }
  }
`;
export default Profile;

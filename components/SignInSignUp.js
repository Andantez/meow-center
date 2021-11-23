import { ImTwitter } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdPerson } from 'react-icons/io';
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { useState } from 'react';
import { createUser } from '../utils/userUtils';
const SignInSignUp = ({ isSigningIn, setIsSigningIn }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = userDetails;

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleOnClick = (e) => {
    const name = e.target.getAttribute('name');
    setUserDetails({ ...userDetails, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      const user = { name, email, password };

      const createdUser = await createUser(name, email, password);
      // console.log(createdUser);
    }
  };
  return (
    <StyledDiv className={`sign-in-container ${!isSigningIn && 'signing-in'}`}>
      <h1>{isSigningIn ? 'Sign In' : 'Sign Up'} </h1>
      <form className="form" onSubmit={handleSubmit}>
        {!isSigningIn && (
          <div className="input-wrapper">
            <input
              required
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={handleOnChange}
            />
            {name ? (
              <AiOutlineClose
                className="icon icon-btn"
                onClick={handleOnClick}
                name="name"
              />
            ) : (
              <IoMdPerson className="icon" />
            )}
          </div>
        )}
        <div className="input-wrapper">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={handleOnChange}
          />
          {email ? (
            <AiOutlineClose
              className="icon icon-btn"
              onClick={handleOnClick}
              name="email"
            />
          ) : (
            <MdEmail className="icon" />
          )}
        </div>
        <div className="input-wrapper">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete={isSigningIn ? 'current-password' : 'new-password'}
            value={password}
            onChange={handleOnChange}
          />
          {password ? (
            showPassword ? (
              <AiFillEyeInvisible
                className="icon icon-btn"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEye
                className="icon icon-btn"
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          ) : (
            <RiLockPasswordFill className="icon" />
          )}
        </div>
        {isSigningIn && (
          <button type="button" className="forgot-btn">
            Forgot Password ?
          </button>
        )}
        {isSigningIn && (
          <button type="submit" className="submit-btn">
            sign in
          </button>
        )}
        {!isSigningIn && (
          <button type="submit" className="submit-btn">
            sign up
          </button>
        )}
      </form>
      <div className="providers-wrapper">
        <p>or {isSigningIn ? 'sign in' : 'sign up'} with</p>
        {/* <AiOutlineArrowDown /> */}
        <div className="providers-grid-wrapper">
          <button className="providers-btn google">
            <FcGoogle />
            Google
          </button>
          <button className="providers-btn facebook">
            <SiFacebook />
            Facebook
          </button>
          <button className="providers-btn twitter">
            <ImTwitter />
            Twitter
          </button>
        </div>
      </div>
      <p>
        {isSigningIn ? `Don't have an account ?` : 'Have an account ?'}
        <button
          type="button"
          className="sign-up-btn"
          onClick={() => setIsSigningIn(!isSigningIn)}
        >
          {isSigningIn ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  h1 {
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    color: var(--clr-primary-500);
    font-size: 2.5rem;
    text-align: center;
    /* margin-bottom: 2.5em; */
  }
  .form {
    display: flex;
    flex-direction: column;
    font-family: var(--ff-paragraph);
    margin-top: 2.5em;
    /* gap: 1.5em; */
    div:not(:first-child),
    button {
      margin-top: 1.5em;
    }
    input {
      letter-spacing: 1px;
      padding: 0.5em 0;
      border: none;
      background-color: var(--clr-secondary-500);
      text-indent: 0.75em;
      outline-color: var(--clr-grey);
      border-radius: 0.5em;
      width: 100%;
      padding-right: 2em;
    }
    input::-ms-reveal {
      display: none;
    }
    input::placeholder {
      color: var(--clr-grey);
      text-indent: 0.75em;
      font-size: 0.85rem;
    }
  }

  .submit-btn {
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.5em 2.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 1rem;
    text-transform: capitalize;
    cursor: pointer;
  }

  p {
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-normal);
    font-size: 1rem;
    color: var(--clr-primary-500);
    text-align: center;
  }
  .sign-up-btn {
    font-weight: var(--fw-bold);
    border: none;
    background-color: transparent;
    color: var(--clr-primary-500);
    cursor: pointer;
    margin-left: 0.25em;
  }
  .providers-grid-wrapper {
    display: grid;
    gap: 1em;
    margin-top: 1em;
  }
  .providers-wrapper {
    padding: 1em 0;
    svg {
      display: block;
      color: var(--clr-black);
    }
  }
  .providers-wrapper > svg {
    margin: 0 auto;
  }
  .providers-btn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-family: var(--ff-paragraph);
    color: var(--clr-secondary-500);
    cursor: pointer;
    letter-spacing: 1px;
    svg {
      margin-right: 0.25em;
    }
  }

  .google {
    background-color: #ffffff;
    color: var(--clr-grey);
  }

  .twitter svg,
  .facebook svg {
    color: var(--clr-secondary-500);
  }
  .twitter {
    background-color: #1da1f2;

    svg {
      background-color: #1da1f2;
    }
  }
  .facebook {
    background-color: #4267b2;

    svg {
      background-color: #4267b2;
    }
  }

  .forgot-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    padding: 0.5em 0;
    text-underline-offset: 1px;
  }
  .input-wrapper {
    position: relative;
  }
  .icon {
    position: absolute;
    top: calc(50%);
    right: 0.75em;
    transform: translateY(-50%);
    color: var(--clr-grey);
  }
  .icon-btn {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    margin: 5em 2em;
    p:last-child {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .form {
      & > div {
        width: 50%;
        margin: 0 auto;
      }
    }
    .submit-btn,
    .providers-btn {
      width: 50%;
      margin: 0 auto;
    }
  }
`;
export default SignInSignUp;

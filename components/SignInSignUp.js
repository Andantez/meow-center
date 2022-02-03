import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { createUser } from '../utils/userUtils';
import { validateEmail, validatePassword } from '../utils/helpers';
import Link from 'next/link';

const SignInSignUp = ({ isSigningIn, setIsSigningIn, providers }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = userDetails;
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    authenticated: '',
    ok: false,
    message: '',
  });
  const router = useRouter();
  useEffect(() => {
    setErrors({ name: '', email: '', password: '', authenticated: '' });
  }, [isSigningIn]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateOnSubmit = () => {
    const formErrors = errors;

    formErrors.name = isSigningIn
      ? ''
      : name.trim().length < 2
      ? 'Name must be at least 2 characters long!'
      : '';

    formErrors.email =
      email.length === 0 // change error massage if the input field is empty or invalid.
        ? 'Enter your email address'
        : validateEmail(email)
        ? ''
        : 'Enter a valid email address e.g in the format user@domain.com';

    if (isSigningIn) {
      formErrors.password = password.length === 0 ? 'Enter your password' : '';
    } else {
      formErrors.password = validatePassword(password)
        ? ''
        : 'Your password must be at least 6 characters long, contain at least one number and have a combination of uppercase and lowercase letters.';
    }

    setErrors({ ...formErrors });
  };
  const validateForm = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const formErrors = errors;
    switch (inputName) {
      case 'name': {
        formErrors.name =
          inputValue.trim().length < 2
            ? 'Name must be at least 2 characters long!'
            : '';
        break;
      }
      case 'email': {
        formErrors.email =
          inputValue.length === 0 // change error massage if the input field is empty or invalid.
            ? 'Enter your email address'
            : validateEmail(inputValue)
            ? ''
            : 'Enter a valid email address e.g in the format user@domain.com';
        break;
      }
      case 'password': {
        formErrors.password = validatePassword(inputValue)
          ? ''
          : 'Your password must be at least 6 characters long, contain at least one number and have a combination of uppercase and lowercase letters.';
        break;
      }
      default:
        break;
    }

    setErrors({ ...formErrors });
  };

  const handleOnClick = (e) => {
    const name = e.target.getAttribute('name');
    setUserDetails({ ...userDetails, [name]: '' });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    validateOnSubmit();
    const itsInvalidForm =
      !name ||
      !email ||
      !password ||
      errors.name ||
      errors.email ||
      errors.password;

    if (itsInvalidForm) {
      return;
    }
    const createdUser = await createUser(name, email, password); // check user input and if valid create user and returns the user else return object with errors.

    if (!createdUser.ok) {
      setErrors({ ...errors, ...createdUser });
    }
    signIn('credentials', {
      name,
      email,
      password,
    });
    return;
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    validateOnSubmit();

    const itsInvalidForm =
      !email || !password || errors.email || errors.password;

    if (itsInvalidForm) {
      return;
    }
    const signInResponse = await signIn('credentials', {
      redirect: false,
      name,
      email,
      password,
    });
    if (signInResponse.status === 200 && signInResponse.ok) {
      router.push('/');
    }
    if (signInResponse.status == 401 && signInResponse.ok === false) {
      setErrors({
        ...errors,
        authenticated: 'The email or password is incorrect.',
      });
    }
  };
  return (
    <StyledDiv className={`sign-in-container ${!isSigningIn && 'signing-in'}`}>
      <h1>{isSigningIn ? 'Sign In' : 'Sign Up'} </h1>

      <form
        className="form"
        onSubmit={isSigningIn ? handleLogInSubmit : handleSignUpSubmit}
        noValidate
      >
        <small className="error-message">
          {errors.authenticated && `${errors.authenticated}`}
        </small>
        {/* if the user is not signing in e.g. is registering show the registering show name input field */}
        {!isSigningIn && (
          <div className="input-wrapper">
            <input
              className={`${errors.name && 'validation-error'}`}
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={handleOnChange}
              // If the user is signing in disable the onBlur event listener.
              onBlur={!isSigningIn ? validateForm : undefined}
              // autoFocus
            />
            {name ? (
              <AiOutlineClose
                className="icon icon-btn icon-dark"
                onClick={handleOnClick}
                name="name"
              />
            ) : (
              <IoMdPerson className="icon" />
            )}
          </div>
        )}
        {/* show the user error  */}
        {errors.name && <small className="error-message">{errors.name}</small>}
        <div className="input-wrapper">
          <input
            className={`${errors.email && 'validation-error'}`}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={handleOnChange}
            // If the user is signing in disable the onBlur event listener.
            onBlur={!isSigningIn ? validateForm : undefined}
          />
          {email ? (
            <AiOutlineClose
              className="icon icon-btn icon-dark"
              onClick={handleOnClick}
              name="email"
            />
          ) : (
            <MdEmail className="icon" />
          )}
        </div>
        {/* show the user error  */}
        {errors.email && (
          <small className="error-message">{errors.email}</small>
        )}
        <div className="input-wrapper">
          <input
            className={`${errors.password && 'validation-error'}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete={isSigningIn ? 'current-password' : 'new-password'}
            value={password}
            onChange={handleOnChange}
            // If the user is signing in disable the onBlur event listener.
            onBlur={!isSigningIn ? validateForm : undefined}
          />
          {password ? (
            showPassword ? (
              <AiFillEyeInvisible
                className="icon icon-btn icon-dark"
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
        {/* show the user error  */}
        {errors.password && (
          <small className="error-message">{errors.password}</small>
        )}
        {isSigningIn && (
          <Link href="/account/forgottenpassword">
            <a className="forgot-link">Forgot Password?</a>
          </Link>
        )}
        <button type="submit" className="submit-btn">
          {isSigningIn ? 'sign in' : 'sign up'}
        </button>
      </form>
      <div className="providers-wrapper">
        {/* <p>or</p> */}
        <hr className="hr-line" />
        <div className="providers-grid-wrapper">
          {providers.map((provider) => {
            const { id, name } = provider;
            return (
              <button
                key={id}
                className={`providers-btn ${id}`}
                onClick={() =>
                  signIn(id, { callbackUrl: 'https://meow-portal.vercel.app/' })
                }
              >
                {name === 'Google' ? <FcGoogle /> : <SiFacebook />}
                Continue with {name}
              </button>
            );
          })}
          {/* <button className="providers-btn google">
            <FcGoogle />
            Google
          </button>
          <button className="providers-btn facebook">
            <SiFacebook />
            Facebook
          </button> */}
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
      border: 1px solid transparent;
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
    padding: 0.75em 2.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 0.938rem;
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
    padding: 0.75em;
    border-radius: 0.5em;
    font-family: var(--ff-paragraph);
    font-size: 0.875rem;
    color: var(--clr-secondary-500);
    cursor: pointer;
    /* letter-spacing: 1px; */
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

  .forgot-link {
    /* background-color: transparent;
    border: none; */
    cursor: pointer;
    text-decoration: underline;
    padding: 0.5em 0;
    text-underline-offset: 1px;
    text-align: center;
    margin-top: 1.5em;
    width: max-content;
    align-self: center;
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
  }
  .icon-btn {
    cursor: pointer;
  }
  .icon-dark {
    color: var(--clr-black);
  }
  .error-message {
    font-family: var(--ff-paragraph);
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    color: var(--clr-red-900);
    padding-left: 1em;
    margin-top: 0.5em;
  }
  input.validation-error {
    border: 1px solid var(--clr-red-900);
  }

  .hr-line {
    border-top: 1px solid var(--clr-grey);
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
    .error-message {
      width: 50%;
      margin: 0.5em auto 0;
      line-height: 1.25em;
    }
    .hr-line {
      width: 50%;
      margin: 0 auto;
    }
  }
`;
export default SignInSignUp;

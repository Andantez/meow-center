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
import Form from '../components/Form';
import SignIn from './SignIn';
import { AnimatePresence, motion } from 'framer-motion';

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
    const createdUserResponse = await createUser(name, email.toLocaleLowerCase(), password); // check user input and if valid create user and returns the user else return object with errors.
  
    if (!createdUserResponse.ok) {
      setErrors({ ...errors, email: createdUserResponse.message });
      return;
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
      email: email.toLocaleLowerCase(),
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
      <AnimatePresence exitBeforeEnter initial={false}>
        {isSigningIn ? (
          <motion.h1
            key="sign-in-header"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            Sign In
          </motion.h1>
        ) : (
          <motion.h1
            key="sign-up-header"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            Sign Up
          </motion.h1>
        )}
      </AnimatePresence>

      {/* ............................... */}
      <AnimatePresence exitBeforeEnter initial={false}>
        {isSigningIn ? (
          <SignIn
            key="sign-in-form"
            handleLogInSubmit={handleLogInSubmit}
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClick}
            errors={errors}
            showPassword={showPassword}
            userDetails={userDetails}
            setShowPassword={setShowPassword}
          />
        ) : (
          <Form
            key="sign-up-form"
            handleSignUpSubmit={handleSignUpSubmit}
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClick}
            errors={errors}
            validateForm={validateForm}
            showPassword={showPassword}
            userDetails={userDetails}
            setShowPassword={setShowPassword}
          />
        )}
      </AnimatePresence>
      {/* ............................... */}
      <div className="providers-wrapper">
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
  overflow: hidden;
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
    cursor: pointer;
    text-decoration: underline;
    padding: 0.5em 0;
    text-underline-offset: 1px;
    text-align: center;
    margin-top: 1.5em;
    width: max-content;
    align-self: center;
    height: 2.313em;
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

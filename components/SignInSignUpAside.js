import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
const SignInSignUpAside = ({ isSigningIn, setIsSigningIn }) => {
  return (
    <StyledDiv className={`button-container ${!isSigningIn && 'signing-in'}`}>
      {/* <h2>{isSigningIn ? `Don't Have an account ?` : 'Have an account ?'}</h2> */}
      <AnimatePresence exitBeforeEnter initial={false}>
        {isSigningIn ? (
          <motion.h2
            key="sign-in-header"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            Don't Have an Account
          </motion.h2>
        ) : (
          <motion.h2
            key="sign-up-header"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            Have an account?
          </motion.h2>
        )}

        {/* <p>
        {isSigningIn
          ? 'Join us and save your favourite pictures'
          : 'Sign in and access your favourite pictures'}
      </p> */}
        {isSigningIn ? (
          <motion.p
            key="sign-in-paragraph"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {' '}
            'Join us and save your favourite pictures'
          </motion.p>
        ) : (
          <motion.p
            key="sign-up-paragraph"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            'Sign in and access your favourite pictures'
          </motion.p>
        )}
        {/* <button
        className="submit-btn"
        onClick={() => setIsSigningIn(!isSigningIn)}
      >
        {isSigningIn ? 'Sign Up' : 'Sign In'}
      </button> */}
        {isSigningIn ? (
          <motion.button
            key="sign-up-btn"
            className="submit-btn"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSigningIn(!isSigningIn)}
          >
            Sign Up
          </motion.button>
        ) : (
          <motion.button
            key="sign-in-btn"
            className="submit-btn"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSigningIn(!isSigningIn)}
          >
            Sign In
          </motion.button>
        )}
      </AnimatePresence>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: none;
  text-align: center;
  overflow: hidden;
  .submit-btn {
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.75em 3.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 0.938rem;
    text-transform: capitalize;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    display: grid;
    place-content: center;
    gap: 2em;
    padding: 2.5em 2em;
    background-color: var(--clr-secondary-500);
    h2 {
      font-size: 2rem;
      font-family: var(--ff-paragraph);
      color: var(--clr-primary-500);
      text-align: center;
    }
    p {
      color: var(--clr-primary-300);
    }
  }

  @media (min-width: 1024px) {
    .submit-btn {
      width: fit-content;
      margin: 0 auto;
    }
  }
`;
export default SignInSignUpAside;

import styled from 'styled-components';

const SignInSignUpAside = ({ isSigningIn, setIsSigningIn }) => {
  return (
    <StyledDiv className={`button-container ${!isSigningIn && 'signing-in'}`}>
      <h2>{isSigningIn ? `Don't Have an account ?` : 'Have an account ?'}</h2>
      <p>
        {isSigningIn
          ? 'Join us and save your favourite pictures'
          : 'Sign in and access your favourite pictures'}
      </p>
      <button
        className="submit-btn"
        onClick={() => setIsSigningIn(!isSigningIn)}
      >
        {isSigningIn ? 'Sign Up' : 'Sign In'}
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: none;
  text-align: center;
  .submit-btn {
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.75em 3.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 1rem;
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

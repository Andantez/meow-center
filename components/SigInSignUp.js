import styled from 'styled-components';

const SignInSignUp = () => {
  return (
    <StyledDiv>
      <h2>Don't Have an account ?</h2>
      <p>Join us and save your favourite pictures</p>
      <button className="submit-btn">Sign Up</button>
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
    padding: 0.5em 2.5em;
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
export default SignInSignUp;

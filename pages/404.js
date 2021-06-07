import styled from 'styled-components';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <StyledDiv>
      <h1>404</h1>
      <h2>This page could not be found.</h2>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
  width: 90vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 2em;
  height: 100vh;
  h1 {
    color: var(--clr-yellow);
    font-family: var(--ff-heading);
    font-size: 7rem;
  }

  h2 {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    font-size: 1.5rem;
    font-weight: var(--fw-light);
  }

  a {
    font-family: var(--ff-paragraph);
    color: var(--clr-secondary-500);
    text-transform: capitalize;
    background-color: var(--clr-primary-500);
    padding: 0.75em 1.25em;
    border-radius: 0.5em;
    transition: all 250ms ease;
    :hover {
      box-shadow: 1px 2px 5px var(--clr-black);
    }

    :active {
      transform: scale(0.95);
    }
  }

  @media (min-width: 1200px) {
    a {
      padding: 1em 1.5em;
    }

    h1 {
      font-size: 9rem;
    }

    h2 {
      font-size: 2.5rem;
    }
  }
`;
export default Custom404;

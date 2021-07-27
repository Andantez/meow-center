import Head from 'next/head';
import styled from 'styled-components';
import MyImage from './MyImage';

const BreedsHero = () => {
  return (
    <StyledDiv>
      <Head>
        <title>Cat Breeds | Meow Portal</title>
      </Head>
      <section>
        <div className="heading-wrapper">
          <h1>
            <span>find the right cat</span> <span>breed for you</span>
          </h1>
        </div>
        <div className="img-wrapper">
          <MyImage
            src="/hero-cat2_ts5hlr.png"
            width="350"
            height="250"
            alt="white cat"
            priority={true}
          />
        </div>
      </section>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: var(--clr-primary-500);

  section {
    display: grid;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
    padding: 4em 0 5em;
  }
  h1 {
    font-size: 2rem;
    color: var(--clr-primary-500);
    font-family: var(--ff-heading);
    text-align: center;
    padding: 0.5em;
    background: var(--clr-secondary-500);

    span {
      display: block;
      position: relative;
      z-index: 2;
    }
  }
  .heading-wrapper {
    position: relative;
    z-index: 2;
  }
  .heading-wrapper::before {
    content: '';
    position: absolute;
    width: 65%;
    height: 70%;
    background: var(--clr-red-500);
    left: -0.8em;
    top: -0.8em;
    z-index: -1;
  }
  .img-wrapper {
    display: none;
  }

  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(2, 1fr);
      padding: 4em 0 8em;
      max-width: 1200px;
    }
    h1 {
      padding: 0.75em;
    }
    .heading-wrapper {
      place-self: center start;
    }
    .img-wrapper {
      display: block;
      place-self: end;
      position: relative;
      z-index: 2;
      & > div {
        display: block !important;
      }
    }

    .img-wrapper::before {
      content: '';
      position: absolute;
      width: 40%;
      height: 20%;
      background: var(--clr-red-500);
      top: -0.7em;
      right: -0.7em;
    }
    .img-wrapper::after {
      content: '';
      position: absolute;
      width: 40%;
      height: 20%;
      background: var(--clr-red-500);
      bottom: -0.7em;
      left: -0.7em;
      z-index: -1;
    }
  }

  @media (min-width: 1200px) {
    clip-path: polygon(100% 0, 100% 100%, 19% 100%, 0 75%, 0 0);
  }
`;
export default BreedsHero;

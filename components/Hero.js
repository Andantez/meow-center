import Image from 'next/image';
import styled from 'styled-components';
import Ztext from 'react-ztext';
import Search from './Search';
import { BsSearch } from 'react-icons/bs';

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero-container">
        <div className="left-container">
          <Ztext
            depth="1.5rem"
            direction="forwards"
            event="none"
            eventRotation="20deg"
            eventDirection="default"
            fade={false}
            layers={10}
            perspective="600px"
            style={{
              color: 'hsl(204, 33%, 97%)',
            }}
          >
            <h1>
              <span className="z-layer">Meow Portal</span>
            </h1>
          </Ztext>
          <div className="arrow-wrapper">
            <p>learn more about your</p>
            <p>cat breed</p>
          </div>
          <Search />
        </div>
        <div className="middle-container">
          <Image
            src="/images/hero-cat.jpg"
            alt="white grey cat"
            width="280"
            height="180"
            priority
          />
        </div>
        <div className="right-container">
          <Image
            // src="/images/hero-cat3.jpg"
            src="/images/shy-kitty.png"
            alt="bengal cat"
            width="589"
            height="690"
            priority
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-primary-500);
  position: relative;
  background:var(--clr-primary-500);
  .hero-container {
    display: grid;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
    padding-top: 2em;
  }
  .left-container {
    position: relative;
    color: var(--clr-secondary-500);
    span:not(:first-child) {
      color: var(--clr-black);
    }

    h1 {
      font-family: var(--ff-heading);
      font-size: 2.25rem;
      margin: 0.6em 0;
    }

    p {
      font-family: var(--ff-paragraph);
      text-transform: capitalize;
      color: var(--clr-primary-500);
      font-weight: var(--fw-bold);
      letter-spacing: 0.1em;
      font-size: 1em;
      & + p {
        margin-top: 0.25em;
      }
    }
  }
  .arrow-wrapper {
    text-align: center;
    position: relative;
    background: var(--clr-secondary-500);
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .left-container::before {
    content: '';
    position: absolute;
    width: 75%;
    height: 70%;
    background: var(--clr-red-500);
    top: -5%;
    left: -30%;
  }
  .middle-container,
  .right-container {
    display: none;
  }
  @media (min-width: 992px) {
    .hero-container {
      grid-template-columns: 1.5fr 1fr;
      max-width: 1200px;
      place-items: center flex-start;
    }

    .left-container {
      margin-left: 1em;
      h1 {
        font-size: 3rem;
      }
      p {
        font-size: 1.125em;
      }
    }

    .right-container {
      display: grid;
      margin-top: 2em;
    }
  }

  @media (min-width: 1200px) {
    & {
      clip-path: polygon(100% 0, 100% 100%, 19% 100%, 0 75%, 0 0);
    }

    .hero-container {
      grid-template-columns: 1.5fr 1fr 1fr;
    }
    .middle-container {
      display: grid;
      justify-self: end;
      margin-right: -5em;
      z-index: 1;
      border: .75em solid var(--clr-primary-500);
    }
  }
`;
export default Hero;

import Image from 'next/image';
import styled from 'styled-components';
import Ztext from 'react-ztext';
import Search from './Search';
import { BsSearch } from 'react-icons/bs';
import { ImArrowDown } from 'react-icons/im';

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero-container">
        <div className="left-container">
          <Ztext
            depth="1.5rem"
            direction="forwards"
            event="pointer"
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
            <p>
              cat breed <ImArrowDown className="arrow" />
            </p>
          </div>
          <Search />
        </div>
        <div className="middle-container">
          <Image
            src="/images/hero-cat.jpg"
            alt="white grey cat"
            width="300"
            height="200"
          />
        </div>
        <div className="right-container">
          <Image
            // src="/images/hero-cat3.jpg"
            src="/images/shy-kitty.png"
            alt="bengal cat"
            width="589"
            height="690"
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-primary-500);
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(52, 52, 70, 1) 0%,
    rgba(74, 74, 100, 1) 100%
  );
  .hero-container {
    display: grid;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
  }
  .left-container {
    color: var(--clr-secondary-500);
    span:not(:first-child) {
      color: var(--clr-black);
    }

    h1 {
      font-family: var(--ff-heading);
      font-size: 2.25rem;
      margin: 1em 0;
    }

    p {
      font-family: var(--ff-paragraph);
      text-transform: capitalize;
      color: var(--clr-secondary-500);
      letter-spacing: 0.1em;
      & + p {
        margin-top: 0.25em;
      }
    }
  }
  .arrow-wrapper {
    position: relative;
  }
  .arrow {
    color: var(--clr-red-500);
    font-size: 1.5rem;
    position: absolute;
    bottom: -0.4em;
    left: 4em;
  }
  .middle-container,
  .right-container {
    display: none;
  }
  @media (min-width: 992px) {
    .hero-container {
      grid-template-columns: 1fr 1fr 1fr;
      max-width: 1200px;
      place-items: center flex-start;
    }
    .left-container {
      margin-left: 1em;
      h1 {
        font-size: 3rem;
      }
    }
    .middle-container {
      display: grid;
      justify-self: end;
      margin-right: -5em;
      position: relative;
      z-index: 1;
      background: rgb(52, 52, 70);
      background: linear-gradient(90deg, #404056 90%, rgba(74, 74, 100, 1) 100%);
      padding: 0.75em 0.75em 0.75em 0;
      /* border: 0.75em solid var(--clr-primary-400); */
    }

    .right-container {
      display: grid;
      margin-top: 2em;
    }
  }

  @media (min-width: 1200px) {
    & {
      clip-path: polygon(100% 0, 100% 100%, 19% 100%, 0 85%, 0 0);
    }
  }
`;
export default Hero;

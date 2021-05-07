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
            event="pointer"
            eventRotation="20deg"
            eventDirection="default"
            fade={false}
            layers={10}
            perspective="600px"
            style={{
              color: '#202027',
            }}
          >
            <h1>
              <span className="z-layer">Meow Portal</span>
            </h1>
          </Ztext>
          <p>learn more about your cat breed</p>
          <Search />
        </div>
        <div className="right-container">
          <Image
            src="/images/hero-cat.jpg"
            alt="white/grey cat"
            width="500"
            height="350"
          />
          <Image
            src="/images/hero-cat3.jpg"
            alt="white/grey cat"
            width="590"
            height="700"
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-primary-500);

  .hero-container {
    display: grid;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
  }
  .left-container {
    color: var(--clr-secondary-500);

    span:not(:first-child) {
      color: var(--clr-secondary-500);
    }

    h1 {
      font-family: var(--ff-heading);
      font-size: 2.25rem;
      margin: 1em 0;
      letter-spacing: 0.1em;
    }

    p {
      font-family: var(--ff-paragraph);
      text-transform: capitalize;
      color: var(--clr-secondary-500);
      /* opacity: 0.9; */
      margin-bottom: 1em;
      width: 50%;
      letter-spacing: 0.1em;
    }
  }
  .right-container {
    display: none;
  }
  @media (min-width: 992px) {
    .right-container {
      display: grid;
    }
  }
`;
export default Hero;

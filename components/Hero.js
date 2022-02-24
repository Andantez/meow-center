import styled from 'styled-components';
import Search from './Search';
import MyImage from './MyImage';
import { motion } from 'framer-motion';
import { fadeInDown, containerVariants } from '../variants/animationVariants';
import { useEffect, useState } from 'react';
const Hero = ({ frontHeroImg, backHeroImg }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    const height = document.querySelector('header').offsetHeight;
    setHeaderHeight(height);
  }, []);
  return (
    <Wrapper headerHeight={headerHeight}>
      <motion.div
        className="hero-container"
        // initial="initial"
        // animate="animate"
      >
        <motion.div className="left-container" variants={containerVariants}>
          <div className="blob">
            <MyImage
              src="/primary-blob_onkar3"
              width={'200'}
              height="200"
              layout="responsive"
            />
          </div>
          <motion.h1 variants={fadeInDown}>
            <span className="z-layer">Meow Portal</span>
          </motion.h1>
          <motion.div className="arrow-wrapper" variants={fadeInDown}>
            <p>learn more about your</p>
            <p>cat breed</p>
          </motion.div>
          <motion.div variants={fadeInDown}>
            <Search />
          </motion.div>
        </motion.div>
        <div className="middle-container">
          <MyImage
            src="/hero-cat_qjqfte.jpg"
            alt="white grey cat"
            width="280"
            height="180"
            priority={true}
            placeholder="blur"
            blurDataURL={frontHeroImg.blurDataURL}
          />
        </div>
        <div className="right-container">
          <MyImage
            src="/shy-kitty_tavulr.png"
            alt="bengal cat"
            width="589"
            height="690"
            priority={true}
            placeholder="blur"
            blurDataURL={backHeroImg.blurDataURL}
          />
        </div>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  /* background: var(--clr-primary-500); */
  z-index: 99;
  height: ${(props) => `calc(100vh - ${props.headerHeight}px)`};
  display: flex;
  .hero-container {
    display: grid;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
    /* padding-top: 3em; */
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
    .z-layer {
      position: relative;
      z-index: 1;
    }
  }

  .arrow-wrapper {
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
    /* content: ''; */
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
  .middle-container {
    border-radius: 0.5em;
  }
  .right-container {
    position: relative;
    /* border-top: 0.75em solid var(--clr-primary-500);
    border-bottom: 0.75em solid var(--clr-primary-500); */
    border: 0.75em solid var(--clr-primary-500);
    border-radius: 0.5em;
  }

  .right-container::after,
  .right-container::before {
    content: '';
    position: absolute;
  }

  .right-container::before {
    top: -0.75em;
    left: -0.75em;
    background-color: var(--clr-primary-500);
    width: 0.75em;
    height: 100%;
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }
  .right-container::after {
    top: -0.75em;
    right: -0.75em;
    background-color: var(--clr-primary-500);
    width: 0.75em;
    height: 100%;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }
  .blob {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-55deg) scale(1.75);
    z-index: -1;
  }

  @media (min-width: 992px) {
    .hero-container {
      grid-template-columns: 1.5fr 1fr;
      max-width: 1200px;
      place-items: center flex-start;
      /* padding-bottom: 3em; */
    }

    .left-container {
      margin-left: 1em;
      h1 {
        font-size: 3rem;
      }
    }
    .arrow-wrapper {
      p {
        font-size: 1.125rem;
      }
    }
    .right-container {
      display: grid;
      margin-top: 2em;
    }
  }

  @media (min-width: 1200px) {
    .hero-container {
      grid-template-columns: 1.5fr 1fr 1fr;
    }
    .middle-container {
      display: grid;
      justify-self: end;
      margin-right: -5em;
      z-index: 1;
      border: 0.75em solid var(--clr-primary-500);
    }
  }
`;
export default Hero;

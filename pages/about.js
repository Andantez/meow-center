import Head from 'next/head';
import styled from 'styled-components';
import MyImage from '../components/MyImage';
import { motion } from 'framer-motion';
import {
  fadeInAndUp,
  stagger,
  fadeInDown,
} from '../variants/animationVariants';

const About = () => {
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head>
        <title>About | Meow Portal</title>
      </Head>
      <StyledSection>
        <motion.div className="img-container" variants={fadeInDown}>
          <MyImage
            src="/about-page-cat_kiw16m.jpg"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <motion.div
          className="info"
          variants={stagger}
          custom={{
            staggerDuration: 0.1,
            staggerDirection: 1,
            delayChildren: 0.2,
          }}
        >
          <motion.h1 variants={fadeInAndUp}>About Meow Portal</motion.h1>
          <motion.p variants={fadeInAndUp}>
            <span className="name">Meow Portal</span> is an extensive directory
            for all cat lovers. Here you can find detailed information about
            most cat breeds. Explore the gallery save your favourite pictures,
            compare your favourite breeds and find the typical characteristics
            of each of them.
          </motion.p>
          <motion.p variants={fadeInAndUp}>
            The app was created by a cat lover as a hobby during lockdown. This
            app will give you information and help you decide which
            breed is most suited for your family and lifestyle if you are looking for a cat
            pet.
          </motion.p>
        </motion.div>
      </StyledSection>
    </motion.div>
  );
};

const StyledSection = styled.section`
  width: 90vw;
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  gap: 2em;
  min-height: 100vh;
  font-family: var(--ff-paragraph);

  .img-container {
    position: relative;
    width: 100%;
    height: 300px;

    div {
      border-radius: 0.5em;
    }
  }

  .info {
    display: grid;
    gap: 1em;
  }
  h1 {
    position: relative;
    font-size: 2.25rem;
    color: var(--clr-primary-500);
  }

  h1::after {
    content: '';
    position: absolute;
    width: 2.85em;
    height: 0.25rem;
    bottom: -0.125em;
    left: 0;
    background-color: var(--clr-yellow);
  }
  p {
    color: var(--clr-primary-400);
    line-height: 1.5;
    letter-spacing: 0.5px;
  }
  .name {
    font-weight: var(--fw-bold);
  }
  @media (min-width: 1024px) {
    background: linear-gradient(
        180deg,
        rgba(242, 246, 249, 0.1) 0%,
        rgba(244, 247, 250, 0) 50%,
        rgba(245, 248, 250, 0.1) 80%,
        rgba(246, 249, 250, 0.9) 100%
      ),
      url('/images/about-page-cat.jpg') center / cover no-repeat;
    margin: 0;
    width: 100%;
    justify-content: center;
    .img-container {
      display: none;
      background: red;
    }

    .info {
      width: 90vw;
      max-width: 1200px;
      margin: 0 auto;
      gap: 2em;
      h1,
      p {
        margin-left: 60%;
      }
    }
  }
  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      line-height: 1.5;
    }
  }
`;
export default About;

import Head from 'next/head';
import styled from 'styled-components';
import MyImage from '../components/MyImage';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Head>
        <title>About | Meow Portal</title>
      </Head>
      <StyledSection>
        <div className="img-container">
          <MyImage
            src="/about-page-cat_kiw16m.jpg"
            // width="440"
            // height="300"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="info">
          <h1>About Meow Portal</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            porro quo facere, cumque officiis id placeat exercitationem
            architecto provident, itaque culpa voluptates unde. Id deserunt enim
            repudiandae odit tempora veritatis, quisquam placeat ut illo earum?
            Maxime ab a itaque culpa tempora, aperiam obcaecati architecto
            consequatur qui, nemo fugit iure. Animi aperiam delectus corporis,
            dignissimos ad eum expedita repellat veritatis voluptatum dolor
            autem impedit asperiores reprehenderit deleniti reiciendis optio
            officia? Asperiores perspiciatis ratione omnis reiciendis illo
            corporis inventore porro ipsa corrupti ab maiores veritatis error
            vel quam eum incidunt doloremque illum ut beatae similique, aliquam
            cupiditate. Velit nobis inventore molestias dignissimos!
          </p>
        </div>
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
    background-color: var(--clr-red-500);
  }
  p {
    color: var(--clr-primary-400);
    line-height: 1.35em;
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
      line-height: 1.5em;
    }
  }
`;
export default About;

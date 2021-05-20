import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tempData from '../data/tempData';

const BreedsHero = () => {
  return (
    <StyledDiv>
      <Head>
        <title>Cat Breeds | Meow Portal</title>
      </Head>
      <section>
        <h1>find the right breed for you</h1>
        <Image src="/images/hero-cat2.png" width="350" height="500" />
      </section>
    </StyledDiv>
  );
};

const StyledDiv = styled.div``;
export default BreedsHero;

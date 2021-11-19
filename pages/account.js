import styled from 'styled-components';
import MyImage from '../components/MyImage';
import SignIn from '../components/SignIn';
import { useEffect, useState } from 'react';
import SignInSignUp from '../components/SigInSignUp';
const Account = () => {
  const [[headerHeight, footerHeight], setHeaderFooterHeight] = useState([
    0, 0,
  ]);

  useEffect(() => {
    const headerElHeight = document.querySelector('header').offsetHeight;
    const footerElHeight = document.querySelector('footer').offsetHeight;
    setHeaderFooterHeight([headerElHeight, footerElHeight]);
  }, []);
  return (
    <StyledDiv headerHeight={headerHeight} footerHeight={footerHeight}>
      <div className="bg-image-wrapper">
        <StyledImage
          src="logIn-background_fof5qg"
          alt="black cat"
          layout="fill"
          priority={true}
        />
      </div>
      <section className="section-wrapper">
        <SignIn />
        <SignInSignUp />
      </section>
    </StyledDiv>
  );
};
const StyledImage = styled(MyImage)`
  object-fit: cover;
`;

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  /* min-height: 100%; */
  z-index: 1;
  padding-top: 3em;
  padding-bottom: 3em;
  .bg-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .section-wrapper {
    width: 80vw;
    max-width: 1200px;
    /* height: 100vh; */
    margin: 0 auto;
    /* backdrop-filter: blur(5px); */
    background: linear-gradient(
      0deg,
      rgba(181, 181, 181, 0.85) 0%,
      rgba(246, 249, 250, 0.85) 100%
    );
    padding: 2.5em 2em;
  }

  @media (min-width: 768px) {
    min-height: 100vh;
    .section-wrapper {
      display: grid;
      width: 90vw;
      grid-template-columns: 1.5fr 1fr;
      padding: 0;
    }
  }

  @media (min-width: 1024px) {
    display: grid;
    place-items: center;
    min-height: ${(props) =>
      props.headerHeight &&
      `calc(100vh - ${props.headerHeight + props.footerHeight}px - 2em)`};

    .section-wrapper {
      box-shadow: 0px 0px 2px var(--clr-lightgrey);
    }
  }
`;
export default Account;

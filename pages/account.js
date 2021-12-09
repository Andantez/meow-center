import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyImage from '../components/MyImage';
import SignInSignUp from '../components/SignInSignUp';
import SignInSignUpAside from '../components/SignInSignUpAside';
import { getProviders, getSession } from 'next-auth/react';
const Account = ({ providers }) => {
  const [[headerHeight, footerHeight], setHeaderFooterHeight] = useState([
    0, 0,
  ]);
  // temporory to be removed later for testing purpose only
  const [[signInWidth, buttonWidth], setSignInButtonWIdth] = useState([0, 0]);
  const [isSigningIn, setIsSigningIn] = useState(true);
  // ------------------------------------------------------------
  useEffect(() => {
    const signInElWidth =
      document.querySelector('.sign-in-container').offsetWidth;
    const buttonElWidth =
      document.querySelector('.button-container').offsetWidth;
    setSignInButtonWIdth([signInElWidth, buttonElWidth]);
  }, []);
  useEffect(() => {
    const headerElHeight = document.querySelector('header').offsetHeight;
    const footerElHeight = document.querySelector('footer').offsetHeight;
    setHeaderFooterHeight([headerElHeight, footerElHeight]);
  }, []);

  return (
    <StyledDiv
      headerHeight={headerHeight}
      footerHeight={footerHeight}
      signInWidth={signInWidth}
      buttonWidth={buttonWidth}
    >
      <div className="bg-image-wrapper">
        <StyledImage
          src="logIn-background_fof5qg"
          alt="black cat"
          layout="fill"
          priority={true}
        />
      </div>
      <section className="section-wrapper">
        <SignInSignUp
          isSigningIn={isSigningIn}
          setIsSigningIn={setIsSigningIn}
          providers={providers}
        />
        <SignInSignUpAside
          isSigningIn={isSigningIn}
          setIsSigningIn={setIsSigningIn}
        />
      </section>
    </StyledDiv>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const providers = await getProviders();
  const filteredProviders = Object.values(providers).filter(
    (provider) => provider.name !== 'Credentials'
  );

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      providers: filteredProviders,
    },
  };
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
    width: 90vw;
    max-width: 1200px;
    /* height: 100vh; */
    margin: 0 auto;
    /* backdrop-filter: blur(5px); */
    background: linear-gradient(
      0deg,
      rgba(181, 181, 181, 0.85) 0%,
      rgba(246, 249, 250, 0.85) 100%
    );
    padding: 2.5em 1em;
  }
  @media (min-width: 414px) {
    .section-wrapper {
      width: 90vw;
      padding: 2.5em 2em;
    }
  }
  @media (min-width: 768px) {
    min-height: 100vh;
    .section-wrapper {
      display: grid;
      width: 90vw;
      grid-template-columns: 1.5fr 1fr;
      padding: 0;
    }

    /* temporary --------------------- */
    .sign-in-container,
    .button-container {
      transition: all 400ms ease-in;
    }
    .sign-in-container.signing-in {
      /* transform: ${(props) =>
        props.buttonWidth && `translateX(${props.buttonWidth}px)`}; */
      transform: translateX(calc(75%));
    }
    .button-container.signing-in {
      /* transform: ${(props) =>
        props.signInWidth &&
        `translateX(calc(-${props.signInWidth}px - 4em))`}; */
      transform: translateX(calc(-150%));
    }

    /* --------------------------------- */
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

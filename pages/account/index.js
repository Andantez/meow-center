import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import MyImage from '../../components/MyImage';
import SignInSignUp from '../../components/SignInSignUp';
import SignInSignUpAside from '../../components/SignInSignUpAside';
import { getProviders, getSession } from 'next-auth/react';
const Account = ({ providers }) => {
  const [[headerHeight, footerHeight], setHeaderFooterHeight] = useState([
    0, 0,
  ]);
  const [[signInWidth, buttonWidth], setSignInButtonWIdth] = useState([0, 0]);
  const [isSigningIn, setIsSigningIn] = useState(true);
  const signInRef = useRef();
  const signUpRef = useRef();

  // ------------------------------------------------------------
  useEffect(() => {
    const signInElWidth = signInRef.current.offsetWidth;
    const buttonElWidth = signUpRef.current.offsetWidth;

    setSignInButtonWIdth([signInElWidth, buttonElWidth]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const signInElWidth = signInRef.current.offsetWidth;
      const buttonElWidth = signUpRef.current.offsetWidth;
      setSignInButtonWIdth([signInElWidth, buttonElWidth]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      <section className="section-wrapper">
        <div className="bg-image-wrapper">
          <StyledImage
            src="logIn-background_fof5qg"
            alt="black cat"
            layout="fill"
            priority={true}
          />
        </div>
        <span className="top-left-corner"></span>
        <span className="top-right-corner"></span>
        <SignInSignUp
          isSigningIn={isSigningIn}
          setIsSigningIn={setIsSigningIn}
          providers={providers}
          ref={signInRef}
        />
        <SignInSignUpAside
          isSigningIn={isSigningIn}
          setIsSigningIn={setIsSigningIn}
          ref={signUpRef}
        />
        <span className="bottom-left-corner"></span>
        <span className="bottom-right-corner"></span>
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
    position: relative;
    width: 90vw;
    max-width: 1200px;
    /* height: 100vh; */
    margin: 0 auto;
    background: linear-gradient(
      0deg,
      rgba(181, 181, 181, 0.75) 0%,
      rgba(246, 249, 250, 0.65) 100%
    );
    padding: 2.5em 1em;
  }
  .top-left-corner,
  .top-right-corner {
    position: absolute;
    top: -0.5em;
    border-top: 0.5em solid var(--clr-primary-500);
    width: 3em;
    height: 3em;
    z-index: 1;
    pointer-events: none;
  }
  .top-left-corner {
    left: -0.5em;
    border-left: 0.5em solid var(--clr-primary-500);
  }

  .top-right-corner {
    right: -0.5em;
    border-right: 0.5em solid var(--clr-primary-500);
  }
  .bottom-left-corner,
  .bottom-right-corner {
    position: absolute;
    bottom: -0.5em;
    border-bottom: 0.5em solid var(--clr-primary-500);
    width: 3em;
    height: 3em;
    z-index: 1;
    pointer-events: none;
  }
  .bottom-left-corner {
    left: -0.5em;
    border-left: 0.5em solid var(--clr-primary-500);
  }
  .bottom-right-corner {
    right: -0.5em;
    border-right: 0.5em solid var(--clr-primary-500);
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
      transform: ${(props) =>
        props.buttonWidth && `translateX(${props.buttonWidth}px)`};
    }
    .button-container.signing-in {
      transform: ${(props) =>
        props.signInWidth && `translateX(calc(-${props.signInWidth}px - 4em))`};
    }

    /* --------------------------------- */

    .top-left-border,
    .top-right-border {
      border-top: 0.65em solid var(--clr-primary-500);
      width: 4em;
      height: 4em;
    }
    .top-left-border {
      border-left: 0.65em solid var(--clr-primary-500);
    }
    .top-right-border {
      border-right: 0.65em solid var(--clr-primary-500);
    }

    .bottom-left-border,
    .bottom-right-border {
      border-bottom: 0.65em solid var(--clr-primary-500);
      width: 4em;
      height: 4em;
    }
    .bottom-left-border {
      border-left: 0.65em solid var(--clr-primary-500);
    }
    .bottom-right-border {
      border-right: 0.65em solid var(--clr-primary-500);
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

    .top-left-corner,
    .top-right-corner {
      top: -0.75em;
      border-top: 0.75em solid var(--clr-primary-500);
      width: 5em;
      height: 5em;
    }
    .top-left-corner {
      left: -0.75em;
      border-left: 0.75em solid var(--clr-primary-500);
    }
    .top-right-corner {
      right: -0.75em;
      border-right: 0.75em solid var(--clr-primary-500);
    }

    .bottom-left-corner,
    .bottom-right-corner {
      bottom: -0.75em;
      border-bottom: 0.75em solid var(--clr-primary-500);
      width: 5em;
      height: 5em;
    }
    .bottom-left-corner {
      left: -0.75em;
      border-left: 0.75em solid var(--clr-primary-500);
    }
    .bottom-right-corner {
      right: -0.75em;
      border-right: 0.75em solid var(--clr-primary-500);
    }
  }
`;
export default Account;

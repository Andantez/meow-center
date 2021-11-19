import { ImTwitter } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import styled from 'styled-components';

const SignIn = () => {
  return (
    <StyledDiv className="left-container">
      <h1>Sign In</h1>
      <form className="form">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="button" className="forgot-btn">
          Forgot Password ?
        </button>
        <button type="submit" className="submit-btn">
          sign in
        </button>
      </form>
      <div className="providers-wrapper">
        <p>or sign in with</p>
        {/* <AiOutlineArrowDown /> */}
        <div className="providers-grid-wrapper">
          <button className="providers-btn google">
            <FcGoogle />
            Google
          </button>
          <button className="providers-btn facebook">
            <SiFacebook />
            Facebook
          </button>
          <button className="providers-btn twitter">
            <ImTwitter />
            Twitter
          </button>
        </div>
      </div>
      <p>
        Don't have an account yet ?
        <button type="button" className="sign-up-btn">
          Sign up
        </button>
      </p>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  h1 {
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    color: var(--clr-primary-500);
    font-size: 2.5rem;
    text-align: center;
    /* margin-bottom: 2.5em; */
  }
  .form {
    display: grid;
    font-family: var(--ff-paragraph);
    gap: 1.5em;
    margin-top: 2.5em;

    input {
      letter-spacing: 1px;
      padding: 0.5em 0;
      border: none;
      background-color: var(--clr-secondary-500);
      text-indent: 0.75em;
      outline-color: var(--clr-grey);
      border-radius: 0.5em;
    }

    input::placeholder {
      color: var(--clr-grey);
      text-indent: 0.75em;
      font-size: 0.85rem;
    }
  }

  .submit-btn {
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.5em 2.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    font-size: 1rem;
    text-transform: capitalize;
    cursor: pointer;
  }

  p {
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-normal);
    font-size: 1rem;
    color: var(--clr-primary-500);
    text-align: center;
  }
  .sign-up-btn {
    font-weight: var(--fw-bold);
    border: none;
    background-color: transparent;
    color: var(--clr-primary-500);
    cursor: pointer;
    margin-left: 0.25em;
  }
  .providers-grid-wrapper {
    display: grid;
    gap: 1em;
    margin-top: 1em;
  }
  .providers-wrapper {
    padding: 1em 0;
    svg {
      display: block;
      color: var(--clr-black);
    }
  }
  .providers-wrapper > svg {
    margin: 0 auto;
  }
  .providers-btn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-family: var(--ff-paragraph);
    color: var(--clr-secondary-500);
    cursor: pointer;
    letter-spacing: 1px;
    svg {
      margin-right: 0.25em;
    }
  }

  .google {
    background-color: #ffffff;
    color: var(--clr-grey);
  }

  .twitter svg,
  .facebook svg {
    color: var(--clr-secondary-500);
  }
  .twitter {
    background-color: #1da1f2;

    svg {
      background-color: #1da1f2;
    }
  }
  .facebook {
    background-color: #4267b2;

    svg {
      background-color: #4267b2;
    }
  }

  .forgot-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    margin: 5em 2em;
    p:last-child {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .form {
      input {
        width: 50%;
        margin: 0 auto;
      }
    }
    .submit-btn,
    .providers-btn {
      width: 50%;
      margin: 0 auto;
    }
  }
`;
export default SignIn;

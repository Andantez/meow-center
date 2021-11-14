import styled from 'styled-components';
import MyImage from '../components/MyImage';
import { AiOutlineMail, AiOutlineArrowDown } from 'react-icons/ai';
const Account = () => {
  return (
    <StyledDiv>
      <div className="bg-image-wrapper">
        <StyledImage
          src="logIn-background_fof5qg"
          alt="black cat"
          layout="fill"
          priority={true}
        />
      </div>
      <section className="section-wrapper">
        <h1>Sign In</h1>
        <form className="form">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" className="submit-btn">
            sign in
          </button>
        </form>
        <div className="providers-wrapper">
          <p>or sign in with</p>
          <AiOutlineArrowDown />
          <button>Facebook</button>
          <button>Google</button>
          <button>Twitter</button>
        </div>
        <p>
          Don't have an account yet ?{' '}
          <button type="button" className="sign-up-btn">
            Sign up
          </button>
        </p>
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
  height: 100vh;
  z-index: 1;

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
    height: 100vh;
    margin: 0 auto;
    /* border: 2px solid black; */
    background: linear-gradient(
      0deg,
      rgba(181, 181, 181, 0.75) 0%,
      rgba(246, 249, 250, 0.75) 100%
    );
  }
  h1 {
    font-family: var(--ff-heading);
    color: var(--clr-primary-500);
    font-size: 2.5rem;
    text-align: center;
  }
  .form {
    display: grid;
    font-family: var(--ff-paragraph);
    gap: 1em;
    padding: 1em;

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
    margin: 0 auto;
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
    color: var(--clr-red-100);
    cursor: pointer;
  }

  .providers-wrapper {


    svg {
      display: block;
      margin: 0 auto;
      color: var(--clr-black);
    }
  }
`;
export default Account;

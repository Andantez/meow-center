import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import { ImSad } from 'react-icons/im'
const ResetToken = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const router = useRouter();
  const { resetToken } = router.query;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Your password doesn't match - please try again");
      return;
    }
    if (password === '' || confirmPassword === '') {
      setError('Password and Confirm Password field cannot be blank');
      return;
    }

    const res = await fetch(`/api/auth/passwordreset/${resetToken}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
    } else {
      setInvalidToken(true);
    }
  };

  return (
    <StyledDiv>
      {!success && !invalidToken && (
        <div className="container">
          <h1>Create new password</h1>
          <form className="form-grid" noValidate onSubmit={handleSubmit}>
            <div className="form-input-container">
              <label htmlFor="password" className="password-label">
                Password*
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`password-input ${
                    error ? 'validation-error' : ''
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {password ? (
                  showPassword ? (
                    <AiFillEyeInvisible
                      className="icon icon-btn icon-dark"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye
                      className="icon icon-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                ) : (
                  <RiLockPasswordFill className="icon" />
                )}
              </div>
            </div>
            <div className="form-input-container">
              <label htmlFor="confirm-password" className="password-label">
                Confirm password*
              </label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  name="new-password"
                  className={`password-input ${
                    error ? 'validation-error' : ''
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {confirmPassword ? (
                  showConfirmPassword ? (
                    <AiFillEyeInvisible
                      className="icon icon-btn icon-dark"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <AiFillEye
                      className="icon icon-btn"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )
                ) : (
                  <RiLockPasswordFill className="icon" />
                )}
              </div>
              {error && <small className="error-message">{error}</small>}
            </div>
            <button type="submit" className="submit-btn">
              Save new password
            </button>
          </form>
        </div>
      )}
      {success && (
        <div className="container">
          <div className="heading-wrapper">
            <AiOutlineCheckCircle className="icon-heading" />
            <h1>Success!</h1>
          </div>
          <div className="info-text">
            <p>
              Your password has been changed and you can sign in with your new
              password.
            </p>
            <Link href="/account">
              <a className="redirect-link">Sign In</a>
            </Link>
          </div>
        </div>
      )}
      {invalidToken && (
        <div className="container">
          <div className="heading-wrapper">
            <ImSad className="icon-heading" />
            <h1>Your password reset link has expired</h1>
          </div>
          <div className="info-text">
            <p>
              Please follow the link bellow and re-enter your email and we will
              send you a new link.
            </p>
            <Link href="/account/forgottenpassword">
              <a className="redirect-link">Enter your email</a>
            </Link>
          </div>
        </div>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--ff-paragraph);
  h1 {
    text-align: center;
    font-size: 1.25rem;
  }

  .container {
    display: grid;
    gap: 2em;
    background-color: var(--clr-secondary-500);
    color: var(--clr-black);
    padding: 1.5em;
    border-radius: 0.5em;
    border: 1px solid var(--clr-lightgrey);
    max-width: 400px;
    width: 100%;
  }

  .form-grid {
    display: grid;
    gap: 1em;
  }
  .form-input-container {
    display: grid;
    gap: 0.5em;
  }

  .password-input {
    width: 100%;
    border: 1px solid var(--clr-grey);
    padding: 0.75em;
    border-radius: 0.5em;
    &::-ms-reveal {
      display: none;
    }
    &:focus {
      outline: 1px solid var(--clr-primary-500);
    }
  }

  .submit-btn {
    background: var(--clr-red-500);
    border: none;
    color: var(--clr-secondary-500);
    padding: 0.75em 2.5em;
    border-radius: 0.5em;
    font-weight: var(--fw-bold);
    cursor: pointer;
  }

  .password-label {
    padding-left: 0.5em;
    color: var(--clr-primary-500);
  }

  .error-message {
    font-family: var(--ff-paragraph);
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    color: var(--clr-red-900);
    padding-left: 1.5em;
  }

  .password-input.validation-error {
    border: 1px solid var(--clr-red-900);
  }
  .input-wrapper {
    position: relative;
  }
  .icon {
    position: absolute;
    top: calc(50%);
    right: 0.75em;
    transform: translateY(-50%);
    color: var(--clr-grey);
  }
  .icon-btn {
    cursor: pointer;
  }
  .icon-dark {
    color: var(--clr-black);
  }

  .heading-wrapper {
    h1 {
      margin-top:.5em;
    }
    text-align: center;
    .icon-heading {
      font-size: 3rem;
      color: var(--clr-yellow);
    }
  }

  .info-text {
    text-align: center;
    font-size: 0.875rem;
    display: grid;
    gap: 2em;
    color: var(--clr-primary-500);
  }

  .redirect-link {
    background-color: var(--clr-red-500);
    color: var(--clr-secondary-500);
    font-weight: var(--fw-bold);
    border-radius: 0.5em;
    padding: 0.75em 3em;
  }
  @media (min-width: 768px) {
    .info-text {
      font-size: 1rem;
    }
  }
`;

export default ResetToken;

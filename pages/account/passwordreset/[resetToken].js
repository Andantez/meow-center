import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';

const ResetToken = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Your password doesn't match - please try again");
      return;
    }
  };
  return (
    <StyledDiv>
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
                className={`password-input ${error ? 'validation-error' : ''}`}
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
                className={`password-input ${error ? 'validation-error' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {confirmPassword ? (
                showConfirmPassword ? (
                  <AiFillEyeInvisible
                    className="icon icon-btn icon-dark"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <AiFillEye
                    className="icon icon-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
    background-color: hsl(270, 2%, 88%);
    color: var(--clr-black);
    padding: 1.5em;
    border-radius: 0.5em;
    box-shadow: 0 0 4px var(--clr-grey);
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
`;

export default ResetToken;

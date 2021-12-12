import { useState } from 'react';
import styled from 'styled-components';
import { validateEmail } from '../../utils/helpers';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
const ForgottenPassword = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    if (!validEmail) {
      setError(true);
      return;
    }
    const res = await fetch('/api/auth/forgottenpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <StyledDiv>
      <div className="container">
        <p>
          Forgot your account's password or having trouble logging? Enter your
          email below and we'll send you a link so you can setup a new password.
        </p>
        <div>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="div-grid">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="forgottenpassword-email"
                  id="email"
                  className={`email-input ${error && 'validation-error'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {error && (
                  <BsFillExclamationCircleFill className="exclamation-icon" />
                )}
              </div>
              {error && (
                <small className="error-text">Invalid email address</small>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Send email
            </button>
          </form>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  width: 90vw;
  font-family: var(--ff-paragraph);
  height: 100vh;
  align-items: center;
  justify-content: center;
  .container {
    display: grid;
    gap: 2em;
    background-color: hsl(270, 2%, 88%);
    color: var(--clr-black);
    padding: 1.5em;
    border-radius: 0.5em;
    box-shadow: 0 0 4px var(--clr-grey);
    max-width: 400px;
  }

  .form-grid {
    display: grid;
    gap: 1em;
  }
  .div-grid {
    display: grid;
    gap: 0.5em;
  }
  .email-input {
    width: 100%;
    border: 1px solid var(--clr-grey);
    padding: 0.75em;
    border-radius: 0.5em;
    &:focus {
      outline: 1px solid var(--clr-primary-500);
    }
  }
  .email-input.validation-error {
    outline: 1px solid var(--clr-red-900);
    &:focus {
      box-shadow: 0 0 0 2px var(--clr-red-500);
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
  .input-wrapper {
    position: relative;
  }
  .exclamation-icon {
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: var(--clr-red-900);
  }
  .error-text {
    color: var(--clr-red-900);
    font-size: 0.75rem;
    line-height: 1.25em;
    letter-spacing: 0.5px;
    padding-left: 1em;
    padding-top: 0.25em;
  }
  label {
    font-weight: var(--fw-bold);
    font-size: 1.125rem;
  }
`;
export default ForgottenPassword;

import { MdEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Form = ({
  isSigningIn,
  handleLogInSubmit,
  handleSignUpSubmit,
  handleOnChange,
  handleOnClick,
  errors,
  validateForm,
  showPassword,
  userDetails,
  setShowPassword,
}) => {
  const { name, email, password } = userDetails;

  return (
    <StyledForm
      className="form"
      onSubmit={isSigningIn ? handleLogInSubmit : handleSignUpSubmit}
      noValidate
    >
      <small className="error-message">
        {errors.authenticated && `${errors.authenticated}`}
      </small>
      {/* if the user is not signing in e.g. is registering show the registering show name input field */}
      {!isSigningIn && (
        <div className="input-wrapper">
          <input
            className={`${errors.name && 'validation-error'}`}
            type="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={name}
            onChange={handleOnChange}
            // If the user is signing in disable the onBlur event listener.
            onBlur={!isSigningIn ? validateForm : undefined}
            // autoFocus
          />
          {name ? (
            <AiOutlineClose
              className="icon icon-btn icon-dark"
              onClick={handleOnClick}
              name="name"
            />
          ) : (
            <IoMdPerson className="icon" />
          )}
        </div>
      )}
      {/* show the user error  */}
      {errors.name && <small className="error-message">{errors.name}</small>}
      <div className="input-wrapper">
        <input
          className={`${errors.email && 'validation-error'}`}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={handleOnChange}
          // If the user is signing in disable the onBlur event listener.
          onBlur={!isSigningIn ? validateForm : undefined}
        />
        {email ? (
          <AiOutlineClose
            className="icon icon-btn icon-dark"
            onClick={handleOnClick}
            name="email"
          />
        ) : (
          <MdEmail className="icon" />
        )}
      </div>
      {/* show the user error  */}
      {errors.email && <small className="error-message">{errors.email}</small>}
      <div className="input-wrapper">
        <input
          className={`${errors.password && 'validation-error'}`}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          autoComplete={isSigningIn ? 'current-password' : 'new-password'}
          value={password}
          onChange={handleOnChange}
          // If the user is signing in disable the onBlur event listener.
          onBlur={!isSigningIn ? validateForm : undefined}
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
      {/* show the user error  */}
      {errors.password && (
        <small className="error-message">{errors.password}</small>
      )}
      {isSigningIn && (
        <Link href="/account/forgottenpassword">
          <a className="forgot-link">Forgot Password?</a>
        </Link>
      )}
      <button type="submit" className="submit-btn">
        {isSigningIn ? 'sign in' : 'sign up'}
      </button>
    </StyledForm>
  );
};

const StyledForm = styled.form``;
export default Form;

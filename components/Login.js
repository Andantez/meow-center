import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Login = ({
  handleLogInSubmit,
  handleOnChange,
  handleOnClick,
  errors,
  showPassword,
  userDetails,
  setShowPassword,
}) => {
  const { email, password } = userDetails;

  return (
    <StyledForm
      className="form"
      onSubmit={handleLogInSubmit}
      noValidate
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <small className="error-message">
        {errors.authenticated && `${errors.authenticated}`}
      </small>
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
          autoComplete="current-password"
          value={password}
          onChange={handleOnChange}
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

      <Link href="/account/forgottenpassword">
        <a className="forgot-link">Forgot Password?</a>
      </Link>
      <button type="submit" className="submit-btn">
        sign in
      </button>
    </StyledForm>
  );
};

const StyledForm = styled(motion.form)``;
export default Login;

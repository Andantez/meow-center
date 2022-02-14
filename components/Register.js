import { MdEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Register = ({
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
      onSubmit={handleSignUpSubmit}
      noValidate
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <small className="error-message">
        {errors.authenticated && `${errors.authenticated}`}
      </small>
      <div className="input-wrapper">
        <input
          className={`${errors.name && 'validation-error'}`}
          type="name"
          name="name"
          placeholder="Name"
          autoComplete="name"
          value={name}
          onChange={handleOnChange}
          onBlur={validateForm}
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
          onBlur={validateForm}
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
          autoComplete="new-password"
          value={password}
          onChange={handleOnChange}
          onBlur={validateForm}
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
      <button type="submit" className="submit-btn">
        sign up
      </button>
    </StyledForm>
  );
};

const StyledForm = styled(motion.form)``;
export default Register;

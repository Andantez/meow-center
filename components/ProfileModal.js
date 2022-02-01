import styled from 'styled-components';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { profileDropdownVariants } from '../variants/animationVariants';

const ProfileModal = () => {
  return (
    <StyledDiv
      initial="initial"
      animate="animate"
      exit="exit"
      variants={profileDropdownVariants}
    >
      <ul>
        <li>
          <Link href="/account/profile">
            <a className="profile-link">Profile</a>
          </Link>
        </li>
        <li>
          <button className="btn" type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </li>
      </ul>
    </StyledDiv>
  );
};

const StyledDiv = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  border-radius: 0.5em;
  background: var(--clr-secondary-500);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  width: max-content;
  padding: 1.5em 0;

  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid var(--clr-secondary-500);
  }
  li {
    display: flex;
    align-items: center;
    padding: 0;
  }

  .profile-link {
    color: var(--clr-primary-500);
    font-weight: var(--fw-normal);
    width: 100%;
    padding: 0.35em 3em;
  }
  .btn {
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--clr-primary-500);
    width: 100%;
    padding: 0.35em 3em;
  }

  .profile-link:hover,
  .btn:hover {
    background-color: rgba(13, 12, 34, 0.03);
  }
`;
export default ProfileModal;

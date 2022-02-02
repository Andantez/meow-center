import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { useHomeContext } from '../context/home_context';
import MyImage from './MyImage';
import { useSession, signOut } from 'next-auth/react';
import ProfileModal from './ProfileModal';
import { AnimatePresence } from 'framer-motion';

const Header = () => {
  const {
    openSidebar,
    showDropdown,
    hideDropdown,
    showDropdownMenu,
    handleDropdown,
  } = useHomeContext();
  const { data: session, status } = useSession();
  return (
    <Wrapper onMouseOver={handleDropdown}>
      <nav className="nav-wrapper">
        <Link href="/">
          <a className="link">
            <MyImage
              src="/logo3_ilsd46.png"
              alt="logo"
              height="50"
              width="175"
            />
          </a>
        </Link>
        <div className="nav-links">
          <Link href="/">
            <a className="link">Home</a>
          </Link>
          <Link href="/breeds">
            <a className="link">Breeds</a>
          </Link>
          {session && status === 'authenticated' && (
            <Link href="/gallery">
              <a className="link">Gallery</a>
            </Link>
          )}
          <Link href="/charts">
            <a className="link">Charts</a>
          </Link>
          <Link href="/about">
            <a className="link">About</a>
          </Link>
          {session && status === 'authenticated' && (
            <div
              className="modal-wrapper"
              onMouseOver={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <p>My Account</p>
              <AnimatePresence>
                {showDropdownMenu && <ProfileModal />}
              </AnimatePresence>
            </div>
          )}
          {!session && (
            <Link href="/account">
              <a className="link">Sign In</a>
            </Link>
          )}
        </div>
        <button className="navbar-toggle" type="button" onClick={openSidebar}>
          <HiMenu />
        </button>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: var(--clr-primary-500);
  background: var(--clr-primary-500);
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;
    width: 90vw;
    margin: 0 auto;
    max-width: 1200px;
  }
  .navbar-toggle {
    background: transparent;
    border: transparent;
    cursor: pointer;
    font-size: 2.5rem;

    svg {
      color: var(--clr-secondary-500);
    }
  }
  .nav-links {
    color: var(--clr-secondary-500);
    font-size: 1rem;
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    display: none;
    .link {
      position: relative;
      &:hover {
        color: var(--clr-secondary-500);
      }
      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        bottom: -0.5em;
        left: 0;
        background: var(--clr-secondary-500);
        transform: scale(0);
        transition: transform 250ms linear;
        transform-origin: right;
      }
      &:hover::before {
        transform: scale(1);
        transform-origin: left;
      }
    }
  }
  .modal-wrapper {
    position: relative;
    padding: 1em 0;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .navbar-toggle {
      display: none;
    }

    .nav-links {
      display: grid;
      grid-auto-flow: column;
      gap: 2em;
      place-items: center;
    }
  }
`;
export default Header;

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import { HiMenu } from 'react-icons/hi';

const Header = () => {
  return (
    <Wrapper>
      <nav className="nav-wrapper">
        <Link href="/">
          <a>
            <Image src="/images/logo3.png" alt="logo" height="50" width="175" />
          </a>
        </Link>
        <div className="nav-links">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/breeds">
            <a>Breeds</a>
          </Link>
          <Link href="/gallery">
            <a>Gallery</a>
          </Link>
          <Link href="/statistics">
            <a>Statistics</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <button className="navbar-toggle" type="button">
          <HiMenu />
        </button>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: var(--clr-primary-500);
  background: linear-gradient(
    90deg,
    rgba(52, 52, 70, 1) 0%,
    rgba(74, 74, 100, 1) 100%
  );
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
    a {
      position: relative;
      &:hover {
        color: var(--clr-secondary-600);
      }
      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 3px;
        bottom: -0.75em;
        left: 0;
        background: var(--clr-light-yellow);
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
  @media (min-width: 992px) {
    .navbar-toggle {
      display: none;
    }

    .nav-links {
      display: grid;
      grid-auto-flow: column;
      gap: 2em;
    }
  }
`;
export default Header;

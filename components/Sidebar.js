import styled from 'styled-components';
import Link from 'next/link';
import linksData from '../data/linksData';
import { AiOutlineClose } from 'react-icons/ai';
import { useHomeContext } from '../context/home_context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  itemVariants,
  containerVariants,
  buttonVariants,
} from '../variants/sidebarVariants';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { IoPerson } from 'react-icons/io5';
import { useSession, signOut } from 'next-auth/react';

const closeVariants = {
  exit: {
    opacity: 0,
  },
};
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useHomeContext();
  const { data: session, status } = useSession();
  return (
    <StyledDiv>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="modal-background"
            exit="exit"
            variants={closeVariants}
            onClick={closeSidebar}
          >
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial="closed"
              animate="open"
              exit="exit"
              variants={containerVariants}
            >
              <div className="sidebar-header">
                <motion.button
                  type="button"
                  className="btn"
                  onClick={closeSidebar}
                  variants={buttonVariants}
                >
                  <AiOutlineClose />
                </motion.button>
              </div>
              <motion.ul className="links" variants={itemVariants}>
                {linksData.map((listItem) => {
                  const { title, icon, link } = listItem;
                  return (
                    <li key={title}>
                      <Link href={link}>
                        <a>
                          {icon} {title}
                        </a>
                      </Link>
                    </li>
                  );
                })}
                {session && status === 'authenticated' && (
                  <li>
                    <Link href="/">
                      <a>
                        <IoPerson /> My Account
                      </a>
                    </Link>
                  </li>
                )}
                {!session && (
                  <li>
                    <Link href="/account">
                      <a>
                        <GoSignIn /> Sign In
                      </a>
                    </Link>
                  </li>
                )}
                {session && status === 'authenticated' && (
                  <li>
                    <Link href="/">
                      <a onClick={signOut}>
                        <GoSignOut /> Sign Out
                      </a>
                    </Link>
                  </li>
                )}
              </motion.ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    z-index: 999;
  }
  aside {
    position: absolute;
    top: 1em;
    left: 1em;
    right: 1em;
    margin: 0 auto;
    width: 90vw;
    z-index: 999999;
    background: var(--clr-secondary-500);
    border-radius: 1em;
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
  }
  .sidebar-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 1em;
  }
  .btn {
    color: var(--clr-secondary-900);
    cursor: pointer;
    transition: transform 250ms ease;
    &:active {
      transform: scale(0.8);
    }
  }
  .links {
    margin: 0 3em 3em;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
    a {
      display: flex;
      gap: 0.25em;
      align-items: center;
      font-size: 1.5rem;

      svg {
        font-size: 0.8125rem;
        color: var(--clr-secondary-900);
      }
    }
  }
  .btn {
    border: none;
    background: var(--clr-secondary-500);
    font-size: 1.5em;
  }

  @media (min-width: 768px) {
    .links {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
export default Sidebar;

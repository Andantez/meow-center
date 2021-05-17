import styled from 'styled-components';
import Link from 'next/link';
import linksData from '../data/linksData';
import { AiOutlineClose } from 'react-icons/ai';
import { useHomeContext } from '../context/home_context';
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar} = useHomeContext();
  return (
    <StyledDiv>
      {/* TODO: to be handled by framer motion later */}
      {isSidebarOpen && (
        <aside>
          <div className="sidebar-header">
            <button type="button" className="btn" onClick={closeSidebar}>
              <AiOutlineClose />
            </button>
          </div>
          <ul className="links">
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
          </ul>
        </aside>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
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

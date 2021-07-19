import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = ({
  data,
  handleNext,
  handlePrevious,
  activePage,
  isSelected,
  handleActivePage
}) => {
  return (
    <StyledDiv>
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isSelected}
        className={`${isSelected ? 'disabled-btn' : ''}`}
      >
        <BsChevronLeft />
      </button>
      {data.map((item, index) => {
        return (
          <button
            disabled={isSelected}
            key={index}
            type="button"
            onClick={() => handleActivePage(index)}
            className={`${
              index === activePage && !isSelected ? 'active-page' : ''
            } ${isSelected ? 'disabled-btn' : ''}`}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        type="button"
        onClick={handleNext}
        disabled={isSelected}
        className={`${isSelected ? 'disabled-btn' : ''}`}
      >
        <BsChevronRight />
      </button>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.125em;
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--clr-grey);
    padding: 0.25em 0.5em;
    transition: color 250ms ease, background-color 250ms ease;
    &:hover {
      background-color: hsl(270, 2%, 92%);
    }
  }

  .active-page {
    font-weight: var(--fw-bold);
    color: var(--clr-black);
    text-decoration: underline 2px;
    text-underline-offset: 1.5px;
  }

  .disabled-btn {
    opacity: 0.4;
    pointer-events: none;
  }
`;
export default Pagination;

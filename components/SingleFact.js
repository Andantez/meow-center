import styled from 'styled-components';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import FactsSkeleton from './FactsSkeleton';

const SingleFact = ({ fact, isValidating }) => {
  return (
    <StyledArticle>
      {isValidating ? (
        <FactsSkeleton />
      ) : (
        <p>
          <ImQuotesLeft /> {fact} <ImQuotesRight />
        </p>
      )}
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  color: var(--clr-primary-500);
  font-family: var(--ff-paragraph);
  font-weight: var(--fw-normal);
  font-size: 0.938em;
  font-weight: var(--fw-normal);
  line-height: 1.5;
  background-color: var(--clr-secondary-500);
  padding: 1em;
  margin: 0 auto;
  border-radius: 1em;
  text-align: center;
  box-shadow: 2px 4px 4px 0 var(--clr-black);
  width: 300px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: var(--clr-red-100);
  }

  @media (min-width: 768px) {
    height: 200px;
  }
  @media (min-width: 1024px) {
    padding: 1.5em;
  }
`;
export default SingleFact;

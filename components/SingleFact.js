import styled from 'styled-components';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

const SingleFact = ({ fact }) => {
  return (
    <StyledArticle>
      <p>
        <ImQuotesLeft /> {fact} <ImQuotesRight />
      </p>
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
  padding: 1.5em;
  margin: 0 1em;
  border-radius: 1em;
  text-align: center;
  box-shadow: 2px 4px 4px 0 var(--clr-black);
  svg {
    color: var(--clr-red-100);
  }
`;
export default SingleFact;

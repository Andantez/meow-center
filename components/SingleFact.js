import styled from 'styled-components';

const SingleFact = ({fact}) => {
  return (
    <StyledArticle>
      <p>{fact}</p>
    </StyledArticle>
  );
}

const StyledArticle = styled.article``;
export default SingleFact;
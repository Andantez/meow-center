import styled from 'styled-components';

const FactsSkeleton = () => {
  return (
    <StyledDiv>
      <div></div>
      <div></div>
      <div></div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  gap: 1em;
  width: 100%;
  div {
    background-color: hsl(270, 2%, 87%);
    height: 1em;
    border-radius: .25em;
  }

  @media (min-width: 768px) {
    div {
      height: 1.25em;
    }
  }
`;
export default FactsSkeleton;

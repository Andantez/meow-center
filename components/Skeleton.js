import styled from 'styled-components';

const Skeleton = () => {
  return (
    <StyledDiv>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: hsl(270, 2%, 87%);
  width: 100%;
  height: 10em;


  @media (min-width: 768px) {
    height: 15em;
  }
  @media (min-width: 1024px) {
    height: 20em;
  }
`;
export default Skeleton;

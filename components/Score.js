import styled from 'styled-components';

const Score = ({ score, characteristic }) => {
  const tempArr = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    return <StyledDiv score={score} index={number} key={index} />;
  });

  if (characteristic.characteristic === 'hypoallergenic' && score > 0) {
    return (
      <Wrapper>
        <div>Yes</div>
      </Wrapper>
    );
  }
  if (characteristic.characteristic === 'weight') {
    return (
      <Wrapper>
        <div>{score}kg.</div>
      </Wrapper>
    );
  }
  if (characteristic.characteristic === 'life span') {
    return (
      <Wrapper>
        <div>{score} years.</div>
      </Wrapper>
    );
  }
  if (characteristic.characteristic === 'origin') {
    return (
      <Wrapper>
        <div>{score}</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {tempArr.map((score) => {
        return score;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  /* justify-content: start; */
  align-items: center;
  gap: 0.1em;
  
  div:first-child {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
  }
  div:last-child {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
  }
`;
const StyledDiv = styled.div`
  width: 100%;
  height: 0.8125em;
  background-color: ${(props) =>
    props.index <= props.score ? 'var(--clr-red-500)' : 'var(--clr-lightgrey)'};
`;
export default Score;

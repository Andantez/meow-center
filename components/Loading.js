import styled from 'styled-components';

const Loading = () => {
  return (
    <StyeldDiv>
      <div className="spinner"></div>
    </StyeldDiv>
  );
};

const StyeldDiv = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  min-height: 90vh;
  position: relative;
  .spinner {
    width:  3em;
    height: 3em;
    border: 0.25em solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-top-color: var(--clr-yellow);
    animation: spin 2.5s linear infinite;
    &::before,
    &::after {
      position: absolute;
      content: '';
      border: 0.25em solid transparent;
      border-radius: 50%;
    }

    &::before {
      border-top-color: var(--clr-primary-500);
      top: -0.85em;
      left: -0.85em;
      right: -0.85em;
      bottom: -0.85em;
      animation: spin 2s linear infinite;
    }
    &::after {
      border-top-color: var(--clr-lightgrey);
      top: 0.35em;
      left: 0.35em;
      right: 0.35em;
      bottom: 0.35em;
      animation: spin 3s linear infinite;
    }
  }
  
  @media (min-width: 1024px) {
    .spinner {
      width: 4em;
      height: 4em;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Loading;

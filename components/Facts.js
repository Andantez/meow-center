import styled from 'styled-components';
import SingleFact from '../components/SingleFact';
import MyImage from './MyImage';

const Facts = ({ facts, mutate, isValidating }) => {
  const { data } = facts;

  return (
    <StyledSection>
      <div className="heading">
        <h2>interesting facts about cats</h2>
      </div>
      <div className="facts-container">
        {data &&
          data.map((singleFact, index) => {
            const { fact } = singleFact;
            return <SingleFact fact={fact} key={fact} isValidating={isValidating} />;
          })}
        <div className="img-wrapper">
          <MyImage
            src="/homepage-cat1_czqrga.jpg"
            width="300"
            height="200"
            alt="ginger cat cleaning itself"
          />
        </div>
        <div className="img-wrapper">
          <MyImage
            src="/homepage-cat2_ofvlln.jpg"
            width="300"
            height="200"
            alt="cat lying on its back"
          />
        </div>
        <div className="img-wrapper">
          <MyImage
            src="/homepage-cat4_nmwf26.jpg"
            width="300"
            height="200"
            alt="ginger cat"
          />
        </div>
      </div>
      <button className="btn" onClick={() => mutate()}>
        get more facts
      </button>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background-color: var(--clr-primary-500);
  padding: 5em 0 4em;
  h2 {
    position: relative;
    text-align: center;
    text-transform: capitalize;
    font-family: var(--ff-heading);
    color: var(--clr-secondary-500);
    -webkit-text-stroke: 0.1em var(--clr-black);
    font-size: 2em;
  }
  .heading {
    width: 90vw;
    margin: 0 auto;
  }
  .facts-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5em;
    width: 90vw;
    max-width: 1200px;
    margin: 3em auto 2em;
    padding: 1em 0;
  }

  .img-wrapper {
    display: none;
  }

  .btn {
    color: var(--clr-secondary-500);
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    font-size: 0.8125em;
    text-transform: capitalize;
    display: block;
    margin: 0 auto;
    padding: 1em;
    background: var(--clr-red-500);
    border: none;
    border-radius: 0.25em;
    transition: transform 250ms ease;
    box-shadow: 2px 4px 10px 0 var(--clr-black);
    &:hover,
    &:focus {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  @media (min-width: 768px) {
    .facts-container {
      grid-template-columns: repeat(2, 1fr);
      margin: 3em auto;
    }
    article:nth-child(2) {
      grid-column: 1;
      grid-row: 3;
    }
    article:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
    }
    .img-wrapper {
      display: block;
      margin: 0 auto;
      & > div {
        border-radius: 1em;
        box-shadow: 2px 4px 4px 0 var(--clr-black);
      }
    }
  }
  @media (min-width: 1024px) {
    padding: 5em 0;
    .facts-container {
      grid-template-columns: repeat(12, 1fr);
    }
    h2 {
      font-size: 2.5rem;
    }

    .btn {
      font-size: 0.875rem;
    }
    article:nth-child(1) {
      grid-column: 1 / span 4;
    }

    article:nth-child(2) {
      margin-top: 5em;
      grid-column: 5 / span 4;
      grid-row: 1;
      margin-bottom: -5em;
    }

    article:nth-child(3) {
      grid-column: 9 / span 4;
      grid-row: 1;
    }
    .img-wrapper:nth-child(4) {
      grid-column: span 4;
      grid-row: 2;
    }

    .img-wrapper:nth-child(5) {
      grid-column: 5 / span 4;
      grid-row: 2;
      margin-top: 5em;
    }

    .img-wrapper:nth-child(6) {
      grid-column: 9 / span 4;
    }
  }
`;
export default Facts;

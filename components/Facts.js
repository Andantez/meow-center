import styled from 'styled-components';
import Image from 'next/image';
import factsTempData from '../data/tempFacts';
import SingleFact from '../components/SingleFact';
const Facts = () => {
  const { data } = factsTempData;
  return (
    <StyledSection>
      <h2>interesting facts about cats</h2>
      <div className="facts-container">
        {data.map((singleFact, index) => {
          const { fact } = singleFact;
          return <SingleFact fact={fact} key={index} />;
        })}
        <div className="img-wrapper">
          <Image
            src="/images/homepage-cat1.jpg"
            width="300"
            height="200"
            alt="ginger cat cleaning itself"
          />
        </div>
        <div className="img-wrapper">
          <Image
            src="/images/homepage-cat2.jpg"
            width="300"
            height="200"
            alt="cat lying on its back"
          />
        </div>
        <div className="img-wrapper">
          <Image
            src="/images/homepage-cat4.jpg"
            width="200"
            height="300"
            alt="ginger cat"
          />
        </div>
      </div>
      <button className="btn">get more facts</button>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background-color: var(--clr-primary-500);
  padding: 5em 0;

  h2 {
    position: relative;
    text-align: center;
    text-transform: capitalize;
    font-family: var(--ff-heading);
    color: var(--clr-secondary-500);
    -webkit-text-stroke: 0.1em var(--clr-black);
    font-size: 2em;
  }

  .facts-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5em;
    width: 90vw;
    max-width: 1200px;
    margin: 3em auto;
    padding: 1em 0;
  }

  .img-wrapper {
    display: none;
  }

  .btn {
    color: var(--clr-secondary-500);
    font-family: var(--ff-paragraph);
    font-weight: var(--fw-bold);
    text-transform: capitalize;
    display: block;
    margin: 0 auto !important;
    padding: 1em;
    background: var(--clr-red-500);
    border: none;
    border-radius: .25em;
    transition: transform 250ms ease;
    box-shadow: 2px 4px 10px 0 var(--clr-black);
    &:hover,
    &:focus {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(.95);
    }
  }
`;
export default Facts;

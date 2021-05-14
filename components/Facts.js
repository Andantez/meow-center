import styled from 'styled-components';
import Image from 'next/image';
import factsTempData from '../data/tempFacts';

const Facts = () => {
  const { data } = factsTempData;
  return (
    <StyledSection>
      <h2>interesting facts about cats</h2>
      <div>
        {data.map((singleFact) => {
          {/* todo extract it to single component */}
          return (
            <article>
              <p>{singleFact.fact}</p>
            </article>
          );
        })}
      </div>
      <Image
        src="/images/homepage-cat1.jpg"
        width="300"
        height="200"
        alt="ginger cat cleaning itself"
      />
      <Image
        src="/images/homepage-cat2.jpg"
        width="300"
        height="200"
        alt="cat lying on its back"
      />
      <Image
        src="/images/homepage-cat3.jpg"
        width="200"
        height="300"
        alt="cat lying on its back"
      />
      <button>get more facts</button>
    </StyledSection>
  );
};

const StyledSection = styled.section``;
export default Facts;

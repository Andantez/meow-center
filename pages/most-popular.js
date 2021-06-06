import styled from 'styled-components';
import tempData from '../data/tempData';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
const MostPopular = () => {
  const data = tempData.slice(0, 10);
  // console.log(data)
  return (
    <StyledDiv>
      <h1>top 10 most popular breed</h1>
      <section>
        {data.map((breed, index) => {
          const {
            id,
            name,
            description,
            image: { url },
          } = breed;
          return (
            <div className="background">
              <div className="content">
                <div className="img-container">
                  <Image src={url} width="450" height="400" />
                </div>
                <div className="info">
                  <p className="title">
                    <span>{index + 1}.</span>
                    {name}
                  </p>
                  <p className="description">{description.slice(0, 200)}...</p>
                  <Link href={`/breeds/${id}`}>
                    <a>
                      Learn More
                      <BsArrowRightShort />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
  width: 90vw;
  margin: 3em auto;
  /* border: 1px solid black; */

  section {
    display: grid;
    gap: 2em;
    /* text-align: center; */
    margin-top: 3em;
  }
  h1 {
    font-size: 2.25rem;
    font-family: var(--ff-heading);
    text-transform: capitalize;
    color: var(--clr-primary-500);
    text-align: center;
  }
  .content {
    display: grid;
    gap: 1em;
    margin-top: -2em;
  }
  .background {
    padding: 1em;
    background-color: var(--clr-primary-500);
    border-radius: 0.5em;
  }

  .img-container > div {
    border-radius: 0.5em;
    box-shadow: 1px 2px 5px  var(--clr-black);
    
  }
  .info {
    background-color: var(--clr-secondary-500);
    display: grid;
    gap: 0.5em;
    padding: 1.5em 1em;
    border-radius: 0.5em;
    font-family: var(--ff-paragraph);
    a {
      color: var(--clr-red-500);
      font-weight: var(--fw-bold);
      display: flex;
      align-items: center;
      margin-top: 0.5em;
      svg {
        font-size: 1.125rem;
      }
    }
  }

  .title,
  .description {
    color: var(--clr-primary-500);
  }
  .title {
    font-weight: var(--fw-bold);
    font-size: 1.5rem;
  }
  .description {
    letter-spacing: 0.5px;
    line-height: 1.3;
  }
`;
export default MostPopular;

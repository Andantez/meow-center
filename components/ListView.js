import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const ListView = ({ initialData }) => {
  const data = initialData;

  return (
    <StyledSection>
      {data.map((breed) => {
        const {
          id,
          name,
          description,
          life_span,
          weight: { metric: weight},
          image: { url },
        } = breed;
        return (
          <article key={id}>
            <Link href={`/breeds/${id}`}>
              <a className="list-item">
                <div className="img-wrapper">
                  <Image src={url} width="300" height="200" alt={name} />
                </div>
                <div className="info">
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <p>
                    <span>life span:</span> {life_span}
                  </p>
                  <p>
                    <span>weight:</span> {weight}
                  </p>
                </div>
              </a>
            </Link>
          </article>
        );
      })}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  margin: 0 auto;
  gap: 1.5em;
  grid-template-columns: repeat(2, 1fr);
  
  .list-item {
    display: grid;
    gap: .25em;
    h2 {
      font-size: 1.125rem;
    }
    p {
      display: none;
      opacity: 0.8;
    }

    h2,p {
      font-family: var(--ff-paragraph);
      color: var(--clr-primary-500);
    }
  }
`;
export default ListView;

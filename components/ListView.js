import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const ListView = ({ breeds }) => {
  return (
    <StyledSection>
      {breeds.map((breed) => {
        const {
          id,
          name,
          description,
          origin,
          life_span,
          weight: { metric: weight },
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
                  <p className="ss-description">
                    {description.substring(0, 200)}...
                  </p>
                  <p className="ls-description">{description}</p>
                  <p className="extra-info">
                    <span>origin:</span> <span>{origin}.</span>
                  </p>
                  <p className="extra-info">
                    <span>life span:</span> <span>{life_span} years.</span>
                  </p>
                  {/* <p className="extra-info">
                    <span>weight:</span> {weight} kg.
                  </p> */}
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
  margin: 2em auto 0;
  gap: 1.5em;
  grid-template-columns: repeat(2, 1fr);
  article {
    transform-origin: left bottom;
    transition: transform 250ms ease;
  }
  article:hover {
    transform: scale(1.05);
  }

  .img-wrapper > div {
    border-radius: 0.5em;
  }
  .list-item {
    display: grid;
    gap: 0.25em;
    h2 {
      font-size: 1.125rem;
      color: var(--clr-primary-500);
    }

    h2,
    p {
      font-family: var(--ff-paragraph);
    }

    .ss-description,
    .ls-description,
    .extra-info {
      display: none;
      color: var(--clr-grey);
    }
  }
  /* .info h2 {
    text-align: center;
  } */
  @media (min-width: 768px) {
    grid-template-columns: 1fr;

    .list-item .ss-description,
    .list-item .extra-info {
      display: block;
    }

    .list-item {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 1.5em;
      h2 {
        font-size: 1.5rem;
      }
    }
    .info span {
      color: var(--clr-primary-500);
      text-transform: capitalize;
      letter-spacing: 1px;
    }
    .info p {
      margin-top: 0.5em;
    }

    .extra-info span:nth-child(2) {
      color: var(--clr-red-100);
      font-weight: var(--fw-normal);
    }

    /* .info h2 {
      text-align: unset;
    } */
  }

  @media (min-width: 1200px) {
    .list-item .ss-description {
      display: none;
    }
    .list-item .ls-description {
      display: block;
    }
  }
`;
export default ListView;

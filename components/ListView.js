import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';

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
          image: { url },
          blurDataURL,
        } = breed;
        return (
          <article key={id}>
            <Link href={`/breeds/${id}`}>
              <a className="list-item">
                <div className="img-wrapper">
                  <Image
                    src={url}
                    width="300"
                    height="200"
                    alt={name}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </div>
                <div className="info">
                  <h2>{name}</h2>
                  <p className="ss-description">
                    {description.substring(0, 200)}...
                  </p>
                  <p className="ls-description">
                    {description.length >= 400
                      ? description.substring(0, 400) + '...'
                      : description}
                  </p>
                  <p className="extra-info">
                    <span>origin:</span> <span>{origin}.</span>
                  </p>
                  <p className="extra-info">
                    <span>life span:</span> <span>{life_span} years.</span>
                  </p>
                </div>
                <div className="arrow">
                  <BsArrowRight />
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
  article {
    border: 1px solid transparent;
    transition: border 250ms ease;
    border-radius: 0.5em;
  }
  article:hover {
    border: 1px solid var(--clr-primary-500);
  }

  .img-wrapper > div {
    border-radius: 0.5em;
    vertical-align: middle;
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
  .arrow {
    display: none;
  }
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
      position: relative;
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

    .arrow {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: -1px;
      bottom: -1px;
      font-size: 1.5rem;
      border-bottom-right-radius: 0.25em;
      clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
      padding: 1.5em;
      background-image: linear-gradient(-45deg, #5f5f81 1%, #343446 100%);
      transition: clip-path 250ms ease-out;
      svg {
        color: var(--clr-secondary-500);
        position: absolute;
        bottom: 0.5em;
        right: 0.25em;
        clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
        transition: clip-path 250ms ease-out;
      }
    }
    article:hover .arrow {
      clip-path: polygon(100% 100%, 100% 0, 48% 50%, 0 100%);
    }
    article:hover .arrow svg {
      clip-path: polygon(100% 100%, 100% 0, 0 0, 0 100%);
    }
  }
  @media (min-width: 1024px) {
    margin: 2em auto 0;
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

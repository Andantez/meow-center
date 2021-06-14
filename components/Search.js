import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import tempData from '../data/tempData';
import Link from 'next/link';
const Search = () => {
  const data = tempData.slice(0, 15);
  return (
    <InputWrapper>
      <label htmlFor="input">
        <BsSearch className="search-icon" />
      </label>
      <input
        id="input"
        className="search-input"
        type="text"
        placeholder="Search by name"
      />
      <div className="results">
        {data.map((breed) => {
          const { id, name } = breed;
          console.log(id, name);

          return (
            <Link href={`/breeds/${id}`} key={id}>
              <a>{name}</a>
            </Link>
          );
        })}
      </div>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  margin: 3em 0 4em;
  .search-input {
    border: none;
    /* box-shadow: 0 0 0 0.2em var(--clr-black); */
    width: 100%;
    border-radius: 1em;
    padding: 0.25em 1em;
    ::placeholder {
      color: var(--clr-black);
      margin: 1em;
      font-family: var(--ff-paragraph);
    }
    &:focus {
      outline: 0.1em solid var(--clr-secondary-700);
    }
  }

  .search-icon {
    position: absolute;
    font-size: 1.25em;
    right: 0.5em;
    bottom: 0.2em;
    color: var(--clr-black);
  }

  .results {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    position: absolute;
    z-index: 1;
    top: 3em;
    left: 0;
    right: 0;
    background: var(--clr-secondary-500);
    border-radius: 0.5em;
    max-height: 300px;
    overflow-y: scroll;
    box-shadow: 1px 2px 5px var(--clr-grey);
    a {
      display: block;
      padding: 1em;
      letter-spacing: 0.5px;
      :hover {
        background: rgba(100, 100, 100, 0.05);
      }
    }
  }
  .results::-webkit-scrollbar {
    width: 0.75em;
  }
  .results::-webkit-scrollbar-track {
    background: var(--clr-secondary-500);
    border-radius: 0.5em;
  }
  .results::-webkit-scrollbar-thumb {
    background-color: var(--clr-grey);
    border-radius: 0.5em;
    border: 0.25em solid var(--clr-secondary-500);
  }
  /* firefox scrollbar support */
  .results {
    scrollbar-width: thin;
    scrollbar-color: var(--clr-grey) var(--clr-secondary-500); /* scroll thumb and track */
  }
`;
export default Search;

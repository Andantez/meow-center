import styled from 'styled-components';
import Link from 'next/link';
import { useHomeContext } from '../context/home_context';

import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Search = () => {
  const {
    setUserQuery,
    searchResults,
    query,
    setFocus,
    setBlur,
    itsOnFocus,
    isLoadingData,
    noResultsFound,
  } = useHomeContext();

  return (
    <InputWrapper>
      <label htmlFor="input">
        <BiSearch className="search-icon" />
        {query && (
          <AiOutlineClose
            className="close-icon"
            onClick={() => setUserQuery('')}
          />
        )}
      </label>
      <input
        onChange={(e) => setUserQuery(e.target.value)}
        onFocus={setFocus}
        onBlur={setBlur}
        id="input"
        className="search-input"
        type="text"
        placeholder="Search by name"
        value={query}
      />
      <div className="results">
        {searchResults &&
          itsOnFocus &&
          searchResults.map((breed) => {
            const { id, name } = breed;
            return (
              <Link href={`/breeds/${id}`} key={id}>
                <a
                  onClick={() => setUserQuery('')}
                  // prevents from Focus event firing and closing the results div
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {name}
                </a>
              </Link>
            );
          })}
        {/*if its  fetching data show loader */}
        {isLoadingData && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        {/* if there are no results found */}
        {noResultsFound && (
          <div className="no-results">
            <p>No results for "{query}".</p>
            <p>Try again with different name.</p>
          </div>
        )}
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
    padding: 0.25em 1.5em;
    outline-offset: 3px;
    ::placeholder {
      color: var(--clr-grey);
      margin: 1em;
      font-family: var(--ff-paragraph);
    }
    &:focus {
      outline: 0.1em solid var(--clr-primary-500);
    }
  }

  .search-icon,
  .close-icon {
    position: absolute;
    font-size: 1rem;
  }
  .search-icon {
    left: 0.4em;
    bottom: 0.35em;
    color: var(--clr-grey);
  }
  .close-icon {
    right: 0.75em;
    bottom: 0.35em;
    color: var(--clr-primary-500);
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
    overflow-y: auto;
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

  .no-results {
    padding: 3em 1em;
    text-align: center;
    p {
      font-size: 0.875rem;
    }
  }

  .loader-wrapper {
    padding: 3em;
    text-align: center;
  }
  .loader {
    display: inline-block;
    border: 3px solid var(--clr-lightgrey);
    height: 3em;
    width: 3em;
    border-radius: 50%;
    border-top: 3px solid var(--clr-primary-500);
    border-left: 3px solid var(--clr-primary-500);
    animation: rotate 0.7s linear infinite;
  }

  @media (min-width: 1024px) {
  }
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;
export default Search;

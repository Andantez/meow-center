import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
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
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  margin: 3em 0 4em;
  .search-input {
    border: none;
    box-shadow: 0 0 0 0.2em var(--clr-black);
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
`;
export default Search;

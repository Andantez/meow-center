import Select from 'react-select';

const customStyles = {
  option: (provided, { isFocused }) => ({
    ...provided,
    borderBottom: '1px solid var(--clr-lightgrey)',
    color: 'var(--clr-primary-500)',
    fontFamily: 'var(--ff-paragraph)',
    padding: 20,
    backgroundColor: isFocused
      ? 'hsl(270, 2%, 92%)'
      : 'var(--clr-secondary-300)',
    ':active': {
      ...provided[':active'],
      backgroundColor: 'var(--clr-light-yellow)',
    },
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'hsl(270, 2%, 93%)',
    };
  },
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'var(--clr-black)',
    ':hover': {
      backgroundColor: 'var(--clr-red-300)',
      color: 'var(--clr-red-500)',
    },
  }),
  menuList: (styles) => ({
    ...styles,
    '::-webkit-scrollbar': {
      width: '0.75em',
    },
    '::-webkit-scrollbar-track': {
      background: 'var(--clr-secondary-500)',
      borderRadius: '0.5em',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'var(--clr-grey)',
      borderRadius: '0.5em',
      border: '0.2em solid var(--clr-secondary-500)',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'var(--clr-black)',
    },
    borderRadius: '0.5em',
  }),
  control: (styles, state) => ({
    ...styles,
    border: state.isFocused
      ? '1px solid var(--clr-black)'
      : '1px solid var(--clr-grey)',
    boxShadow: state.isFocused ? '0 0 0 1px var(--clr-black)' : 'none',
    ':hover': {
      border: '1px solid var(--clr-black)',
      boxShadow: '0 0 0 1px var(--clr-black)',
    },
    borderRadius: '0.5em',
    height: '100%',
    minHeight: 31,
    backgroundColor: 'var(--clr-secondary-500)',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'var(--clr-black)',
  }),
  menu: (base) => ({
    ...base,
    width: 'max-content',
    minWidth: '100%',
    borderRadius: '0.5em',
  }),
  container: (styles) => ({
    ...styles,
    minWidth: '15em',
  }),
  // valueContainer: (styles) => ({
  //   ...styles,
  // }),
  placeholder: (styles) => ({
    ...styles,
    margin: 0,
    color: 'var(--clr-black)'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '0 8px 0 8px',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: '0 8px 0 0',
  }),
  input: (styles) => ({
    ...styles,
    minWidth: '1em',
  }),
};
const ReactSelect = ({
  selectedOptions,
  data,
  setSelectedData,
  chartType,
  placeholder,
}) => {
  const maxOptions = 5;

  const options = () => {
    if (chartType === 'bar') {
      return data.flat().map((breed) => {
        const {
          'avg weight(kg)': avg_weight,
          'max lifespan': max_lifespan,
          'min lifespan': min_lifespan,
          'breed name': breed_name,
        } = breed;
        return {
          value: breed_name,
          label: breed_name,
          'avg weight(kg)': avg_weight,
          'max lifespan': max_lifespan,
          'min lifespan': min_lifespan,
          'breed name': breed_name,
        };
      });
    }

    if (chartType === 'radar') {
      return data.flat().map((breed) => {
        const {
          name,
          adaptability,
          affection,
          'child friendly': child_friendly,
          shedding,
          'health issues': health_issues,
          energy,
          grooming,
          intelligence,
        } = breed;

        return {
          value: name,
          label: name,
          name,
          adaptability,
          affection,
          'child friendly': child_friendly,
          shedding,
          'health issues': health_issues,
          energy,
          grooming,
          intelligence,
          chartType: 'radar',
        };
      });
    }
  };

  const handleSelect = (e) => {
    setSelectedData(e);
    // temporary to be removed later.
    // const filteredData = e.map((selectedBreed) => {
    //   return data
    //     .flat()
    //     .find((breed) => breed['breed name'] === selectedBreed.value);
    // });
  };

  return (
    <Select
      options={selectedOptions.length === maxOptions ? [] : options()}
      isMulti={true}
      className="multi-select"
      classNamePrefix="my_prefix"
      name="breeds"
      onChange={handleSelect}
      isOptionDisabled={(option) => selectedOptions.length >= maxOptions}
      noOptionsMessage={() => {
        return selectedOptions.length === maxOptions
          ? 'You have reached the max options available'
          : 'No options available';
      }}
      styles={customStyles}
      placeholder={placeholder}
      inputId='react-select'
    />
  );
};

export default ReactSelect;

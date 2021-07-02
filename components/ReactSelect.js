import Select from 'react-select';

const ReactSelect = ({ selectedOptions, data, setSelectedData }) => {
  const maxOptions = 5;

  const options = data.flat().map((breed) => ({
    value: breed['breed name'],
    label: breed['breed name'],
  }));

  const handleSelect = (e) => {
    const filteredData = e.map((selectedBreed) => {
      return data
        .flat()
        .find((breed) => breed['breed name'] === selectedBreed.value);
    });
    setSelectedData(filteredData);
  };
  return (
    <Select
      options={selectedOptions.length === maxOptions ? [] : options}
      isMulti={true}
      className="multi-select"
      name="breeds"
      onChange={handleSelect}
      isOptionDisabled={(option) => selectedOptions.length >= maxOptions}
      noOptionsMessage={() => {
        return selectedOptions.length === maxOptions
          ? 'You have reached the max options available'
          : 'No options available';
      }}
    />
  );
};

export default ReactSelect;

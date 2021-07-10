import Select from 'react-select';

const ReactSelect = ({ selectedOptions, data, setSelectedData, chartType }) => {
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

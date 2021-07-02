import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';

const colors = {
  'min lifespan': '#ffc09f',
  'max lifespan': '#ffee93',
  'avg weight(kg)': '#a0ced9',
};
const getColor = (bar) => colors[bar.id];

const BarChart = ({ data }) => {
  const [activePage, setActivePage] = useState(0);
  const [layout, setLayout] = useState('vertical');
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const maxOptions = 5;
  const options = data.flat().map((breed) => ({
    value: breed['breed name'],
    label: breed['breed name'],
  }));

  const handlePrevious = () => {
    setActivePage((prevState) => {
      let tempState = prevState - 1;
      if (prevState <= 0) {
        return data.length - 1;
      }
      return tempState;
    });
  };
  const handleNext = () => {
    setActivePage((prevState) => {
      let tempState = prevState + 1;
      if (tempState >= data.length) {
        tempState = 0;
      }
      return tempState;
    });
  };

  const handleSelect = (e) => {
    const filteredData = e.map((selectedBreed) => {
      return data
        .flat()
        .find((breed) => breed['breed name'] === selectedBreed.value);
    });
    setSelectedBreeds(filteredData);
  };

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedBreeds]);
  return (
    <StyledDiv>
      <StyledForm>
        <label htmlFor="layout">Display</label>
        <select
          name="layout"
          id="layout"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </StyledForm>
      <Select
        options={selectedBreeds.length === maxOptions ? [] : options}
        isMulti={true}
        className="multi-select"
        name="breeds"
        onChange={handleSelect}
        isOptionDisabled={(option) => selectedBreeds.length >= maxOptions}
        noOptionsMessage={() => {
          return selectedBreeds.length === maxOptions ? 'You have reached the max options available' : "No options available";
        }}
      />
      <ResponsiveBar
        data={isSelected ? selectedBreeds : data[activePage]}
        keys={['min lifespan', 'max lifespan', 'avg weight(kg)']}
        indexBy="breed name"
        margin={{ top: 16, right: 120, bottom: 50, left: 130 }}
        padding={0.1}
        innerPadding={2}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={getColor}
        layout={layout}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'Breed Name',
        //   legendPosition: 'middle',
        //   legendOffset: 42,
        // }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#343446"
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />

      <Pagination>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isSelected}
          className={`${isSelected ? 'disabled-btn' : ''}`}
        >
          <BsChevronLeft />
        </button>
        {data.map((item, index) => {
          return (
            <button
              disabled={isSelected}
              key={index}
              type="button"
              onClick={() => setActivePage(index)}
              className={`${index === activePage && !isSelected ? 'active-page' : ''} ${
                isSelected ? 'disabled-btn' : ''
              }`}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          type="button"
          onClick={handleNext}
          disabled={isSelected}
          className={`${isSelected ? 'disabled-btn' : ''}`}
        >
          <BsChevronRight />
        </button>
      </Pagination>
    </StyledDiv>
  );
};
const StyledForm = styled.form`
  display: flex;
  align-items: center;

  select {
    font-size: 0.8125rem;
    color: var(--clr-primary-500);
    background-color: var(--clr-secondary-500);
    padding: 0.25em;
    width: fit-content;
    border: transparent;
    border-radius: 0.5em;
    border: 1px solid var(--clr-grey);
    text-transform: capitalize;
    margin-left: 0.5em;
    &:focus {
      /* outline: 1px solid var(--clr-grey); */
    }
  }
  label {
    font-weight: var(--fw-bold);
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.125em;
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--clr-grey);
    padding: 0.25em 0.5em;
    transition: color 250ms ease, background-color 250ms ease;
    &:hover {
      color: var(--clr-black);
      /* text-decoration: underline 2px;
      text-underline-offset: 1.5px; */
      background-color: hsl(270, 2%, 92%);
    }
  }

  .active-page {
    font-weight: var(--fw-bold);
    color: var(--clr-black);
    text-decoration: underline 2px;
    text-underline-offset: 1.5px;
  }

  .disabled-btn {
    opacity: 0.4;
    pointer-events: none;
  }
`;
const StyledDiv = styled.div`
  height: 500px;
`;

export default BarChart;

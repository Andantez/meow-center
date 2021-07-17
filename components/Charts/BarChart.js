import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';

import ReactSelect from '../ReactSelect';
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

  const handleActivePage = (index) => {
    setActivePage(index);
  };
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

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedBreeds]);
  return (
    <StyledDiv>
      <div className="select-wrapper">
        <StyledForm>
          <label htmlFor="layout">Display</label>
          <select
            name="layout"
            id="layout"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="vertical" className="option-hover">
              Vertical
            </option>
            <option value="horizontal" className="option-hover">
              Horizontal
            </option>
          </select>
        </StyledForm>
        <div className="breeds-select">
          <label htmlFor="react-select">Breeds</label>
          <ReactSelect
            selectedOptions={selectedBreeds}
            data={data}
            setSelectedData={setSelectedBreeds}
            chartType="bar"
            placeholder="Select..."
          />
        </div>
      </div>
      <ResponsiveBar
        data={isSelected ? selectedBreeds : data[activePage]}
        keys={['min lifespan', 'max lifespan', 'avg weight(kg)']}
        indexBy="breed name"
        margin={{ top: 16, right: 120, bottom: 50, left: 110 }}
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
            symbolSize: 15,
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
      <Pagination
        data={data}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleActivePage={handleActivePage}
        activePage={activePage}
        isSelected={isSelected}
      />
    </StyledDiv>
  );
};
const StyledForm = styled.form`
  display: flex;
  align-items: center;
  select {
    /* font-size: 0.8125rem; */
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
      border: 1px solid var(--clr-black);
      box-shadow: 0 0 0 1px var(--clr-black);
    }

  &:hover {
    border: 1px solid var(--clr-black);
      box-shadow: 0 0 0 1px var(--clr-black);
  }
  }
  label {
    font-weight: var(--fw-bold);
  }
`;
const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: auto 500px;
  gap: 1em;

  .select-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .breeds-select {
    display: grid;
    grid-template-columns: auto 1fr;
    place-items: center;
    gap: 0.5em;

    label {
      font-weight: var(--fw-bold);
    }
  }
`;

export default BarChart;

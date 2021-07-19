import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import { RiBarChartHorizontalFill, RiBarChartFill } from 'react-icons/ri';
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
  const layoutIsVertical = layout === 'vertical';
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
      <div className="info">
        <h2>Compare breeds based on their lifespan andn weight.</h2>
      </div>
      <div className="select-wrapper">
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
        <StyledForm layout={layout}>
          <button
            type="button"
            className="vertical"
            onClick={() => setLayout('vertical')}
          >
            <RiBarChartFill />
          </button>
          <button
            type="button"
            className="horizontal"
            onClick={() => setLayout('horizontal')}
          >
            <RiBarChartHorizontalFill />
          </button>
        </StyledForm>
      </div>
      <ResponsiveBar
        data={isSelected ? selectedBreeds : data[activePage]}
        keys={['min lifespan', 'max lifespan', 'avg weight(kg)']}
        indexBy="breed name"
        margin={{
          top: 10,
          right: 30,
          bottom: 50,
          left: layoutIsVertical ? 30 : 120,
        }}
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
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 11,
                fill: '#343446',
                fontFamily: 'Bitter',
              },
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#343446"
        // legends={[
        //   {
        //     dataFrom: 'keys',
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 0.85,
        //     itemTextColor: '#343446',
        //     symbolSize: 15,
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
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

  .vertical,
  .horizontal {
    background: transparent;
    border: transparent;
    font-size: 1.5rem;
    transition: color 250ms ease;
    cursor: pointer;
  }

  .horizontal {
    margin-left: 0.25em;
    color: ${(props) =>
      props.layout === 'horizontal' ? 'var(--clr-primary-500)' : '#b5b5b5'};
  }
  .vertical {
    color: ${(props) =>
      props.layout === 'vertical' ? 'var(--clr-primary-500)' : '#b5b5b5'};
  }
`;
const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: auto auto 500px auto;
  gap: 2em;

  .select-wrapper {
    display: flex;
    justify-content: space-between;
    /* flex-direction: column; */
    /* margin-top: 1em; */
  }

  .breeds-select {
    display: flex;
    align-items: center;
    /* margin-top: 0.5em; */

    label {
      font-weight: var(--fw-bold);
      margin-right: 0.5em;
    }
  }

  .multi-select,
  label {
    font-size: 0.8125rem;
  }
  .info {
    h2 {
      font-size: 1.25rem;
      color: var(--clr-primary-500);
    }
  }
  @media (min-width: 768px) {
    .multi-select,
    label {
      font-size: 1rem;
    }
  }

  .info {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export default BarChart;

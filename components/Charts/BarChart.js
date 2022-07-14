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
  const [legendKeys, setLegendKeys] = useState([
    'min lifespan',
    'max lifespan',
    'avg weight(kg)',
  ]);
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
  const handleOnClick = (e) => {
    const findKey = legendKeys.find((key) => key === e.target.name);

    if (findKey) {
      const filteredKeys = legendKeys.filter((key) => key !== e.target.name);
      setLegendKeys(filteredKeys);
    } else {
      const filteredKeys = [...legendKeys, e.target.name].sort((a, b) =>
        b.localeCompare(a)
      );
      setLegendKeys(filteredKeys);
    }

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
        <h2>Compare breeds based on their lifespan and weight</h2>
      </div>
      <div className="select-wrapper">
        <div className="breeds-select">
          <label htmlFor="barChart">Breeds</label>
          <ReactSelect
            selectedOptions={selectedBreeds}
            data={data}
            setSelectedData={setSelectedBreeds}
            chartType="bar"
            placeholder="Select..."
            inputId="barChart"
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
      <div className="bar-chart">
        <ResponsiveBar
          data={isSelected ? selectedBreeds : data[activePage]}
          keys={legendKeys}
          indexBy="breed name"
          margin={{
            top: 10,
            right: 30,
            bottom: 25,
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
        <div className="legend">
          <div>
            <span className="symbol"></span>
            <button
              type="button"
              className={`${
                legendKeys.find((lk) => lk === 'min lifespan') ? '' : 'removed'
              }`}
              name="min lifespan"
              onClick={handleOnClick}
            >
              min lifespan
            </button>
          </div>
          <div>
            <span className="symbol"></span>
            <button
              type="button"
              className={`${
                legendKeys.find((lk) => lk === 'max lifespan') ? '' : 'removed'
              }`}
              name="max lifespan"
              onClick={handleOnClick}
            >
              max lifespan
            </button>
          </div>
          <div>
            <span className="symbol"></span>
            <button
              type="button"
              className={`${
                legendKeys.find((lk) => lk === 'avg weight(kg)')
                  ? ''
                  : 'removed'
              }`}
              name="avg weight(kg)"
              onClick={handleOnClick}
            >
              avg weight(kg)
            </button>
          </div>
        </div>
      </div>
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
  margin-left: 0.75em;
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
  grid-template-rows: auto auto 1fr auto;
  gap: 1.5em;

  .select-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .breeds-select {
    display: flex;
    align-items: center;

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
  .legend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5em;
    place-self: flex-end;
    width: max-content;
    grid-column: 1;
    grid-row: 1;
  }
  .legend > div {
    display: flex;
    align-items: center;
    font-size: 0.8125rem;
  }
  .symbol {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
  }
  .legend div:nth-child(1) span {
    background-color: #ffc09f;
  }
  .legend div:nth-child(2) span {
    background-color: #ffee93;
  }
  .legend div:nth-child(3) span {
    background-color: #a0ced9;
  }
  .legend button {
    margin-left: 0.5em;
    font-size: 0.8125rem;
    color: var(--clr-primary-500);
    background: transparent;
    border: transparent;
    cursor: pointer;
    &:hover {
      color: var(--clr-grey);
    }
  }
  button.removed {
    color: var(--clr-grey);
    text-decoration: line-through;
    text-decoration-color: var(--clr-black);
  }
  .bar-chart {
    display: grid;
    grid-template-rows: auto 500px;
    gap: 0.5em;
    margin-top: 0.5em;
  }
  @media (min-width: 768px) {
    .multi-select,
    label {
      font-size: 1rem;
    }
    .info {
      h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media (min-width: 1024px) {
    .bar-chart {
      grid-template-rows: 500px;
      grid-template-columns: 1fr auto;
    }
    .legend {
      grid-column: 2;
      grid-row: 1;
      grid-template-columns: 1fr;
      margin-bottom: 1.563em;
    }
  }
`;

export default BarChart;

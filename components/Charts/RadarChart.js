import { ResponsiveRadar } from '@nivo/radar';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination';
import ReactSelect from '../ReactSelect';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

const colors = [
  '#ffc09f',
  '#ffee93',
  '#adf7b6',
  '#a0ced9',
  '#8684E8',
  '#E075A7',
  '#D6C66B',
  '#4FE0B2',
];
const temperamentList = [
  'adaptability',
  'affection',
  'child friendly',
  'shedding',
  'health issues',
  'energy',
  'grooming',
  'intelligence',
];
const RadarChart = ({ data }) => {
  const [activePage, setActivePage] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [temperaments, setTemperaments] = useState(temperamentList);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [showLegend, setShowLegend] = useState(true);
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
    const name = e.target.name;
    const findTemperament = temperaments.find(
      (temperament) => temperament === name
    );
    if (findTemperament) {
      const filteredTemperaments = temperaments.filter(
        (temperament) => temperament !== name
      );
      setTemperaments(filteredTemperaments);
    } else {
      setTemperaments((prevState) => {
        return [...prevState, name];
      });
    }
  };
  
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setShowLegend(true);
    }
  };
  useEffect(() => {
    if (selectedBreeds.length >= 3) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedBreeds]);


  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setShowLegend(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <StyledDiv>
      <div className="heading">
        <h2>Compare breeds based on their characteristic</h2>
      </div>
      <div className="select">
        <label htmlFor="radarChart">Breeds</label>
        <ReactSelect
          selectedOptions={selectedBreeds}
          data={data}
          setSelectedData={setSelectedBreeds}
          chartType="radar"
          placeholder="Select at least 3 breeds"
          inputId="radarChart"
        />
      </div>
      <div className="radar-chart">
        <ResponsiveRadar
          data={
            isSelected && selectedBreeds.length >= 3
              ? selectedBreeds
              : data[activePage]
          }
          keys={temperaments}
          indexBy="name"
          maxValue="auto"
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: 'color' }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={24}
          enableDots={true}
          dotSize={6}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color' }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-7}
          colors={colors}
          colorBy="index"
          fillOpacity={0.2}
          blendMode="multiply"
          animate={true}
          motionConfig="wobbly"
          isInteractive={true}
          // legends={[
          //   {
          //     anchor: 'top-left',
          //     direction: 'column',
          //     translateX: -50,
          //     translateY: -40,
          //     itemWidth: 80,
          //     itemHeight: 20,
          //     itemTextColor: '#999',
          //     symbolSize: 12,
          //     symbolShape: 'circle',
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemTextColor: '#000',
          //         },
          //       },
          //     ],
          //   },
          // ]}
        />
        <div className="legend">
          <div className="show-wrapper">
            <button
              type="button"
              className="btn"
              onClick={() => setShowLegend(!showLegend)}
            >
              {showLegend ? 'Collapse' : 'Expand'}
              {showLegend ? <BiMinus /> : <BsPlus />}
            </button>
          </div>
          {showLegend && (
            <div className="temperament-list">
              {temperamentList.map((temperament, index) => {
                return (
                  <div className="wrapper" key={index + temperament}>
                    <StyledSpan color={colors[index % colors.length]} />
                    <button
                      type="button"
                      name={temperament}
                      onClick={handleOnClick}
                      className={`${
                        temperaments.find((temp) => temp === temperament)
                          ? ''
                          : 'removed'
                      }`}
                    >
                      {temperament}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Pagination
        data={data}
        handleActivePage={handleActivePage}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        activePage={activePage}
        isSelected={isSelected}
      />
    </StyledDiv>
  );
};
const StyledSpan = styled.span`
  display: inline-block;
  width: 0.8125em;
  height: 0.8125em;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const StyledDiv = styled.div`
  display: grid;
  gap: 1.5em;
  .radar-chart {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 300px auto;
    gap: 0.5em;
  }

  .temperament-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1.5em;
    gap: 0.25em;
    div:nth-child(2n) {
      margin-left: 1.5em;
    }
  }
  .wrapper {
    width: max-content;
    button {
      background-color: transparent;
      border: transparent;
      margin-left: 0.5em;
      cursor: pointer;
      font-size: 0.8125rem;
      color: var(--clr-primary-500);
      &:hover {
        color: var(--clr-grey);
      }
    }
  }
  button.removed {
    color: var(--clr-grey);
    text-decoration: line-through;
    text-decoration-color: var(--clr-black);
  }

  .select {
    display: flex;
    align-items: center;

    label {
      font-size: 0.8125rem;
      font-weight: var(--fw-bold);
    }
  }

  .multi-select {
    margin-left: 0.5em;
  }
  h2 {
    font-size: 1.25rem;
    color: var(--clr-primary-500);
  }
  .show-wrapper {
    margin-bottom: 1em;
  }
  .btn {
    background-color: transparent;
    border: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.8125rem;
    color: var(--clr-primary-500);
    letter-spacing: 0.5px;
    margin-left: auto;
    margin-right: 1.5em;
    &:hover {
      color: var(--clr-grey);
    }
  }

  @media (min-width: 768px) {
    .radar-chart {
      grid-template-rows: 450px auto;
    }
  }

  @media (min-width: 1024px) {
    .radar-chart {
      grid-template-rows: 500px;
      grid-template-columns: 1fr;
      position: relative;
    }

    .legend {
      place-self: center;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .temperament-list {
      grid-template-columns: 1fr;
      padding: 0;

      div:nth-child(2n) {
        margin-left: 0;
      }
    }
    .show-wrapper {
      display: none;
    }
  }
`;
export default RadarChart;

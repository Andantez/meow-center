import { ResponsiveRadar } from '@nivo/radar';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination';
import ReactSelect from '../ReactSelect';

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
    const findTemperament = temperaments.find(temperament => temperament === name);
    if (findTemperament) {
      const filteredTemperaments = temperaments.filter(temperament => temperament !== name);
      setTemperaments(filteredTemperaments);
    } else {
      setTemperaments(prevState => {
        return [...prevState, name]
      })
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
      <ReactSelect
        selectedOptions={selectedBreeds}
        data={data}
        setSelectedData={setSelectedBreeds}
        chartType="radar"
      />
      <div className="radar-chart">
        <ResponsiveRadar
          data={isSelected ? selectedBreeds : data[activePage]}
          keys={temperaments}
          indexBy="name"
          maxValue="auto"
          margin={{ top: 70, right: 40, bottom: 40, left: 40 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: 'color' }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color' }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-10}
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
  .radar-chart {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 500px;
  }

  .temperament-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    div:not(:first-child) {
      margin-top: 0.5em;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: transparent;
      width: max-content;
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
`;
export default RadarChart;

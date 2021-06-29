import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
const PieChart = ({ data }) => {
  const [breedData, setBreedData] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = (e) => {
    const id = e.target.dataset.id;
    const origin = e.target.dataset.origin;
    const value = e.target.dataset.value;
    const findId = breedData.find((breed) => breed.id === id);

    if (findId) {
      const filteredData = breedData.filter((breed) => breed.id !== id);
      setBreedData(filteredData);
    } else {
      const filteredData = [...breedData, { id, origin, value }].sort((a, b) =>
        a.id.localeCompare(b.id)
      );
      setBreedData(filteredData);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  };
  
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <StyledDiv>
      <ResponsivePie
        data={breedData}
        colors={colors}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={5}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        // legends={[
        //   {
        //     anchor: 'right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 0,
        //     itemsSpacing: 4,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: '#999',
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 18,
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
      <div className="legend-container">
        {isOpen && (
          <div className="legend-wrapper">
            {data.map((breedOrigin, index) => {
              const { origin, id, value } = breedOrigin;
              return (
                <div className="wrapper" key={breedOrigin + index}>
                  <StyledSpan
                    color={colors[index % colors.length]}
                  ></StyledSpan>{' '}
                  <button
                    type="button"
                    className={`btn ${
                      !breedData.find((breed) => breed.id === id)
                        ? 'not-included'
                        : ''
                    }`}
                    data-id={id}
                    data-origin={origin}
                    data-value={breedOrigin.value}
                    onClick={handleOnClick}
                  >
                    {origin}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="expand-wrapper">
          {isOpen ? 'Collapse' : 'Expande'}{' '}
          <button
            type="button"
            className="expand-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <BiMinus /> : <BsPlus />}
          </button>
        </div>
      </div>
    </StyledDiv>
  );
};
const StyledSpan = styled.span`
  display: inline-block;
  width: 0.8125em;
  height: 0.8125em;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
`;
const StyledDiv = styled.div`
  /* border: 1px solid black; */
  /* height: 500px; */
  display: grid;
  grid-template-rows: 300px 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  margin: 0 auto;
  gap: 1em;
  .legend-wrapper div:not(:first-child) {
    margin-top: 0.5em;
  }
  .legend-container {
    position: relative;
  }
  .legend-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 1.5em;
  }
  .wrapper {
    display: flex;
    align-items: center;
  }

  .btn,
  .expand-btn {
    border: transparent;
    background-color: transparent;
    cursor: pointer;
    width: max-content;
  }
  .btn {
    margin-left: 0.5em;
    font-size: 0.8125rem;
    color: var(--clr-primary-500);
    &:hover {
      color: var(--clr-grey);
    }
  }
  .not-included {
    color: var(--clr-grey);
    text-decoration: line-through;
    text-decoration-color: var(--clr-black);
  }
  .expand-btn {
    color: var(--clr-black);
    font-size: 1.25rem;
    border-radius: 50%;
    padding: 0.25em;
    display: flex;
    align-items: center;
  }
  .expand-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 0.8125rem;
    color: var(--clr-grey);
    top: -1.5em;
    right: 1.5em;
  }
  @media (min-width: 768px) {
    grid-template-rows: 450px 1fr;
    gap: 1em;
    .legend-wrapper {
      gap: 0.5em;
      grid-template-columns: repeat(5, 1fr);
      padding: 0;
    }

    .expand-wrapper {
      top: -2.5em;
      right: 0em;
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: 500px;
    .legend-wrapper {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .expand-wrapper {
      display: none;
    }
  }
`;
export default PieChart;

import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const colors = {
  'minimum lifespan': '#ffc09f',
  'maximum lifespan': '#ffee93',
  imperial: '#adf7b6',
  metric: '#a0ced9',
};
const getColor = (bar) => colors[bar.id];

const BarChart = ({ data, layout }) => {
  return (
    <StyledDiv>
      <ResponsiveBar
        data={data[7]}
        keys={['minimum lifespan', 'maximum lifespan', 'imperial', 'metric']}
        indexBy="breed name"
        margin={{ top: 16, right: 130, bottom: 50, left: 130 }}
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
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Breed Name',
          legendPosition: 'middle',
          legendOffset: 42,
        }}
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
        <button type="button">
          <BsChevronLeft />
        </button>
        {data.map((item, index) => {
          return <button type="button" className={`${index === 3? 'active-page' : ''}`}>{index + 1}</button>;
        })}
        <button type="button">
          <BsChevronRight />
        </button>
      </Pagination>
    </StyledDiv>
  );
};

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
`;
const StyledDiv = styled.div`
  height: 500px;
`;

export default BarChart;

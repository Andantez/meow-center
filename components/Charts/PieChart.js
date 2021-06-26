import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data }) => (
  <ResponsivePie
    data={data}
    colors={{ scheme: 'accent' }}
    // enableArcLabels={false}
    // enableArcLinkLabels={false}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.2)',
        size: 5,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: 'squares',
        type: 'patternSquares',
        size: 5,
        padding: 4,
        stagger: false,
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
      },
    ]}
    fill={[
      {
        match: {
          id: 'United States',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'United Kingdom',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'Russia',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'Thailand',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'Canada',
        },
        id: 'squares',
      },
      {
        match: {
          id: 'Egypt',
        },
        id: 'squares',
      },
    ]}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 0,
        itemsSpacing: 4,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

export default PieChart;

import { ResponsiveRadar } from '@nivo/radar';

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

const RadarChart = ({ data, temperaments, filterTemperaments }) => (
  <ResponsiveRadar
    data={data}
    keys={temperaments}
    indexBy="name"
    maxValue="auto"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
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
    dotLabelYOffset={-12}
    colors={colors}
    colorBy="index"
    fillOpacity={0.2}
    blendMode="multiply"
    animate={true}
    motionConfig="wobbly"
    isInteractive={true}
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        symbolSize: 12,
        symbolShape: 'circle',
        onClick: (e) => filterTemperaments(e),
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

export default RadarChart;

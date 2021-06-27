import { ResponsiveBar } from '@nivo/bar';

const colors = {
  'minimum lifespan': '#ffc09f',
  'maximum lifespan': '#ffee93',
  imperial: '#adf7b6',
  metric: '#a0ced9',
};
const getColor = (bar) => colors[bar.id];

const BarChart = ({ data, layout }) => {


  return (
    <>
    <ResponsiveBar
      data={data.slice(0, 5)}
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
    </>
  );
  };

export default BarChart;

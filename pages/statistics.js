import Head from 'next/head';
import styled from 'styled-components';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import RadarChart from '../components/Charts/RadarChart';
import {
  calculateOriginOccurence,
  formatBarChartData,
  formatRadarChartData,
  paginate,
} from '../utils/helpers';

const Statistics = ({ pieChartData, barChartData, radarChartData }) => {
  return (
    <>
      <div>
        <Head>
          <title>Statistics | Meow Portal</title>
        </Head>
        Statistics Page
        <StyledDiv>
          {/* Pie Chart */}
          <PieChart data={pieChartData} />
          {/* Bar Chart */}
          <BarChart data={barChartData} />
          {/* Radar Chart */}
          <RadarChart data={radarChartData} />
        </StyledDiv>
      </div>
    </>
  );
};
const StyledDiv = styled.div`
  /* reminder to remove the height later and add grid and height to other charts */
  /* height: 500px;   */
  width: 90vw;
  max-width: 1000px;
  margin: 5em auto;
  font-family: var(--ff-paragraph);
  color: var(--clr-primary-500);

  & > div:nth-child(2) {
    margin: 2em 0;
  }
  button.active {
    opacity: 1;
    border: 1px solid var(--clr-black);
  }
`;

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/breeds`, {
    headers: {
      'x-api-key': process.env.X_API_KEY,
    },
  });
  const data = await res.json();
  const formattedBarData = formatBarChartData(data);
  const formattedRadarData = formatRadarChartData(data);

  const pieChartData = calculateOriginOccurence(data);
  const barChartData = paginate(formattedBarData);
  const radarChartData = paginate(formattedRadarData);
  return {
    props: { pieChartData, barChartData, radarChartData },
    // revalidate: 1800,
  };
};
export default Statistics;

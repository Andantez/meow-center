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
        <StyledHeadingDiv>
          <h1>Cat Breeds Charts</h1>
          <p>Every cat breed has its own unique characteristics.</p>
          <p>
            Here you can compare breeds based on their characteristics and help
            you find the right cat breed for you!
          </p>
        </StyledHeadingDiv>
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
const StyledHeadingDiv = styled.div`
  width: 90vw;
  margin: 3em auto;
  max-width: 1000px;
  color: var(--clr-primary-500);
  h1 {
    font-family: var(--ff-heading);
    font-size: 2.25rem;
    text-align: center;
    margin-bottom: 0.5em;
  }

  p {
    font-family: var(--ff-paragraph);
    letter-spacing: 0.5px;
    line-height: 1.35;
    text-align: center;
  }

  @media (min-width: 1024px) {
    margin: 6em auto;
  }
`;
const StyledDiv = styled.div`
  /* reminder to remove the height later and add grid and height to other charts */
  /* height: 500px;   */
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
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

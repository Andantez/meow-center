import Head from 'next/head';
import styled from 'styled-components';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import RadarChart from '../components/Charts/RadarChart';
import {
  calculateOriginOccurence,
  formatBarChartData,
  formatRadarChartData,
  paginate
} from '../utils/helpers';
import { useState } from 'react';


const Statistics = ({
  pieChartData,
  barChartData,
  radarChartData,
}) => {
  const [temperaments, setTemperaments] = useState([
    'adaptability',
    'affection',
    'child friendly',
    'shedding',
    'health issues',
    'energy',
    'grooming',
    'intelligence',
  ]); // temporary
  const [[fromIndex, toIndex], setFromToIndex] = useState([0, 5]);
  const handleOnClick = (e) => {
    // temporary to be changed later
    const name = e.target.name;
    if (name === 'next') {
      setFromToIndex(([prevFrom, prevTo]) => {
        return [prevFrom + 5, prevTo + 5];
      });
    }
    if (name === 'prev') {
      setFromToIndex(([prevFrom, prevTo]) => {
        return [prevFrom - 5, prevTo - 5];
      });
    }
  };
  const filterTemperaments = (e) => {
    setTemperaments(temperaments.filter((temperament) => temperament !== e.id));
  };
  return (
    <div>
      <Head>
        <title>Statistics | Meow Portal</title>
      </Head>
      Statistics Page
      <StyledDiv>
        {/* Pie Chart */}
        <PieChart data={pieChartData} />
      </StyledDiv>
      <StyledDiv>
        <BarChart data={barChartData} />
      </StyledDiv>
      <StyledDiv>
        <RadarChart
          data={radarChartData}
          temperaments={temperaments}
          filterTemperaments={filterTemperaments}
        />
        <div>
          <p>Page</p>
          <button type="button" name="prev" onClick={handleOnClick}>
            prev
          </button>
          <button type="button" name="next" onClick={handleOnClick}>
            next
          </button>
        </div>
      </StyledDiv>
    </div>
  );
};
const StyledDiv = styled.div`
/* reminder to remove the height later and add grid and height to other charts */
  height: 500px;  
  width: 90vw;
  max-width: 1000px;
  margin: 5em auto;
  font-family: var(--ff-paragraph);
  color: var(--clr-primary-500);
  
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
  const formattedBarData = formatBarChartData(data)
  const formattedRadarData = formatRadarChartData(data)

  const pieChartData = calculateOriginOccurence(data);
  const barChartData = paginate(formattedBarData);
  const radarChartData = paginate(formattedRadarData);
  return {
    props: { pieChartData, barChartData, radarChartData},
    // revalidate: 1800,
  };
};
export default Statistics;

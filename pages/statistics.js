import Head from 'next/head';
import styled from 'styled-components';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import RadarChart from '../components/Charts/RadarChart';
import { calculateOriginOccurence, formatBarChartData } from '../utils/helpers';
import { useState } from 'react';

const data = [
  {
    taste: 'Persian',
    "affection level": 5,
    "child friendly": 3,
    "energy level": 2,
  },
  {
    taste: 'Syberian',
    "affection level": 3,
    "child friendly": 5,
    "energy level": 1,
  },
  {
    taste: 'Aegian',
    "affection level": 3,
    "child friendly": 4,
    "energy level": 4,
  },
  {
    taste: 'American Curl',
    "affection level": 2,
    "child friendly": 2,
    "energy level": 4,
  },
  {
    taste: 'Ragdoll',
    "affection level": 5,
    "child friendly": 5,
    "energy level": 3,
  },
];
const Statistics = ({ breeds }) => {
  const [layout, setLayout] = useState('vertical');
  const pieChartData = calculateOriginOccurence(breeds);
  const barChartData = formatBarChartData(breeds);

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
        {/* Bars Chart */}
        <div className="layout-nav">
          <button
            type="button"
            className={`${layout === 'vertical' ? 'active' : ''}`}
            onClick={() => setLayout('vertical')}
          >
            Vertically
          </button>
          <button
            type="button"
            className={`${layout === 'horizontal' ? 'active' : ''}`}
            onClick={() => setLayout('horizontal')}
          >
            Horizontally
          </button>
        </div>
        <BarChart data={barChartData} layout={layout} />
      </StyledDiv>
      <StyledDiv>
        <RadarChart data={data} />
      </StyledDiv>
    </div>
  );
};
const StyledDiv = styled.div`
  height: 500px;
  width: 90vw;
  /* max-width: 1200px; */
  margin: 5em auto;
  font-family: var(--ff-paragraph);
  color: var(--clr-primary-500);
  .layout-nav {
    margin-left: 120px;
    button {
      font-size: 0.8125rem;
      color: var(--clr-black);
      background: transparent;
      border: 1px solid var(--clr-grey);
      opacity: 0.7;
      padding: 0.5em 1.5em;
      cursor: pointer;
      transition: opacity 250ms ease, border 250ms ease;
      border-radius: 0.5em;
      &:hover {
        opacity: 1;
        border: 1px solid var(--clr-black);
      }
    }

    button:last-child {
      margin-left: 0.5em;
    }
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

  return {
    props: { breeds: data },
    revalidate: 1800,
  };
};
export default Statistics;

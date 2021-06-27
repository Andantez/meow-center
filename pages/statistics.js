import Head from 'next/head';
import styled from 'styled-components';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import { calculateOriginOccurence, formatBarChartData } from '../utils/helpers';
import { useState } from 'react';

const data = [
  {
    country: 'AD',
    'hot dog': 0,
    color: 'hsl(279, 70%, 50%)',
    burger: 67,
    burgerColor: 'hsl(354, 70%, 50%)',
    sandwich: 165,
    sandwichColor: 'hsl(319, 70%, 50%)',
    kebab: 186,
    kebabColor: 'hsl(17, 70%, 50%)',
    fries: 50,
    friesColor: 'hsl(75, 70%, 50%)',
    donut: 125,
    donutColor: 'hsl(358, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 137,
    'hot dogColor': 'hsl(213, 70%, 50%)',
    burger: 134,
    burgerColor: 'hsl(157, 70%, 50%)',
    sandwich: 21,
    sandwichColor: 'hsl(193, 70%, 50%)',
    kebab: 98,
    kebabColor: 'hsl(180, 70%, 50%)',
    fries: 135,
    friesColor: 'hsl(275, 70%, 50%)',
    donut: 180,
    donutColor: 'hsl(109, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 99,
    'hot dogColor': 'hsl(269, 70%, 50%)',
    burger: 110,
    burgerColor: 'hsl(106, 70%, 50%)',
    sandwich: 149,
    sandwichColor: 'hsl(252, 70%, 50%)',
    kebab: 47,
    kebabColor: 'hsl(222, 70%, 50%)',
    fries: 73,
    friesColor: 'hsl(198, 70%, 50%)',
    donut: 106,
    donutColor: 'hsl(258, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 112,
    'hot dogColor': 'hsl(335, 70%, 50%)',
    burger: 65,
    burgerColor: 'hsl(17, 70%, 50%)',
    sandwich: 123,
    sandwichColor: 'hsl(252, 70%, 50%)',
    kebab: 21,
    kebabColor: 'hsl(258, 70%, 50%)',
    fries: 87,
    friesColor: 'hsl(185, 70%, 50%)',
    donut: 56,
    donutColor: 'hsl(358, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 81,
    'hot dogColor': 'hsl(204, 70%, 50%)',
    burger: 159,
    burgerColor: 'hsl(261, 70%, 50%)',
    sandwich: 195,
    sandwichColor: 'hsl(5, 70%, 50%)',
    kebab: 77,
    kebabColor: 'hsl(121, 70%, 50%)',
    fries: 96,
    friesColor: 'hsl(350, 70%, 50%)',
    donut: 26,
    donutColor: 'hsl(245, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 93,
    'hot dogColor': 'hsl(99, 70%, 50%)',
    burger: 73,
    burgerColor: 'hsl(293, 70%, 50%)',
    sandwich: 113,
    sandwichColor: 'hsl(178, 70%, 50%)',
    kebab: 113,
    kebabColor: 'hsl(298, 70%, 50%)',
    fries: 142,
    friesColor: 'hsl(17, 70%, 50%)',
    donut: 42,
    donutColor: 'hsl(177, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 105,
    'hot dogColor': 'hsl(271, 70%, 50%)',
    burger: 48,
    burgerColor: 'hsl(225, 70%, 50%)',
    sandwich: 173,
    sandwichColor: 'hsl(94, 70%, 50%)',
    kebab: 92,
    kebabColor: 'hsl(27, 70%, 50%)',
    fries: 97,
    friesColor: 'hsl(22, 70%, 50%)',
    donut: 26,
    donutColor: 'hsl(349, 70%, 50%)',
  },
]; // To be changed with breed data.
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
        <PieChart data={pieChartData} />
      </StyledDiv>
      <StyledDiv>
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

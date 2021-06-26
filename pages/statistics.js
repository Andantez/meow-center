import Head from 'next/head';
import styled from 'styled-components';
import PieChart from '../components/Charts/PieChart';
import { calculateOriginOccurence } from '../utils/helpers';

const Statistics = ({ breeds }) => {
  const pieChartData = calculateOriginOccurence(breeds);

  return (
    <div>
      <Head>
        <title>Statistics | Meow Portal</title>
      </Head>
      Statistics Page
      <StyledDiv>
        <PieChart data={pieChartData} />
      </StyledDiv>
    </div>
  );
};
const StyledDiv = styled.div`
  height: 500px;
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

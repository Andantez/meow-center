import BreedsHero from '../../components/BreedsHero';
import Breeds from '../../components/Breeds';
import tempData from '../../data/tempData';

const BreedsPage = () => {

  const data = tempData.slice(0, 25);
  return (
    <>
      <BreedsHero />
      <Breeds initialData={data} />
    </>
  );
};

export default BreedsPage;

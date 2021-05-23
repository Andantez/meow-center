import GridView from './GridView';
import ListView from './ListView';
const BreedsList = ({ initialData }) => {

  const gridView = false ; // Controlled later by context state

  if (gridView) {
    return <GridView />;
  }
  return <ListView initialData={initialData} />;
};

export default BreedsList;

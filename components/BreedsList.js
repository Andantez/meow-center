import GridView from './GridView';
import ListView from './ListView';
const BreedsList = ({ initialData }) => {

  const gridView = true ; // Controlled later by context state

  if (gridView) {
    return <GridView initialData={initialData} />;
  }
  return <ListView initialData={initialData} />;
};

export default BreedsList;

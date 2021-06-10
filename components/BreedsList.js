import GridView from './GridView';
import ListView from './ListView';
import { useFiltersContext } from '../context/filters_context';

const BreedsList = ({ initialData }) => {
  const { gridView } = useFiltersContext();
  
  if (gridView) {
    return <GridView initialData={initialData} />;
  }
  return <ListView initialData={initialData} />;
};

export default BreedsList;

import GridView from './GridView';
import ListView from './ListView';
import { useFiltersContext } from '../context/filters_context';

const BreedsList = () => {
  const { gridView, filteredBreeds: breeds } = useFiltersContext();

  if (gridView) {
    return <GridView breeds={breeds} />;
  }
  return <ListView breeds={breeds} />;
};

export default BreedsList;

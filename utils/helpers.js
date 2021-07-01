export const getUniqueValues = (data, type) => {
  const origins = data
    .map((value) => {
      return value[type];
    })
    .sort((a, b) => a.localeCompare(b));

  return ['All', ...new Set(origins)];
};

export const getCharacteristics = (data) => {
  const {
    origin,
    adaptability,
    affection_level,
    child_friendly,
    energy_level,
    dog_friendly,
    grooming,
    health_issues,
    social_needs,
    intelligence,
    stranger_friendly,
    hypoallergenic,
    life_span,
    weight: { metric: weight },
  } = data;
  const characteristics = {
    origin,
    life_span,
    weight,
    hypoallergenic,
    adaptability,
    affection_level,
    child_friendly,
    stranger_friendly,
    dog_friendly,
    energy_level,
    grooming,
    health_issues,
    social_needs,
    intelligence,
  };
  return Object.entries(characteristics).map((entry) => {
    return { characteristic: entry[0].split('_').join(' '), value: entry[1] };
  });
};

export const calculateOriginOccurence = (data) => {
  const breedsData = [...data];

  const result = breedsData
    .reduce((acc, currentValue) => {
      const { origin } = currentValue;
      const tempOriginData =
        acc.find((breedItem) => breedItem.origin === origin) || {};

      if (!tempOriginData.id) {
        tempOriginData.id = origin;
        tempOriginData.origin = origin;
        tempOriginData.value = 1;
        return [...acc, tempOriginData];
      }
      tempOriginData.value += 1;
      return acc;
    }, [])
    .sort((a, b) => a.origin.localeCompare(b.origin));
  return result;
};

export const formatBarChartData = (data) => {
  const breedsData = [...data];
  const formattedData = breedsData.map((breed) => {
    const {
      name,
      life_span,
      weight: { imperial: weightImperial, metric: weightMetric },
    } = breed;
    const [minLifeExpectancy, maxLifeExpectancy] = life_span.split(' - ');
    const [minWeightImperial, maxWeightImperial] = weightImperial.split(' - ');
    const [minWeightMetric, maxWeightMetric] = weightMetric.split(' - ');
    const avarageWeightImperial =
      (Number(minWeightImperial) + Number(maxWeightImperial)) / 2;
    const avarageWeightMetric =
      (Number(minWeightMetric) + Number(maxWeightMetric)) / 2;

    return {
      'breed name': name,
      'min lifespan': Number(minLifeExpectancy),
      'max lifespan': Number(maxLifeExpectancy),
      'avg weight(kg)': avarageWeightMetric,
    };
  });

  return formattedData;
};

export const formatRadarChartData = (data) => {
  const breedsData = [...data];
  const result = breedsData.map((breed) => {
    const {
      name,
      adaptability,
      affection_level,
      child_friendly,
      energy_level,
      intelligence,
      shedding_level,
      grooming,
      health_issues,
    } = breed;

    return {
      name,
      adaptability,
      affection: affection_level,
      'child friendly': child_friendly,
      energy: energy_level,
      intelligence,
      shedding: shedding_level,
      grooming,
      'health issues': health_issues,
    };
  });
  return result;
};

export const paginate = (arrayData) => {
  const data = [...arrayData];
  const PAGE_SIZE = 5;
  const PAGES = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = Array.from({ length: PAGES }, (_, index) => {
    const startIndex = index * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  });
  return paginatedData;
};

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

  const result = breedsData.reduce((acc, currentValue) => {
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
  }, []);
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
      'minimum lifespan': Number(minLifeExpectancy),
      'maximum lifespan': Number(maxLifeExpectancy),
      metric: avarageWeightMetric,
      imperial: avarageWeightImperial,
    };
  });

  return formattedData;
};

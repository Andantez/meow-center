export const getUniqueValues = (data, type) => {
  const origins = data.map((value) => {
    return value[type];
  }).sort((a, b) => a.localeCompare(b));
  
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

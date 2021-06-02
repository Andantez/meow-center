
export const getUniqueValues = (data, type) => {
  const origins = data.map((value) => {
    return value[type];
  });

  return ['All', ...new Set(origins)];
};

export const getCharacteristics = (data) => {
  const {
    adaptability,
    affection_level,
    child_friendly,
    energy_level,
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
    adaptability,
    affection_level,
    child_friendly,
    energy_level,
    grooming,
    health_issues,
    social_needs,
    intelligence,
    stranger_friendly,
    life_span,
    hypoallergenic,
    weight,
  };
  return Object.entries(characteristics).map((entry) => {
    return { characteristic: entry[0].split('_').join(' '), value: entry[1] };
  });
};

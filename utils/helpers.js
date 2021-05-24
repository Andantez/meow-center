
export const getUniqueValues = (data, type) => {
  const origins = data.map((value) => {
    return value[type];
  });

  return ['All', ...new Set(origins)];
};
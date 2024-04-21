export const getAllSearchParams = (searchParams) => {
  const allSearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    allSearchParams[key] = value;
  }
  return allSearchParams;
};
